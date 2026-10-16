import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { QuoteItem } from "../components/MaterialPicker";

type Toast = { text: string; tone: "ok" | "error" };
type Cart = {
  items: QuoteItem[];
  count: number;
  add: (items: QuoteItem[]) => void;
  setQty: (name: string, qty: number) => void;
  remove: (name: string) => void;
  clear: () => void;
};

const KEY = "fermat-carrinho";
const clampQty = (qty: number) => Math.max(1, Math.min(9999, Math.round(qty) || 1));
const CartContext = createContext<Cart | null>(null);

function load(): QuoteItem[] {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(data) ? data.filter(item => typeof item?.name === "string").map(item => ({ name: item.name, qty: clampQty(item.qty) })) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(load);
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number>();

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch { /* armazenamento indisponível */ }
  }, [items]);

  const notify = useCallback((text: string, tone: Toast["tone"] = "ok") => {
    setToast({ text, tone });
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3000);
  }, []);

  const add = useCallback((incoming: QuoteItem[]) => {
    if (!incoming.length) return notify("Não foi possível adicionar: escolha pelo menos um material.", "error");
    setItems(list => {
      const next = [...list];
      for (const item of incoming) {
        const found = next.findIndex(entry => entry.name === item.name);
        if (found >= 0) next[found] = { ...next[found], qty: clampQty(next[found].qty + item.qty) };
        else next.push({ name: item.name, qty: clampQty(item.qty) });
      }
      return next;
    });
    notify(incoming.length === 1 ? `"${incoming[0].name}" foi adicionado ao carrinho.` : `${incoming.length} materiais foram adicionados ao carrinho.`);
  }, [notify]);

  const value = useMemo<Cart>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    add,
    setQty: (name, qty) => setItems(list => list.map(item => item.name === name ? { ...item, qty: clampQty(qty) } : item)),
    remove: name => setItems(list => list.filter(item => item.name !== name)),
    clear: () => setItems([])
  }), [items, add]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div role="status" aria-live="polite" className={`fixed inset-x-3 bottom-16 z-[70] mx-auto max-w-md border-l-8 px-5 py-4 font-semibold text-white shadow-xl sm:bottom-24 ${toast.tone === "ok" ? "border-emerald-500 bg-aco" : "border-fermat bg-aco"}`}>
          {toast.text}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart requer CartProvider");
  return cart;
}