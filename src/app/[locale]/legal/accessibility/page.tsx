import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.accessibility' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    noIndex: false,
  });
}

export default async function AccessibilityStatementPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'legal.accessibility' });
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Accessibility</h2>
            <p>
              Aero Prosthetics is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
            <p>
              The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <p>
              The Aero Prosthetics website is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
            <p>
              The Aero Prosthetics website includes the following accessibility features:
            </p>
            <ul>
              <li>Semantic HTML structure for better screen reader support</li>
              <li>Keyboard navigation support for all interactive elements</li>
              <li>Sufficient color contrast for text and interactive elements</li>
              <li>Resizable text without loss of functionality</li>
              <li>Alternative text for all informative images</li>
              <li>ARIA attributes where appropriate to enhance accessibility</li>
              <li>Focus indicators for keyboard navigation</li>
              <li>Skip-to-content functionality</li>
              <li>Responsive design that works on various devices and screen sizes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitations and Alternatives</h2>
            <p>
              Despite our best efforts to ensure accessibility of the Aero Prosthetics website, there may be some limitations. Below is a description of known limitations, and potential solutions. Please contact us if you observe an issue not listed below.
            </p>
            <p>
              Known limitations:
            </p>
            <ul>
              <li>
                <strong>PDF Documents:</strong> Some older PDF documents may not be fully accessible. We are working to remediate these documents or provide alternative formats upon request.
              </li>
              <li>
                <strong>Third-Party Content:</strong> Some third-party content or functionality on our website may not be fully accessible. We are working with our vendors to improve the accessibility of these components.
              </li>
              <li>
                <strong>Legacy Content:</strong> Some older content may not meet all current accessibility standards. We are working to update this content as resources allow.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Feedback and Assistance</h2>
            <p>
              We welcome your feedback on the accessibility of the Aero Prosthetics website. Please let us know if you encounter accessibility barriers:
            </p>
            <ul>
              <li>Phone: 714-385-1000</li>
              <li>Email: accessibility@aeroprosthetics.com</li>
              <li>Postal address: 1001 N Weir Canyon Road, Anaheim Hills, CA 92807</li>
            </ul>
            <p>
              We try to respond to feedback within 2 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Compatibility with Browsers and Assistive Technology</h2>
            <p>
              The Aero Prosthetics website is designed to be compatible with the following assistive technologies:
            </p>
            <ul>
              <li>Screen readers (including NVDA, JAWS, VoiceOver, and TalkBack)</li>
              <li>Speech recognition software</li>
              <li>Screen magnification software</li>
              <li>Keyboard-only navigation</li>
            </ul>
            <p>
              The website is compatible with recent versions of major browsers, including:
            </p>
            <ul>
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Apple Safari</li>
              <li>Microsoft Edge</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
            <p>
              Accessibility of the Aero Prosthetics website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
            </p>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>WAI-ARIA</li>
            </ul>
            <p>
              These technologies are relied upon for conformance with the accessibility standards used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Assessment Approach</h2>
            <p>
              Aero Prosthetics assessed the accessibility of this website by the following approaches:
            </p>
            <ul>
              <li>Self-evaluation</li>
              <li>External evaluation by accessibility consultants</li>
              <li>Automated testing tools</li>
              <li>User testing with assistive technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Formal Approval</h2>
            <p>
              This accessibility statement was created on February 28, 2025, using the <a href="https://www.w3.org/WAI/planning/statements/" className="text-primary-600 hover:text-primary-500">W3C Accessibility Statement Generator Tool</a>.
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-500">
              Last Updated: February 28, 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
