"use client"
import connectGenkitUI from "@/utils/connectGenkitUI";
import "./globals.css";
import { useEffect } from "react";

function useResponsiveHeight() {
  useEffect(() => {
    // Define the function to update the body's height
    const updateBodyHeight = () => {
      document.body.style.height = `${window.innerHeight}px`;
    };

    // Run on initial load and whenever the window resizes
    updateBodyHeight();
    window.addEventListener("resize", updateBodyHeight);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateBodyHeight);
    };
  }, []); // Empty dependency array to run only on mount
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useResponsiveHeight();
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