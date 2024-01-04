import React from "react";
export default function UnAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          {children}
        </div>
      </body>
    </html>
  );
}
