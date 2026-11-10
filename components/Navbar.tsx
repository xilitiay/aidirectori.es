"use client";

import Link from "next/link";
import { useState } from "react";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-700/70 hover:text-gray-900 transition-colors duration-200 text-[15px] font-medium"
    >
      {children}
    </Link>
  );
}

function Dropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <div className="relative group">
      <button className="text-gray-700/70 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1 text-[15px] font-medium">
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-60">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 px-2 min-w-[200px]">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block px-3 py-2 rounded-lg text-[14px] text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 py-4 transition-all duration-500 bg-[#F5F6F8]">
      <div className="relative">
        <nav className="flex mx-auto pl-4 pr-4 md:pr-3 lg:pr-4 py-3 items-center gap-4 lg:gap-6 max-w-7xl">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 min-w-0">
            <div className="w-8 h-8 bg-[#66CC8A] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-base md:text-xl text-gray-800 whitespace-nowrap">
              AI Directories
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0 min-w-0">
            <NavLink href="/directories">Directories</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <Dropdown
              label="AI Tools"
              items={[
                { href: "/ai-tools", label: "All AI Tools" },
                { href: "/ai-tools/brandreply", label: "BrandReply" },
                { href: "/ai-tools/toolfolio", label: "Toolfolio" },
                { href: "/ai-tools/software-architecture", label: "Software Architecture AI" },
              ]}
            />
            <Dropdown
              label="Marketplace"
              items={[
                { href: "/directories", label: "Browse Directories" },
                { href: "/directories", label: "Submit to Marketplace" },
              ]}
            />
            <Dropdown
              label="More"
              items={[
                { href: "/blog", label: "Blog" },
                { href: "/tools", label: "Free Tools" },
                { href: "/about-us", label: "About us" },
                { href: "/#testimonials", label: "Testimonials" },
                { href: "/#meet-creators", label: "Meet Creators" },
              ]}
            />
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0 ml-auto">
            <Link
              href="/auth/signin"
              className="text-gray-700/70 hover:text-gray-900 text-[15px] font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/submit-ai-tool"
              className="inline-flex h-10 items-center justify-center gap-1.5 px-5 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
            >
              Submit
            </Link>
          </div>

          <div className="flex lg:hidden ml-auto">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 w-10 h-10"
              aria-label="Open main menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden mx-4 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-1">
            <Link href="/directories" className="block px-3 py-2 text-gray-700">Directories</Link>
            <Link href="/categories" className="block px-3 py-2 text-gray-700">Categories</Link>
            <Link href="/#features" className="block px-3 py-2 text-gray-700">Features</Link>
            <Link href="/pricing" className="block px-3 py-2 text-gray-700">Pricing</Link>
            <Link href="/ai-tools" className="block px-3 py-2 text-gray-700">AI Tools</Link>
            <Link href="/tools" className="block px-3 py-2 text-gray-700">Free Tools</Link>
            <Link href="/about-us" className="block px-3 py-2 text-gray-700">About us</Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-700">Blog</Link>
            <Link href="/auth/signin" className="block px-3 py-2 text-gray-700">Login</Link>
            <Link href="/submit-ai-tool" className="block px-3 py-2 text-center font-semibold text-white bg-[#66CC8A] rounded-full mt-2">
              Submit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
