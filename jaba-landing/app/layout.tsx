import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "JABA Overview",
  description: "Post-meeting overview hub for JABA NIL athlete campaign management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-base text-white">
      <body className={`${display.variable} ${sans.variable} bg-base text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
