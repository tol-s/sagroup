import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactBar from "@/components/MobileContactBar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { localBusinessSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--nf-inter", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--nf-display", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--nf-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.companyName} | Modern House Construction Company in Karachi`,
    template: `%s | ${site.companyName}`,
  },
  description: site.description,
  applicationName: site.companyName,
  keywords: [
    "construction company Karachi",
    "house construction Karachi",
    "home construction Karachi",
    "modern house construction Karachi",
    "modern elevation Karachi",
    "architectural design Karachi",
    "CAD design Karachi",
    "grey structure Karachi",
    "turnkey construction Karachi",
    "villa construction Karachi",
    "residential construction Karachi",
    "house renovation Karachi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: site.companyName,
    title: `${site.companyName} | Modern House Construction in Karachi`,
    description: site.description,
    images: [{ url: images.hero.replace("w=2400", "w=1200"), width: 1200, height: 630, alt: "Modern residence at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.companyName} | Modern House Construction in Karachi`,
    description: site.description,
    images: [images.hero.replace("w=2400", "w=1200")],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#141412",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${serif.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileContactBar />
        <WhatsAppFloat />
        <CustomCursor />
      </body>
    </html>
  );
}
