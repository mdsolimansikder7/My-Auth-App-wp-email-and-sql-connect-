
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // 1. Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone =
      typeof phone === "string" ? phone.trim() : "";
    const cleanMessage =
      typeof message === "string" ? message.trim() : "";

    if (
      cleanName.length > 150 ||
      cleanEmail.length > 255 ||
      cleanPhone.length > 30 ||
      cleanMessage.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return NextResponse.json(
        { error: "Please provide valid information." },
        { status: 400 }
      );
    }

    // 2. Save lead to MySQL
    try {
      await db.query(
        `INSERT INTO leads (name, email, phone, message)
         VALUES (?, ?, ?, ?)`,
        [
          cleanName,
          cleanEmail,
          cleanPhone || null,
          cleanMessage || null,
        ]
      );
    } catch (error) {
      console.error("Database error:", error);

      return NextResponse.json(
        { error: "Failed to save your information." },
        { status: 500 }
      );
    }

    // 3. Send email notification
    try {
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;
      const emailReceiver = process.env.LEAD_RECEIVER;

      if (emailUser && emailPass && emailReceiver) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        await transporter.sendMail({
          from: `"My Auth" <${emailUser}>`,
          to: emailReceiver,
          replyTo: cleanEmail,
          subject: `New Lead: ${cleanName} | My Auth`,
          text: [
            "A new lead has been submitted through My Auth.",
            "",
            "MY AUTH - CONTACT FORM",
            "",
            `Name: ${cleanName}`,
            `Email: ${cleanEmail}`,
            `Phone: ${cleanPhone || "Not provided"}`,
            `Message: ${cleanMessage || "No message provided"}`,
          ].join("\n"),
        });
      } else {
        console.warn("Email notification skipped: missing configuration.");
      }
    } catch (error) {
      console.error("Email notification failed:", error);
    }

    // 4. Prepare a free WhatsApp Click-to-Chat link
    const whatsappNumber = process.env.WHATSAPP_RECEIVER;

    const whatsappMessage = [
      "New Lead - My Auth",
      "",
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Phone: ${cleanPhone || "Not provided"}`,
      `Message: ${cleanMessage || "No message provided"}`,
    ].join("\n");

    const whatsappUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`
      : null;

    // 5. Return success and WhatsApp link
    return NextResponse.json(
      {
        message: "Thank you! Your information has been saved.",
        whatsappUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request error:", error);

    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
