import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrowdCampaign - Decentralized Crowdfunding Platform",
  description:
    "Launch, discover, and fund innovative projects on the blockchain. Transparent, secure, and decentralized crowdfunding for the future.",
  keywords: ["crowdfunding", "blockchain", "web3", "ethereum", "decentralized", "fundraising"],
  authors: [{ name: "CrowdCampaign Team" }],
  creator: "CrowdCampaign",
  publisher: "CrowdCampaign",
  openGraph: {
    title: "CrowdCampaign - Decentralized Crowdfunding Platform",
    description: "Launch, discover, and fund innovative projects on the blockchain.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrowdCampaign - Decentralized Crowdfunding Platform",
    description: "Launch, discover, and fund innovative projects on the blockchain.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />
            <main className="relative">
              {children}
            </main>
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
