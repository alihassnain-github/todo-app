import { Poppins } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Poppinsfont = Poppins({
  weight: "400",
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Poppinsfont.className}>
        {children}
      </body>
    </html>
  );
}
