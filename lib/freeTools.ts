export type FreeTool = {
  /** Full path slug, e.g. "ai-mentions/chatgpt" */
  slug: string;
  name: string;
  desc: string;
  category: string;
};

export const FREE_TOOL_CATEGORIES = [
  "AI Mentions",
  "Product",
  "Writing",
  "Hashtags",
  "Fun",
  "SEO",
] as const;

export const freeTools: FreeTool[] = [
  // AI Mentions
  {
    slug: "ai-mentions",
    name: "AI Mentions Tracker",
    desc: "See which AI assistants mention your brand across ChatGPT, Perplexity and Gemini.",
    category: "AI Mentions",
  },
  {
    slug: "ai-mentions/chatgpt",
    name: "ChatGPT Mentions",
    desc: "Track when and how ChatGPT references your tool or brand.",
    category: "AI Mentions",
  },
  {
    slug: "ai-mentions/perplexity",
    name: "Perplexity Mentions",
    desc: "Monitor Perplexity citations and answers that name your product.",
    category: "AI Mentions",
  },
  {
    slug: "ai-mentions/gemini",
    name: "Gemini Mentions",
    desc: "Discover when Google's Gemini surfaces your AI tool.",
    category: "AI Mentions",
  },
  // Product
  {
    slug: "product",
    name: "Product Generators",
    desc: "Name and describe your next product in seconds with AI.",
    category: "Product",
  },
  {
    slug: "product/brand-name-generator",
    name: "Brand Name Generator",
    desc: "Generate catchy, available brand names for your startup.",
    category: "Product",
  },
  {
    slug: "product/youtube-name-generator",
    name: "YouTube Name Generator",
    desc: "Find the perfect channel name for your YouTube brand.",
    category: "Product",
  },
  {
    slug: "product/clothing-brand-name-generator",
    name: "Clothing Brand Name Generator",
    desc: "Brainstorm memorable names for your fashion label.",
    category: "Product",
  },
  {
    slug: "product-description-generator",
    name: "Product Description Generator",
    desc: "Write conversion-ready product descriptions instantly.",
    category: "Product",
  },
  // Writing
  {
    slug: "bio-generator",
    name: "Bio Generator",
    desc: "Craft a polished personal or brand bio in one click.",
    category: "Writing",
  },
  {
    slug: "twitter-bio-generator",
    name: "Twitter Bio Generator",
    desc: "Stand out on X with a sharp, scroll-stopping bio.",
    category: "Writing",
  },
  {
    slug: "ai-email-generator",
    name: "AI Email Generator",
    desc: "Write outreach, follow-up and cold emails fast.",
    category: "Writing",
  },
  {
    slug: "blog-seo-generator",
    name: "Blog SEO Generator",
    desc: "Generate SEO-ready blog outlines, titles and meta tags.",
    category: "Writing",
  },
  {
    slug: "viral-post-generator",
    name: "Viral Post Generator",
    desc: "Brainstorm scroll-stopping social posts.",
    category: "Writing",
  },
  {
    slug: "tweet-generator",
    name: "Tweet Generator",
    desc: "Draft engaging tweets and threads in seconds.",
    category: "Writing",
  },
  {
    slug: "writing-tools",
    name: "Writing Tools",
    desc: "Answer, repeat and remix text with handy AI utilities.",
    category: "Writing",
  },
  {
    slug: "writing-tools/ai-answer-generator",
    name: "AI Answer Generator",
    desc: "Get clear, well-structured answers to any question.",
    category: "Writing",
  },
  {
    slug: "writing-tools/text-repeater",
    name: "Text Repeater",
    desc: "Repeat any phrase as many times as you need.",
    category: "Writing",
  },
  // Hashtags
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    desc: "Find trending, high-reach hashtags for any topic.",
    category: "Hashtags",
  },
  {
    slug: "hashtag-generator/tiktok-hashtag-generator",
    name: "TikTok Hashtag Generator",
    desc: "Discover the best TikTok hashtags to boost reach.",
    category: "Hashtags",
  },
  // Fun
  {
    slug: "fun-tools",
    name: "Fun Tools",
    desc: "Lighthearted name and text generators for a quick laugh.",
    category: "Fun",
  },
  {
    slug: "fun-tools/dnd-name-generator",
    name: "DnD Name Generator",
    desc: "Roll up epic Dungeons & Dragons character names.",
    category: "Fun",
  },
  {
    slug: "fun-tools/random-letter-generator",
    name: "Random Letter Generator",
    desc: "Generate random letters for games and prompts.",
    category: "Fun",
  },
  // SEO
  {
    slug: "domain-rating-checker",
    name: "Domain Rating Checker",
    desc: "Check any website's Domain Rating (DR) instantly.",
    category: "SEO",
  },
];

export function getFreeTool(slugPath: string): FreeTool | undefined {
  return freeTools.find((t) => t.slug === slugPath);
}

export function getFreeToolsByCategory(category: string): FreeTool[] {
  return freeTools.filter((t) => t.category === category);
}
