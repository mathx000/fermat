import express from "express";
import { appendFile } from "node:fs/promises";
import path from "node:path";
import { PRODUCTS, type QuoteRequest } from "../shared/products";

const app = express();
app.use(express.json({ limit: "20kb" }));

app.get("/api/products", (_req, res) => res.json(PRODUCTS));

app.post("/api/quote", async (req, res) => {
  const b = req.body as Partial<QuoteRequest>;
  const name = String(b.name ?? "").trim(), phone = String(b.phone ?? "").replace(/[\s.-]/g, ""), email = String(b.email ?? "").trim();
  if (name.length < 2) return res.status(400).json({ error: "Indique o seu nome." });
  if (!/^\+?\d{9,15}$/.test(phone)) return res.status(400).json({ error: "Indique um contacto válido." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return res.status(400).json({ error: "Indique um email válido." });
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 50)
    .map(item => ({ name: String(item?.name ?? "").trim().slice(0, 120), qty: Math.min(9999, Math.max(1, Math.floor(Number(item?.qty)) || 1)) }))
    .filter(item => item.name);
  if (!items.length) return res.status(400).json({ error: "Escolha pelo menos um material." });
  const entry = {
    at: new Date().toISOString(), name, phone, email, items,
    category: String(b.category ?? "").slice(0, 20),
    location: String(b.location ?? "").slice(0, 200),
    notes: String(b.notes ?? "").slice(0, 1000)
  };
  // Ligar aqui o email, CRM ou rede interna da Fermat.
  await appendFile(path.resolve("quotes.jsonl"), JSON.stringify(entry) + "\n");
  res.status(201).json({ ok: true });
});

if (process.env.NODE_ENV === "production") {
  const dist = path.resolve("dist");
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}
app.listen(3001, () => console.log("Fermat API em http://localhost:3001"));
