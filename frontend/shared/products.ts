export type Category = "Blocos" | "Tijolo" | "Cofragem" | "Cerâmicas" | "Sanitários" | "Tintas" | "Ferro e Aço" | "Cimentos e Argamassa" | "Areias e Britas";
export interface Product { ref: string; name: string; category: Category; group: "Obra grossa" | "Obra fina"; unit: string; spec: string; inStock: boolean }
export const CATEGORIES: Category[] = ["Blocos", "Tijolo", "Cofragem", "Cerâmicas", "Sanitários", "Tintas"];
export const CATALOG_CATEGORIES: { name: Category; group: Product["group"] }[] = [
  { name: "Blocos", group: "Obra grossa" },
  { name: "Tijolo", group: "Obra grossa" },
  { name: "Cofragem", group: "Obra grossa" },
  { name: "Ferro e Aço", group: "Obra grossa" },
  { name: "Cimentos e Argamassa", group: "Obra grossa" },
  { name: "Areias e Britas", group: "Obra grossa" },
  { name: "Cerâmicas", group: "Obra fina" },
  { name: "Sanitários", group: "Obra fina" },
  { name: "Tintas", group: "Obra fina" },
];
export const PRODUCTS: Product[] = [
  { ref: "BL-5020", name: "Bloco de betão 50×20×20", category: "Blocos", group: "Obra grossa", unit: "Palete · 60 un.", spec: "18,5 kg/un", inStock: true },
  { ref: "BL-5015", name: "Bloco de betão 50×20×15", category: "Blocos", group: "Obra grossa", unit: "Palete · 72 un.", spec: "14,2 kg/un", inStock: true },
  { ref: "TJ-3011", name: "Tijolo furado 30×20×11", category: "Tijolo", group: "Obra grossa", unit: "Palete · 120 un.", spec: "5,1 kg/un", inStock: true },
  { ref: "TJ-3015", name: "Tijolo furado 30×20×15", category: "Tijolo", group: "Obra grossa", unit: "Palete · 90 un.", spec: "6,8 kg/un", inStock: true },
  { ref: "CF-E031", name: "Escora metálica 1,8–3,1 m", category: "Cofragem", group: "Obra grossa", unit: "Unidade", spec: "Carga até 20 kN", inStock: true },
  { ref: "CF-P027", name: "Painel tricapa 27 mm · 2,00 m", category: "Cofragem", group: "Obra grossa", unit: "Unidade", spec: "500 × 2000 mm", inStock: true },
  { ref: "CR-6060", name: "Ladrilho porcelânico 60×60", category: "Cerâmicas", group: "Obra fina", unit: "Caixa · 1,44 m²", spec: "Rectificado", inStock: true },
  { ref: "CR-3060", name: "Revestimento mate 30×60", category: "Cerâmicas", group: "Obra fina", unit: "Caixa · 1,26 m²", spec: "Parede interior", inStock: false },
  { ref: "SN-WC01", name: "Sanita suspensa com tampa", category: "Sanitários", group: "Obra fina", unit: "Unidade", spec: "Fecho suave", inStock: true },
  { ref: "SN-PL90", name: "Base de duche 90×90", category: "Sanitários", group: "Obra fina", unit: "Unidade", spec: "Resina, antiderrapante", inStock: true },
  { ref: "TN-I015", name: "Tinta plástica interior 15 L", category: "Tintas", group: "Obra fina", unit: "Balde 15 L", spec: "Branco mate", inStock: true },
  { ref: "TN-E015", name: "Tinta de fachada 15 L", category: "Tintas", group: "Obra fina", unit: "Balde 15 L", spec: "Impermeável", inStock: true },
  { ref: "FA-V012", name: "Varão de aço A500 Ø12 · 12 m", category: "Ferro e Aço", group: "Obra grossa", unit: "Varão · 12 m", spec: "10,65 kg/un", inStock: true },
  { ref: "FA-M150", name: "Malha electrossoldada 15×15", category: "Ferro e Aço", group: "Obra grossa", unit: "Painel · 2,40 × 5,00 m", spec: "Ø6 mm", inStock: true },
  { ref: "FA-A160", name: "Arame de atar recozido 1,6 mm", category: "Ferro e Aço", group: "Obra grossa", unit: "Rolo · 25 kg", spec: "Ø1,6 mm", inStock: false },
  { ref: "CM-C325", name: "Cimento Portland CEM II 32,5", category: "Cimentos e Argamassa", group: "Obra grossa", unit: "Saco · 25 kg", spec: "Uso geral", inStock: true },
  { ref: "CM-C425", name: "Cimento Portland CEM II 42,5", category: "Cimentos e Argamassa", group: "Obra grossa", unit: "Saco · 25 kg", spec: "Alta resistência", inStock: true },
  { ref: "CM-AR25", name: "Argamassa de reboco", category: "Cimentos e Argamassa", group: "Obra grossa", unit: "Saco · 25 kg", spec: "Interior e exterior", inStock: true },
  { ref: "AB-A001", name: "Areia amarela lavada", category: "Areias e Britas", group: "Obra grossa", unit: "Big bag · 1 m³", spec: "0–4 mm", inStock: true },
  { ref: "AB-B002", name: "Brita calibrada nº 2", category: "Areias e Britas", group: "Obra grossa", unit: "Big bag · 1 m³", spec: "10–20 mm", inStock: true },
  { ref: "AB-G003", name: "Godo rolado", category: "Areias e Britas", group: "Obra grossa", unit: "Big bag · 1 m³", spec: "20–40 mm", inStock: true },
];
export interface QuoteRequest {
  name: string; phone: string; email: string; category: string;
  items: { name: string; qty: number }[]; location: string; notes: string;
}
