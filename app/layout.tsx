import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import VisualEditing from "@/components/VisualEditing";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} dark:bg-neutral-800`}>
        {children}
      </body>
      {draftMode().isEnabled && <VisualEditing />}
    </html>
  );
}
