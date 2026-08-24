import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import "./globals.css";

const themeInitScript = `
  try {
    var stored = localStorage.getItem("theme");
    if (stored) document.documentElement.setAttribute("data-theme", stored);
  } catch (e) {}
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahir Yoldaş - Senior Frontend Engineer",
  description:
    "Portfolio and case studies from five years building production frontends in fintech.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <div className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col px-6">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
