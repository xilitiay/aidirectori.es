import toolsData from "@/data/tools.json";

export type Faq = { q: string; a: string };

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  url: string;
  image?: string;
  price?: string;
  priceValue?: number;
  currency?: string;
  rating?: { value?: number | string; count?: number | string };
  operatingSystem?: string;
  datePublished?: string;
  faqs?: Faq[];
  alternatives?: string[];
};

export const tools: Tool[] = (toolsData as Array<{
  slug: string;
  name: string;
  description: string;
  category: string;
  url: string;
  image?: string;
  price?: string;
  priceValue?: number;
  currency?: string;
  rating?: { value?: number | string; count?: number | string };
  operatingSystem?: string;
  datePublished?: string;
  faqs?: Faq[];
  alternatives?: string[];
}>).map((t) => ({
  slug: t.slug,
  name: t.name,
  description: t.description,
  category: t.category || "AI Tools",
  url: t.url || `https://aidirectori.es/ai-tools/${t.slug}`,
  image: t.image,
  price: t.price,
  priceValue: t.priceValue,
  currency: t.currency,
  rating: t.rating,
  operatingSystem: t.operatingSystem,
  datePublished: t.datePublished,
  faqs: t.faqs,
  alternatives: t.alternatives,
}));

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export function getCategories() {
  const map = new Map<string, number>();
  for (const t of tools) {
    const c = t.category || "AI Tools";
    map.set(c, (map.get(c) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getToolsByCategory(category: string) {
  return tools.filter((t) => (t.category || "AI Tools") === category);
}

export function getAlternatives(slug: string) {
  const tool = getTool(slug);
  if (!tool?.alternatives) return [];
  return tool.alternatives
    .map((s) => getTool(s))
    .filter((t): t is Tool => Boolean(t));
}
