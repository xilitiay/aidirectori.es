export default function Demo() {
  return (
    <section className="w-full bg-[#F5F6F8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            See AI Directories in{" "}
            <span className="font-instrument-serif italic">Action</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            Watch how easy it is to discover and submit your AI tools to hundreds of
            directories in 48 hours, not weeks.
          </p>
          <a
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
}
