import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeSync from "./components/theme-sync";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI & Developer Tech Conference 2025 | Suresh Code Event",
  description:
    "Join the Suresh Code Event – a global AI and developer conference featuring expert speakers, hands-on workshops, and insights into the future of artificial intelligence, coding, and modern technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#25286a" />
      </head>

      <body className={inter.className}>
          <ThemeSync>
            {children}
          </ThemeSync>
      </body>
    </html>
  );
}