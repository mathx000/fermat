const WA = "351919312138";

export const whatsappUrl = (message = "Olá, gostava de pedir preço de material.") =>
  `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
