import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.08em]">404</p>
          <h1 className="display-headline text-balance">Page not found.</h1>
          <Link
            href="/en"
            className="inline-flex items-center justify-center rounded-full bg-button-bg px-6 py-3 text-sm font-semibold text-button-text"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
