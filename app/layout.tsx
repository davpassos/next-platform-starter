import "./globals.css";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import LanguageSelector from "../components/LanguageSelector";
import Link from "next/link";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Global Stock Market Analysis",
  description: "Stock market analysis for major countries",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../lib/translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <nav className="bg-blue-900 text-white fixed top-0 w-full z-10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="px-3 py-2 rounded-md hover:bg-blue-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#sectors"
                    className="px-3 py-2 rounded-md hover:bg-blue-700"
                  >
                    Sectors
                  </a>
                </li>
              </ul>
              <LanguageSelector />
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}