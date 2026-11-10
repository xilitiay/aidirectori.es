export default function Results() {
  return (
    <section id="results" className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          Results
        </h2>
        <p className="mt-4 text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">
          The proof is in the{" "}
          <span className="font-instrument-serif italic">rankings.</span>
        </p>
        <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50 max-w-2xl mx-auto">
          Founders see measurable results within 30 days
          <span className="hidden sm:inline"> — higher DR, more traffic, and real users.</span>
        </p>
        <a
          href="/#testimonials"
          className="mt-8 inline-flex items-center gap-1 text-[14px] font-medium text-[#3D8054] hover:underline"
        >
          See more results →
        </a>
      </div>
    </section>
  );
}
