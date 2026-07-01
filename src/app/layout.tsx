import type { Metadata } from "next";
import { Outfit, Rajdhani } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "VTU VRIF | Visvesvaraya Research & Innovation Foundation, Belagavi",
  description: "Visvesvaraya Research & Innovation Foundation (VRIF), the Innovation & Entrepreneurship Arm of Visvesvaraya Technological University (VTU), Belagavi, serves as a catalyst for startup growth, incubation, and technology commercialization across Karnataka.",
  keywords: [
    "VRIF",
    "Visvesvaraya Technological University",
    "VTU Belagavi",
    "Startup Incubation",
    "Karnataka Innovation Ecosystem",
    "Technology Business Incubator",
    "NAIN PMU",
    "Research Commercialization",
    "Entrepreneurship Karnataka",
    "Dr. S. Vidyashankar"
  ],
  authors: [{ name: "Visvesvaraya Research & Innovation Foundation (VRIF)" }],
  openGraph: {
    title: "VTU VRIF | Visvesvaraya Research & Innovation Foundation, Belagavi",
    description: "Empowering innovators, researchers, entrepreneurs, and startups to build scalable solutions that create real-world impact across Karnataka.",
    url: "https://vtuvrif.com",
    siteName: "VRIF VTU",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VRIF VTU | Visvesvaraya Research & Innovation Foundation",
    description: "The Innovation & Entrepreneurship Arm of VTU Belagavi, catalyzing startups and research commercialization.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${rajdhani.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/vrif_logo.webp" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              "name": "Visvesvaraya Research & Innovation Foundation (VRIF)",
              "alternateName": ["VTU VRIF", "VRIF VTU", "VRIF Belagavi"],
              "url": "https://vtuvrif.com",
              "logo": "https://vtuvrif.com/images/vrif_logo.webp",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Silver Jubilee Bhavan, VTU Campus, Jnana Sangama, Machhe",
                "addressLocality": "Belagavi",
                "addressRegion": "Karnataka",
                "postalCode": "590018",
                "addressCountry": "IN"
              },
              "parentOrganization": {
                "@type": "CollegeOrUniversity",
                "name": "Visvesvaraya Technological University (VTU)"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-97394-44818",
                "contactType": "customer service",
                "email": "ops@vtuvrif.com"
              }
            })
          }}
        />
      </head>
      <body className="bg-[#f0f4ff] text-[#0d1b3e] antialiased min-h-screen flex flex-col selection:bg-blue-200 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
