import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

interface UserRow {
  id: number;
}

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if ((existing as UserRow[]).length > 0) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
    name,
    email,
    hashedPassword,
  ]);

  return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
}