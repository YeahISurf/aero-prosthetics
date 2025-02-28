import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    noIndex: false,
  });
}

export default function PrivacyPolicyPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  const t = useTranslations('legal.privacy');
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Aero Prosthetics ("we," "our," or "us") is committed to protecting your privacy and safeguarding your personal health information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website or use our services.
            </p>
            <p>
              As a healthcare provider, we are subject to the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and its implementing regulations. We are committed to maintaining the privacy and security of your protected health information (PHI) in accordance with HIPAA and other applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, postal address, and other contact information you provide when filling out forms on our website.
              </li>
              <li>
                <strong>Protected Health Information (PHI):</strong> Information about your health condition, treatment, or payment for healthcare services that identifies you or could reasonably be used to identify you.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser type, operating system, referring website, pages visited, and time spent on our website.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web beacons, and similar technologies to enhance your experience on our website.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p>We may use your information for the following purposes:</p>
            <ul>
              <li>To provide and improve our healthcare services</li>
              <li>To communicate with you about your care, appointments, and services</li>
              <li>To process payments and insurance claims</li>
              <li>To send you information about our services, events, and educational resources</li>
              <li>To respond to your inquiries and requests</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To analyze website usage and improve user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">HIPAA Compliance</h2>
            <p>
              As a covered entity under HIPAA, we maintain the privacy and security of your PHI in accordance with HIPAA's Privacy Rule and Security Rule. We implement appropriate administrative, physical, and technical safeguards to protect your PHI from unauthorized access, use, or disclosure.
            </p>
            <p>
              We will not use or disclose your PHI for marketing purposes without your written authorization. We will not sell your PHI under any circumstances.
            </p>
            <p>
              For more detailed information about our HIPAA privacy practices, please refer to our Notice of Privacy Practices, which is available upon request.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>
                <strong>Healthcare Providers:</strong> Other healthcare providers involved in your care.
              </li>
              <li>
                <strong>Insurance Companies:</strong> Your health insurance company for payment and coverage purposes.
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party service providers who perform services on our behalf, such as payment processing, website hosting, and customer service.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, such as in response to a court order, subpoena, or other legal process.
              </li>
            </ul>
            <p>
              We require all third parties to respect the security of your information and to treat it in accordance with applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, regular security assessments, and staff training on privacy and security practices.
            </p>
            <p>
              Despite our efforts, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security of your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p>Under HIPAA, you have certain rights regarding your PHI, including:</p>
            <ul>
              <li>The right to access and receive a copy of your PHI</li>
              <li>The right to request corrections to your PHI</li>
              <li>The right to request restrictions on certain uses and disclosures of your PHI</li>
              <li>The right to request confidential communications</li>
              <li>The right to receive an accounting of certain disclosures of your PHI</li>
              <li>The right to receive a paper copy of our Notice of Privacy Practices</li>
            </ul>
            <p>
              To exercise these rights, please contact our Privacy Officer using the contact information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">California Privacy Rights</h2>
            <p>
              If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA) and other California privacy laws. These rights include:
            </p>
            <ul>
              <li>The right to know what personal information we collect, use, disclose, and sell</li>
              <li>The right to delete personal information we collect from you</li>
              <li>The right to opt-out of the sale of your personal information</li>
              <li>The right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the contact information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on our website with a new effective date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact our Privacy Officer at:
            </p>
            <p>
              Aero Prosthetics<br />
              Attn: Privacy Officer<br />
              1001 N Weir Canyon Road<br />
              Anaheim Hills, CA 92807<br />
              Phone: 714-385-1000<br />
              Email: privacy@aeroprosthetics.com
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
