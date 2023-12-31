import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/style";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteHeader } from "@/components/header";
import { Toaster } from "@/components/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Link from jyu.dev",
  description: "An open source link shortener (may be longer) service.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-backgrond font-sans antialiased max-w-screen",
            inter.variable,
          )}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
