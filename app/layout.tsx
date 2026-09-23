import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOXEN",
  description: "Nightlife neu gedacht.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}