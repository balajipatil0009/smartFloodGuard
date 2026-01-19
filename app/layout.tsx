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
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <div className="app-container">
                    <div className="main-content">
                        {children}
                    </div>
                    <footer className="footer">
                        <p className="mb-2">Smart FloodGuard © 2026</p>
                        <p>
                            Developed by{' '}
                            <a
                                href="https://www.linkedin.com/in/balaji-patil-96a66a229/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Balaji
                            </a>
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
