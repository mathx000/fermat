import { useOutletContext } from "react-router-dom";
import { About } from "../components/About";
import { BrandTimeline } from "../components/BrandTimeline";
import { Catalog } from "../components/Catalog";
import { ContactSection } from "../components/ContactSection";
import { Hero } from "../components/Hero";
import type { LayoutContext } from "../components/Layout";

export default function HomePage() {
  const { openQuote } = useOutletContext<LayoutContext>();
  return (
    <>
      <Hero onQuote={() => openQuote()} />
      <About />
      <BrandTimeline />
      <Catalog onQuote={openQuote} />
      <ContactSection />
    </>
  );
}
