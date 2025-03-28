import type { Metadata } from "next";
import './globals.css';
import Head from "./head";
export const metadata: Metadata = {
  title: "Earth Pocket",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body suppressHydrationWarning
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
