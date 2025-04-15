import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as RToaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import CustomIntlProvider from "./providers/intl-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gecko - Plant Tracking App",
  description: "Track and care for your plants with Gecko",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomIntlProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <RToaster position="bottom-center" />
          </ThemeProvider>
        </CustomIntlProvider>
      </body>
      <Analytics />
    </html>
  );
}

import "./globals.css";
