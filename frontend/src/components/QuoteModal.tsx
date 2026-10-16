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
      <div className="relative w-full max-w-lg" onClick={event => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Fechar" className="absolute right-3 top-5 z-10 grid h-10 w-10 place-items-center bg-aco text-2xl leading-none text-white transition-colors hover:bg-fermat sm:right-5 sm:top-7">×</button>
        <div role="dialog" aria-modal="true" className="max-h-[92vh] w-full overflow-auto border-t-8 border-fermat bg-cal">
          <QuoteForm preset={product?.name} onDone={onClose} />
        </div>
      </div>
    </div>
  );
}
