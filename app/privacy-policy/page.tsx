import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | AI Directories",
  description:
    "How AI Directories (The Directories) collects, uses, and protects your data. Read our full Privacy Policy.",
};

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-10 mb-3">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] text-gray-900/60 leading-relaxed">{children}</p>;
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <section className="w-full bg-white pt-14 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-medium text-gray-900">
            Privacy Policy for AI Directories
          </h1>
          <p className="mt-2 text-[14px] text-gray-900/40">Last Updated: January 16, 2024</p>
        </div>
      </section>

      <section className="w-full bg-[#F5F6F8] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 space-y-2">
            <H>1. Introduction</H>
            <P>
              Welcome to The Directories (https://thedirectori.es). This Privacy Policy outlines our
              practices regarding the collection, use, and protection of your data.
            </P>

            <H>2. User Data Collection</H>
            <P>
              We collect personal data including name, email, and payment information. This data is
              essential for processing orders and enhancing your experience on our platform.
            </P>

            <H>3. Non-Personal Data Collection</H>
            <P>
              Our website uses cookies to improve website functionality and user experience.
            </P>

            <H>4. Purpose of Data Collection</H>
            <P>
              The collected data is primarily used for order processing and to provide a
              personalized experience on our site.
            </P>

            <H>5. Data Sharing</H>
            <P>
              We respect your privacy and do not share your personal data with any third parties.
            </P>

            <H>6. Children&apos;s Privacy</H>
            <P>
              We do not knowingly collect any personal information from children. If we become aware
              that a child has provided us with personal information, we take steps to remove such
              information and terminate the child&apos;s account.
            </P>

            <H>7. Updates to the Privacy Policy</H>
            <P>
              We may update this policy from time to time. Any changes will be communicated via email
              to our users.
            </P>

            <H>8. Contact Information</H>
            <P>
              For any questions or concerns regarding this policy, please contact us at
              support@thedirectori.es.
            </P>

            <H>9. Acknowledgement and Consent</H>
            <P>
              By using The Directories, you acknowledge that you have read and understood this
              Privacy Policy and agree to its terms.
            </P>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
