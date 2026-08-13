import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
