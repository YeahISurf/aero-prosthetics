import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    noIndex: false,
  });
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Aero Prosthetics (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and safeguarding your personal health information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website or use our services.
            </p>
            <p>
              As a healthcare provider, we are subject to the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and its implementing regulations. We are committed to maintaining the privacy and security of your protected health information (PHI) in accordance with HIPAA and other applicable laws.
            </p>
            <p>
              By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree with our practices, please do not use our website or services.
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
            <h2 className="text-2xl font-semibold mb-4">How We Collect Information</h2>
            <p>We collect information through various channels:</p>
            <ul>
              <li><strong>Direct Interactions:</strong> Information you provide when completing forms, creating an account, or contacting us</li>
              <li><strong>Automated Technologies:</strong> Cookies, server logs, and similar technologies that collect information as you navigate our website</li>
              <li><strong>Third Parties:</strong> Information from healthcare providers, insurance companies, and other sources involved in your care</li>
              <li><strong>Public Sources:</strong> Information from publicly available sources when permitted by law</li>
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
              <li>To detect, prevent, and address technical issues or security breaches</li>
              <li>To enforce our terms and conditions and protect our rights and property</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">HIPAA Compliance</h2>
            <p>
              As a covered entity under HIPAA, we maintain the privacy and security of your PHI in accordance with HIPAA&apos;s Privacy Rule and Security Rule. We implement appropriate administrative, physical, and technical safeguards to protect your PHI from unauthorized access, use, or disclosure.
            </p>
            <p>
              We will not use or disclose your PHI for marketing purposes without your written authorization. We will not sell your PHI under any circumstances.
            </p>
            <p>
              For more detailed information about our HIPAA privacy practices, please refer to our Notice of Privacy Practices, which is available upon request.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing (International Users)</h2>
            <p>
              If you are located in the European Economic Area (EEA), United Kingdom, or other regions with data protection laws, we process your personal information on the following legal bases:
            </p>
            <ul>
              <li><strong>Consent:</strong> When you have given us explicit consent to process your data for specific purposes</li>
              <li><strong>Contract:</strong> When processing is necessary to fulfill our contractual obligations to you</li>
              <li><strong>Legal Obligation:</strong> When processing is necessary to comply with legal requirements</li>
              <li><strong>Legitimate Interests:</strong> When processing is necessary for our legitimate interests, provided those interests are not overridden by your rights</li>
              <li><strong>Vital Interests:</strong> When processing is necessary to protect someone's life</li>
            </ul>
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
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, where your information may be transferred as a business asset.
              </li>
            </ul>
            <p>
              We require all third parties to respect the security of your information and to treat it in accordance with applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
            <p>
              Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from those in your country.
            </p>
            <p>
              Whenever we transfer your information internationally, we implement appropriate safeguards to ensure that your information is protected in accordance with this Privacy Policy. These safeguards may include:
            </p>
            <ul>
              <li>Using approved standard contractual clauses</li>
              <li>Ensuring the receiving country has adequate data protection laws</li>
              <li>Obtaining your explicit consent for specific transfers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Similar Technologies</h2>
            <p>
              Our website uses cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. Cookies are small text files stored on your device that help us provide and improve our services.
            </p>
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Analytical/Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functionality Cookies:</strong> Enable personalized features and remember your preferences</li>
              <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant advertisements and track campaign performance</li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may impact the functionality of our website.
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
            <p>
              We maintain an incident response plan and will notify affected individuals and regulatory authorities of data breaches as required by applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            <p>
              For PHI, we follow HIPAA requirements and applicable state laws regarding medical record retention. When determining the appropriate retention period, we consider the amount, nature, and sensitivity of the information, the potential risk of harm from unauthorized use or disclosure, and legal requirements.
            </p>
            <p>
              When personal information is no longer needed, we securely delete or anonymize it in accordance with our data retention policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we may have collected information about your child, please contact us using the information provided below.
            </p>
            <p>
              For patients under 18, we comply with all applicable laws regarding the confidentiality of minors' health information and parental access rights.
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
              <li>The right to limit the use and disclosure of sensitive personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the contact information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
            <p>
              We are committed to ensuring this Privacy Policy is accessible to individuals with disabilities. If you encounter any difficulty accessing this policy or need to receive it in an alternative format, please contact us using the information provided below.
            </p>
            <p>
              Our website is designed to comply with WCAG 2.1 guidelines for accessibility. We regularly review and improve our digital content to ensure it remains accessible to all users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on our website with a new effective date. We encourage you to review this Privacy Policy periodically.
            </p>
            <p>
              For significant changes that materially affect your rights or how we use your information, we will provide more prominent notice, such as an email notification or a banner on our website.
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
              Last Updated: May 15, 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
