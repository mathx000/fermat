import { useEffect } from "react";
import type { Product } from "../../shared/products";
import { QuoteForm } from "./QuoteForm";

export function QuoteModal({ product, onClose }: { product?: Product; onClose: () => void }) {
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
        <QuoteForm preset={product?.name} onDone={onClose} />
      </div>
    </div>
  );
}
