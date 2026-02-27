import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/components/ThemeProvider";
import SessionWrapper from "../components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard built with Next.js, MUI, and Zustand",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <ThemeRegistry>{children}</ThemeRegistry>
        </SessionWrapper>
      </body>
    </html>
  );
}