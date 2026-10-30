import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Login | AI Directories" };

export default function SignInPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-medium text-gray-900 text-center">Welcome back</h1>
          <p className="text-center text-[14px] text-gray-900/50 mt-2">
            Sign in to your AI Directories account.
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#66CC8A] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#66CC8A] text-[14px]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-[14px] text-white bg-[#66CC8A] hover:bg-[#54AF74] transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="text-center text-[14px] text-gray-900/50 mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/pricing" className="text-[#3D8054] font-medium">
              Get started
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
