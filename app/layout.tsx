import type { Metadata } from "next";
import { Manrope } from 'next/font/google';
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MovieBox",
  description: "The Best Streaming Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className={`${manrope.className} min-h-full flex flex-col bg-[#141414] text-slate-100`}>
        {children}
      </body>
    </html>
  );
}