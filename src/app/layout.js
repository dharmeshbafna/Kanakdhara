import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar, Footer } from "@/components/other";
import { CTA } from "@/components/home";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kandhara Jewellers",
  icons: {
    icon: '/icon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
