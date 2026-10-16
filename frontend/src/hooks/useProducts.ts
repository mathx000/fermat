import { useEffect, useState } from "react";
import { PRODUCTS, type Product } from "../../shared/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  useEffect(() => {
    fetch("/api/products").then(response => response.json()).then(setProducts).catch(() => {});
  }, []);
  return products;
}
