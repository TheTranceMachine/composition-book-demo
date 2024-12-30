"use client";

import { Providers } from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  return (
    <Providers>
      <Header />
      <Hero />
      <Features />
      <Footer />
      <ScrollToTop />
    </Providers>
  );
}
