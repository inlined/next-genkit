import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      </head>
      <body>
        <div className="app">
        {children}
        </div>
      </body>
    </html>
  );
}