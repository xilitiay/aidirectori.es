const faqs = [
  {
    q: "What is AI Directories?",
    a: "AI Directories is a meticulously curated collection of directories focused on AI and non-AI tools, designed to facilitate rapid submissions.",
  },
  {
    q: "Will your service work for a non-AI tool?",
    a: "Yes. Our curated list of directories can easily work for non-AI tools as well.",
  },
  {
    q: "How long does it take to see results?",
    a: "Results may vary, but typically you can expect to see improvements in domain authority and SEO rankings within a few weeks of submission.",
  },
  {
    q: "Why AI Directories list, and not other lists?",
    a: "While there are many free or paid directory lists available, the AI Directories stands out due to the extensive time and effort we have invested in curating it. This list is carefully organized and the selected directories were properly tested to bring results.",
  },
  {
    q: "Can I submit more than one AI tool?",
    a: "Yes, you can submit multiple AI products for increased exposure and backlink opportunities. Contact us for bulk submission discounts.",
  },
  {
    q: "Do you provide reports on submissions?",
    a: "Yes, we provide detailed reports on all submissions made to AI directories, for some directories we provide the confirmation link, others the success message.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "We offer a satisfaction guarantee. If you are not happy with the results, we will work with you to make it right or provide a refund.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can upgrade your plan at any time to access more features and benefits. Contact our support team for assistance.",
  },
  {
    q: "How do I get started?",
    a: "Simply choose a pricing plan, our team will get in touch with you to kickstart your AI product launch journey.",
  },
  {
    q: "I have another question",
    a: "Cool, contact me by email or Twitter",
  },
];

export default function Faqs() {
  return (
    <section id="faqs" className="w-full bg-[#F5F6F8] py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Got questions?{" "}
            <span className="font-instrument-serif italic">We&apos;ve got answers.</span>
          </h2>
          <p className="mt-4 text-[15px] text-gray-900/50">
            Everything you need to know about our service and how it works.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-gray-100 bg-white px-6 py-4 open:border-[#66CC8A]/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <span className="text-[15px] font-medium text-gray-900">{f.q}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-45"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-[14px] text-gray-900/60 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
