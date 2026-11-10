import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | AI Directories",
  description:
    "Terms of Service for AI Directories (TheDirectories). Read about acceptable use, submissions, payments, and our API policy.",
};

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-10 mb-3">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] text-gray-900/60 leading-relaxed">{children}</p>;
}

function Sub({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-[16px] font-semibold text-gray-900">
        {n} {title}
      </h3>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

export default function TosPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <section className="w-full bg-white pt-14 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-medium text-gray-900">
            Terms and Conditions for AI Directories
          </h1>
          <p className="mt-2 text-[14px] text-gray-900/40">Last Updated: September 9, 2026</p>
        </div>
      </section>

      <section className="w-full bg-[#F5F6F8] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 space-y-2">
            <H>1. Introduction</H>
            <P>
              Welcome to TheDirectories (https://www.aidirectori.es). By accessing our website, you
              agree to these Terms of Service. Please read them carefully.
            </P>

            <H>2. Service Description</H>
            <P>
              TheDirectories is an AI Directory of all AI Directories, providing a platform for
              users to access a comprehensive list of AI-related directories and AI tools. We also
              offer directory-submission services and an official catalog API and MCP.
            </P>

            <H>3. API Acceptable Use Policy</H>
            <P>
              This API Acceptable Use Policy applies to every AI Directories API key, API request,
              API response, MCP session, integration, application, agent, script, export, and
              downstream use of AI Directories catalog data. By creating an API key, accessing the
              API or MCP, or continuing to use an existing key, you agree to this policy and the
              rest of these Terms.
            </P>
            <P>
              You may browse the site for personal or internal business purposes. For bulk or
              programmatic access, use our official API and MCP at{" "}
              <Link href="/directories" className="text-[#3D8054] hover:underline">
                our directories
              </Link>{" "}
              with a key from your developer dashboard, within published rate limits. Standard
              search-engine and AI-assistant crawlers that follow robots.txt are allowed.
              Unauthorized scraping or republishing is a breach of these Terms.
            </P>

            <Sub n="3.1" title="Good-faith permitted use">
              <P>
                The API and MCP may only be used for lawful, legitimate, respectful, and
                good-faith purposes that add genuine independent value. Examples include private
                research, internal analysis, and tools that help an authorized user discover AI
                tools or submission directories. Your use must respect founders, businesses,
                intellectual property, privacy, data accuracy, and the integrity of the AI
                Directories platform.
              </P>
            </Sub>

            <Sub n="3.2" title="Public display and republication">
              <P>
                An API key does not grant a license to publish, index, sublicense, sell,
                redistribute, or make AI Directories catalog data available to third parties.
                Public display, bulk export, republication, search-engine indexing, or
                incorporation of API data into a customer-facing product or competing directory
                requires our prior written permission and may be subject to additional
                attribution, caching, deletion, and commercial terms.
              </P>
            </Sub>

            <Sub n="3.3" title="Prohibited uses">
              <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-900/60 leading-relaxed">
                <li>
                  Clone, mirror, reproduce, or create a substitute for AI Directories, its
                  database, rankings, directory, pages, presentation, or core functionality.
                </li>
                <li>
                  Build, market, or operate a competing AI-tools directory, dataset, or paid scrape
                  based on our catalog.
                </li>
                <li>
                  Publish bulk tool or directory pages intended to rank for a listing&apos;s name,
                  brand, or domain, divert search traffic, or compete with the original AI
                  Directories or founder listing.
                </li>
                <li>
                  Submit, syndicate, or republish listings to low-quality, spam, misleading, or
                  mass-generated directories, content farms, doorway pages, backlink schemes, or
                  other SEO manipulation systems.
                </li>
                <li>
                  Misrepresent the source, freshness, verification, accuracy, ownership,
                  endorsement, or meaning of AI Directories data, or alter or fabricate metrics in
                  a way that could deceive another person.
                </li>
                <li>
                  Sell, rent, sublicense, broker, proxy, expose, or otherwise provide API access or
                  API-derived datasets to another person, including through a competing API,
                  download, feed, database, or data marketplace.
                </li>
                <li>
                  Scrape, harvest, archive, or systematically reconstruct our database from HTML or
                  the API; exceed documented limits; evade pagination or access controls; or combine
                  multiple accounts, keys, IP addresses, agents, or services to bypass restrictions.
                </li>
                <li>
                  Use API data to train, fine-tune, ground, evaluate, or populate an AI model,
                  dataset, search index, recommendation system, or automated content generator
                  without prior written permission. Using the API or MCP at request time to answer a
                  user is allowed within these Terms.
                </li>
                <li>
                  Collect founder emails or other private fields, attempt to infer hidden
                  information, surveil users, or cause privacy, financial, reputational, or
                  competitive harm.
                </li>
                <li>
                  Facilitate spam, phishing, fraud, scams, malware, deceptive activity, unlawful
                  conduct, or infringement of intellectual property, privacy, publicity, contractual,
                  or other rights.
                </li>
                <li>
                  Interfere with AI Directories, probe or exploit vulnerabilities, introduce
                  malicious code, overload infrastructure, share credentials, or use the API in any
                  way that is abusive, deceptive, unsafe, or harmful to us or third parties.
                </li>
              </ul>
            </Sub>

            <Sub n="3.4" title="API keys, monitoring, and circumvention">
              <P>
                API keys are personal to the account that created them and must be kept
                confidential. You are responsible for every use of your key. We may monitor and
                retain request, usage, account, network, and technical records to secure the API,
                investigate abuse, and enforce these Terms. Creating or using another account,
                email address, key, proxy, organization, or intermediary to evade a restriction or
                ban is a separate material violation. Do not send keys from a public webpage,
                mobile app binary, or public repository.
              </P>
            </Sub>

            <Sub n="3.5" title="Enforcement and permanent bans">
              <P>
                We may investigate suspected misuse and immediately limit, suspend, or revoke API
                access while an investigation is pending. A confirmed material violation or
                attempted circumvention will result in permanent loss of API access and may result
                in a permanent ban from the entire AI Directories platform, including related
                accounts, keys, organizations, and future registrations. We may also require
                deletion of API-derived data, preserve evidence, notify affected parties, and pursue
                any contractual, equitable, or legal remedies available. Banned users are not
                entitled to refunds or replacement keys.
              </P>
              <p className="mt-3 text-[14px] text-gray-900/70">
                <strong>Important:</strong> AI Directories data may not be used to rebuild AI
                Directories, create unauthorized public directories or SEO copies, scrape HTML, or
                share credentials. Material violations and ban evasion result in permanent API
                enforcement.
              </p>
            </Sub>

            <H>4. User Data Collection</H>
            <P>
              We collect personal data such as name, email, and payment information for service
              enhancement and user experience improvement. If you create an API key, we also store
              the key name, purpose, hashed secret, and usage metadata (for example last used time,
              request count, and last path).
            </P>

            <H>5. Non-Personal Data Collection</H>
            <P>
              Our website uses cookies for functionality and analytics purposes.
            </P>

            <H>6. Privacy Policy</H>
            <P>
              Our Privacy Policy, detailing our data handling practices, is available at{" "}
              <Link href="/privacy-policy" className="text-[#3D8054] hover:underline">
                https://www.aidirectori.es/privacy-policy
              </Link>
              .
            </P>

            <H>7. Governing Law</H>
            <P>
              These Terms of Service are governed by the laws of Portugal.
            </P>

            <H>8. Changes to Terms</H>
            <P>
              We reserve the right to modify these Terms at any time. Users will be notified of any
              changes via email.
            </P>

            <H>9. Contact Information</H>
            <P>
              For any questions or concerns about these Terms, please contact us at
              support@thedirectori.es.
            </P>

            <H>10. Agreement</H>
            <P>
              By using TheDirectories, you acknowledge that you have read, understood, and agree to
              be bound by these Terms of Service.
            </P>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
