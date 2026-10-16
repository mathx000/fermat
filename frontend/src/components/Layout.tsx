import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { Product } from "../../shared/products";
import { whatsappUrl } from "../lib/whatsapp";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { QuoteModal } from "./QuoteModal";

export type LayoutContext = { openQuote: (product?: Product) => void };

export function Layout() {
  const [modal, setModal] = useState<{ product?: Product } | null>(null);
  const openQuote = (product?: Product) => setModal({ product });
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    const scroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView();
      else if (tries++ < 20) frame = requestAnimationFrame(scroll);
    };
    let frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return (
    <>
      <Header />
      <main><Outlet context={{ openQuote } satisfies LayoutContext} /></main>
      <Footer />
      {modal && <QuoteModal product={modal.product} onClose={() => setModal(null)} />}
      <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="fixed bottom-3 right-3 z-30 bg-fermat px-3 py-2 font-display text-base sm:bottom-5 sm:right-5 sm:px-5 sm:py-3 sm:text-lg font-bold uppercase tracking-wider text-white shadow-lg hover:bg-aco">WhatsApp</a>
    </>
  );
}
