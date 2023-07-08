import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AtaskContextProvider from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atask Search Repository",
  description: "Generated repositories from Github",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AtaskContextProvider>
        <body className={inter.className}>{children}</body>
      </AtaskContextProvider>
    </html>
  );
}
