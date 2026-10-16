import { useEffect } from "react";
import type { Product } from "../../shared/products";
import { useCart } from "../lib/cart";
import type { QuoteItem } from "./MaterialPicker";
import { QuoteForm } from "./QuoteForm";

export function QuoteModal({ product, items, onClose }: { product?: Product; items?: QuoteItem[]; onClose: () => void }) {
  const cart = useCart();
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    addEventListener("keydown", handleKey);
    return () => removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-aco/80 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-lg overflow-auto border-t-8 border-fermat bg-cal" onClick={event => event.stopPropagation()}>
        <div className="sticky top-0 z-10 flex h-14 justify-end bg-cal">
          <button type="button" onClick={onClose} aria-label="Fechar" className="m-2 grid h-10 w-10 place-items-center bg-aco text-2xl leading-none text-white transition-colors hover:bg-fermat sm:m-3">&times;</button>
        </div>
        <QuoteForm preset={product?.name} presetItems={items} onDone={onClose} onSent={items ? cart.clear : undefined} />
      </div>
    </div>
  );
}