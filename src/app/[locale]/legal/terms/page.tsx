import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    noIndex: false,
  });
}

export default function TermsOfServicePage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  const t = useTranslations('legal.terms');
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Welcome to the Aero Prosthetics website. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Aero Prosthetics website, including any content, functionality, and services offered on or through the website (the &quot;Website&quot;).
            </p>
            <p>
              Please read these Terms carefully before using our Website. By using the Website, you accept and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Medical Disclaimer</h2>
            <p>
              The content on this Website is provided for general information purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            <p>
              Never disregard professional medical advice or delay in seeking it because of something you have read on this Website. If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>
            <p>
              The Website may contain health or medical-related materials that are sexually explicit or otherwise offensive. We do not warrant that such materials are accurate, complete, or appropriate for all users.
            </p>
            <p>
              Aero Prosthetics does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Website. Reliance on any information provided by Aero Prosthetics, its employees, or others appearing on the Website is solely at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Conduct</h2>
            <p>
              By using this Website, you agree to:
            </p>
            <ul>
              <li>Use the Website only for lawful purposes and in accordance with these Terms</li>
              <li>Not use the Website in any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>Not use the Website to transmit or send unsolicited commercial communications</li>
              <li>Not attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website</li>
              <li>Not attack the Website via a denial-of-service attack or a distributed denial-of-service attack</li>
              <li>Not use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any of the material on the Website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
            <p>
              The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Aero Prosthetics, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              These Terms permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website, except as follows:
            </p>
            <ul>
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
              <li>You may store files that are automatically cached by your Web browser for display enhancement purposes</li>
              <li>You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
              <li>If we provide social media features with certain content, you may take such actions as are enabled by such features</li>
            </ul>
            <p>
              You must not:
            </p>
            <ul>
              <li>Modify copies of any materials from this Website</li>
              <li>Use any illustrations, photographs, video or audio sequences, or any graphics separately from the accompanying text</li>
              <li>Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials from this Website</li>
            </ul>
            <p>
              If you wish to make any use of material on the Website other than that set out in this section, please address your request to: info@aeroprosthetics.com.
            </p>
            <p>
              If you print, copy, modify, download, or otherwise use or provide any other person with access to any part of the Website in breach of the Terms, your right to use the Website will stop immediately and you must, at our option, return or destroy any copies of the materials you have made. No right, title, or interest in or to the Website or any content on the Website is transferred to you, and all rights not expressly granted are reserved by Aero Prosthetics.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Trademarks</h2>
            <p>
              The Aero Prosthetics name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Aero Prosthetics or its affiliates or licensors. You must not use such marks without the prior written permission of Aero Prosthetics. All other names, logos, product and service names, designs, and slogans on this Website are the trademarks of their respective owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL AERO PROSTHETICS, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
            <p>
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Aero Prosthetics, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms or your use of the Website, including, but not limited to, any use of the Website&apos;s content, services, and products other than as expressly authorized in these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law and Jurisdiction</h2>
            <p>
              All matters relating to the Website and these Terms, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the State of California without giving effect to any choice or conflict of law provision or rule.
            </p>
            <p>
              Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Website shall be instituted exclusively in the federal courts of the United States or the courts of the State of California, in each case located in Orange County. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Waiver and Severability</h2>
            <p>
              No waiver by Aero Prosthetics of any term or condition set out in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Aero Prosthetics to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
            <p>
              If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to the Terms of Service</h2>
            <p>
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Website thereafter.
            </p>
            <p>
              Your continued use of the Website following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page from time to time so you are aware of any changes, as they are binding on you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding these Terms of Service, please contact us at:
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
