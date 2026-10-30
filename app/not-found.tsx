import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-medium text-gray-900 font-instrument-serif italic">
          404
        </h1>
        <p className="mt-3 text-gray-900/50">This page could not be found.</p>
        <Link
          href="/"
          className="inline-flex mt-6 items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
