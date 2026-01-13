import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart FloodGuard Admin",
  description: "Admin Panel for Smart FloodGuard App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex-grow">
          {children}
        </div>
        <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
          <p className="mb-2">Smart FloodGuard © 2026</p>
          <p>
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/balaji-patil-96a66a229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Balaji
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
