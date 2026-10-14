import LeadForm from "@/components/LeadForm";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600 opacity-20 blur-3xl dark:opacity-10"></div>
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl dark:opacity-10"></div>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-600 dark:text-indigo-400">
            Contact Us
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            Let&apos;s{" "}
            <span className="text-indigo-600 dark:text-indigo-400">talk</span>
          </h1>

          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Fill in the form and we will get back to you as soon as possible.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-xl">
                📧
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                <p className="font-medium">you@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-xl">
                📞
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                <p className="font-medium">+880 1XXX-XXXXXX</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-xl">
                📍
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                <p className="font-medium">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <h2 className="mb-6 text-2xl font-bold">Send a message</h2>
          <LeadForm />
        </div>
      </div>
    </div>
  );
}