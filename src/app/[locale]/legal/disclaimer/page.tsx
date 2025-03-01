import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.disclaimer' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    noIndex: false,
  });
}

export default async function MedicalDisclaimerPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'legal.disclaimer' });
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Medical Information Disclaimer</h2>
            <p>
              The information provided on the Aero Prosthetics website is for general informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician, prosthetist, orthotist, or other qualified health provider with any questions you may have regarding a medical condition or treatment.
            </p>
            <p>
              Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">No Professional-Client Relationship</h2>
            <p>
              The use of this website does not establish a doctor-patient relationship, prosthetist-patient relationship, or any other professional-client relationship. Communication with Aero Prosthetics through this website does not constitute or establish a professional-client relationship.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Content Accuracy</h2>
            <p>
              Aero Prosthetics makes reasonable efforts to provide accurate and up-to-date information on this website. However, we make no warranties or representations as to the accuracy, completeness, timeliness, or reliability of the information, services, or products provided through this website.
            </p>
            <p>
              Medical knowledge and best practices are constantly evolving. The information provided on this website may not reflect the most current medical developments, and information may be subject to change without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Individual Results May Vary</h2>
            <p>
              The prosthetic and orthotic solutions, treatments, procedures, and outcomes described on this website are specific to the individuals portrayed and may not be appropriate for all patients. Individual results may vary depending on various factors, including but not limited to:
            </p>
            <ul>
              <li>The nature and extent of the condition being treated</li>
              <li>Individual patient anatomy and physiology</li>
              <li>Patient compliance with treatment protocols</li>
              <li>Individual healing and adaptation processes</li>
              <li>Lifestyle factors and activity levels</li>
              <li>Concurrent medical conditions</li>
            </ul>
            <p>
              Any testimonials or success stories featured on this website represent the personal experiences of those individuals only and should not be considered as typical or guaranteed results.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">No Endorsement</h2>
            <p>
              Aero Prosthetics does not endorse or recommend any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on this website. Reliance on any information provided by Aero Prosthetics, its employees, or others appearing on the website is solely at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Content</h2>
            <p>
              This website may contain links to third-party websites or content from third-party sources. These links and content are provided for convenience and informational purposes only. Aero Prosthetics has no control over the content of these third-party websites and is not responsible for their content, accuracy, legality, or any other aspect of these websites.
            </p>
            <p>
              The inclusion of any link does not imply endorsement by Aero Prosthetics of the linked website or its content. Use of any linked website is at the user&apos;s own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Images and Illustrations</h2>
            <p>
              The images, photographs, and illustrations on this website are for illustrative purposes only. They may depict models, and the specific products, designs, or outcomes shown may not be available or achievable for all patients.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Medical Decisions</h2>
            <p>
              Any decisions related to your health care should be made in consultation with your qualified healthcare provider. Aero Prosthetics encourages you to confirm any information obtained from or through this website with other sources, including your healthcare provider, and to review all information regarding any medical condition or treatment with your healthcare provider.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Aero Prosthetics disclaims all warranties, express or implied, regarding the information provided on this website. In no event shall Aero Prosthetics be liable for any direct, indirect, special, incidental, or consequential damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, or any other damages arising out of or in connection with the use or performance of information available from this website, whether based on contract, tort, negligence, strict liability, or otherwise, even if Aero Prosthetics has been advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              If you have any questions or concerns about this Medical Disclaimer, please contact us at:
            </p>
            <p>
              Aero Prosthetics<br />
              1001 N Weir Canyon Road<br />
              Anaheim Hills, CA 92807<br />
              Phone: 714-385-1000<br />
              Email: info@aeroprosthetics.com
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
