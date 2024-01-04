import Header from "@/components/Header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex min-h-screen flex-col  p-24">{children}</div>
        {/* <Header /> */}
      </body>
    </html>
  );
}
