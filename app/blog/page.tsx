import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogExplorer from "@/components/BlogExplorer";
import { posts } from "@/lib/blog";

export const metadata = { title: "Blog | AI Directories" };

export default function BlogPage() {
  const previewPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    author: p.author,
    image: p.image,
    tag: p.tag,
  }));

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          The <span className="font-instrument-serif italic">blog</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50 max-w-2xl">
          Guides, reviews and playbooks for getting your AI tool discovered.
        </p>
        <BlogExplorer posts={previewPosts} />
      </div>
      <Footer />
    </main>
  );
}
