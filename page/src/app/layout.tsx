import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});


export const metadata: Metadata = {
  title: {
    default: `${site.legalName}: IA, datos y software con evidencia para ISO/IEC 27001 y 42001`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} antialiased`}>
      <body className="min-h-screen">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
