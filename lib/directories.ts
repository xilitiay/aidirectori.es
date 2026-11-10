import data from "@/data/directories.json";

export type Directory = {
  slug: string;
  name: string;
  category: string;
  description: string;
  dr?: number | null;
  traffic?: string | null;
  pricing: string;
  price?: string;
  type?: string;
  website?: string | null;
  submitUrl?: string | null;
  verified: boolean;
};

export const directories: Directory[] = (data as { directories: Directory[] })
  .directories;

export function getDirectory(slug: string) {
  return directories.find((d) => d.slug === slug);
}

export function getDirectoryCategories() {
  const map = new Map<string, number>();
  for (const d of directories) {
    map.set(d.category, (map.get(d.category) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getDirectoriesByCategory(category: string) {
  return directories.filter((d) => d.category === category);
}

export function getFreeDirectories() {
  return directories.filter(
    (d) => d.pricing === "Free" || /free/i.test(d.price || "")
  );
}

export function getStats() {
  const free = directories.filter(
    (d) => d.pricing === "Free" || /free/i.test(d.price || "")
  ).length;
  const highDr = directories.filter((d) => (d.dr ?? 0) >= 70).length;
  return { total: directories.length, free, highDr };
}
