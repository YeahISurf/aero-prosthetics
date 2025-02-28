import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: { locale: string; member: string };
};

// Mock data for team members - in a real implementation, this would come from the CMS
const teamMembers = [
  {
    id: 'robert-chen',
    name: 'Dr. Robert Chen',
    title: 'Chief Prosthetist',
    bio: 'With over 15 years of experience, Dr. Chen specializes in advanced lower limb prosthetics and leads our clinical team. He holds a Doctorate in Prosthetics and Orthotics from Northwestern University and is certified by the American Board for Certification in Orthotics, Prosthetics & Pedorthics.',
    fullBio: 'Dr. Robert Chen brings over 15 years of specialized experience in prosthetics to Aero Prosthetics. As Chief Prosthetist, he leads our clinical team with a focus on advanced lower limb prosthetic solutions. His expertise in microprocessor knees and sports-specific prosthetics has helped countless patients regain mobility and pursue active lifestyles.\n\nAfter earning his Doctorate in Prosthetics and Orthotics from Northwestern University, Dr. Chen completed advanced training in biomechanics and gait analysis. His research on optimizing prosthetic alignment for various activities has been published in several peer-reviewed journals.\n\nDr. Chen is passionate about personalized care and takes time to understand each patient\'s unique needs, goals, and lifestyle. He believes in a collaborative approach, working closely with physical therapists and other healthcare providers to ensure comprehensive care.\n\nIn addition to his clinical work, Dr. Chen is an active educator, regularly presenting at professional conferences and mentoring the next generation of prosthetists. He remains at the forefront of prosthetic technology, continuously evaluating new innovations to bring the best solutions to his patients.',
    image: '/placeholder-team.svg',
    specialties: ['Lower Limb Prosthetics', 'Microprocessor Knees', 'Sports Prosthetics'],
    education: ['Doctorate in Prosthetics and Orthotics, Northwestern University', 'BS in Biomedical Engineering, UC Berkeley'],
    certifications: ['ABC Certified Prosthetist Orthotist', 'Licensed Prosthetist Orthotist - California'],
    publications: [
      'Chen R, et al. "Optimizing Prosthetic Alignment for Various Activities of Daily Living." Journal of Prosthetics and Orthotics, 2020.',
      'Chen R, Smith J. "Advancements in Microprocessor Knee Technology for Improved Patient Outcomes." Clinical Biomechanics, 2018.',
      'Wilson T, Chen R. "Pediatric Prosthetic Solutions: A Comprehensive Approach." Pediatric Rehabilitation, 2016.',
    ],
  },
  {
    id: 'maria-rodriguez',
    name: 'Dr. Maria Rodriguez',
    title: 'Lead Orthotist',
    bio: 'Dr. Rodriguez specializes in pediatric orthotics and has pioneered several innovative treatment approaches. With a background in physical therapy and biomechanics, she brings a comprehensive approach to orthotic interventions.',
    fullBio: 'Dr. Maria Rodriguez is our Lead Orthotist, specializing in pediatric orthotic interventions and scoliosis management. With dual training in physical therapy and orthotics, she brings a unique perspective to patient care, focusing on both the biomechanical and functional aspects of orthotic treatment.\n\nAfter completing her Doctorate in Orthotics and Prosthetics at the University of Washington, Dr. Rodriguez pursued specialized training in pediatric care. Her innovative approach to scoliosis bracing has improved outcomes for many young patients, allowing them to maintain active lifestyles while effectively managing their condition.\n\nDr. Rodriguez is particularly passionate about working with children and their families. She takes time to educate parents and children about their orthotic devices, ensuring they understand the purpose and proper use of their braces. Her patient and compassionate approach helps ease the adjustment period for young patients.\n\nAs a bilingual practitioner (English/Spanish), Dr. Rodriguez has been instrumental in expanding our services to the Spanish-speaking community. She regularly participates in community outreach programs to increase awareness about early intervention for pediatric orthotic needs.\n\nIn addition to her clinical work, Dr. Rodriguez conducts research on cranial remolding techniques and has developed protocols that have been adopted by other clinics nationwide.',
    image: '/placeholder-team.svg',
    specialties: ['Pediatric Orthotics', 'Scoliosis Bracing', 'Cranial Remolding'],
    education: ['Doctorate in Orthotics and Prosthetics, University of Washington', 'MS in Physical Therapy, UCLA'],
    certifications: ['ABC Certified Orthotist', 'Licensed Orthotist - California', 'Pediatric Specialist Certification'],
    publications: [
      'Rodriguez M, et al. "Outcomes of Early Intervention in Cranial Remolding Therapy." Journal of Pediatric Rehabilitation, 2021.',
      'Rodriguez M, Johnson K. "Innovative Approaches to Scoliosis Bracing in Adolescents." Spine, 2019.',
      'Rodriguez M. "Bilingual Care in Pediatric Orthotics: Addressing Cultural Considerations." Journal of Cultural Diversity in Healthcare, 2017.',
    ],
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    title: 'Clinical Director',
    bio: 'James oversees our clinical operations and ensures every patient receives personalized, comprehensive care. With a background in healthcare administration and prosthetics, he bridges the gap between clinical excellence and operational efficiency.',
    fullBio: 'James Wilson serves as the Clinical Director at Aero Prosthetics, overseeing all clinical operations and ensuring that every patient receives comprehensive, coordinated care. With dual expertise in prosthetics and healthcare administration, James plays a crucial role in maintaining our high standards of patient care while optimizing operational efficiency.\n\nAfter earning his BS in Prosthetics and Orthotics from Cal State Dominguez Hills, James practiced as a prosthetist for several years before pursuing his MS in Healthcare Administration from USC. This combination of clinical and administrative knowledge allows him to understand both the technical aspects of prosthetic care and the systems needed to deliver that care effectively.\n\nJames is particularly skilled at navigating the complex insurance landscape, helping patients understand their coverage and advocating for them when necessary. He has developed streamlined processes for insurance verification and authorization, reducing delays in patient care.\n\nAs Clinical Director, James coordinates care across our multidisciplinary team, ensuring seamless communication between practitioners, technicians, and administrative staff. He also oversees our quality improvement initiatives, continuously seeking ways to enhance patient outcomes and satisfaction.\n\nJames is committed to creating a positive, supportive environment for both patients and staff. His leadership has been instrumental in building our reputation for excellence in patient care and professional collaboration.',
    image: '/placeholder-team.svg',
    specialties: ['Clinical Management', 'Patient Care Coordination', 'Insurance Navigation'],
    education: ['MS in Healthcare Administration, USC', 'BS in Prosthetics and Orthotics, Cal State Dominguez Hills'],
    certifications: ['ABC Certified Prosthetist', 'Healthcare Management Certification'],
    publications: [
      'Wilson J, et al. "Optimizing Clinical Workflows in Prosthetic Practice." Journal of Prosthetic Practice Management, 2022.',
      'Wilson J, Chen R. "Insurance Navigation for Complex Prosthetic Cases: A Case Study Approach." Healthcare Administration Quarterly, 2020.',
      'Wilson J. "Implementing Quality Improvement Initiatives in Prosthetic and Orthotic Clinics." Quality in Healthcare, 2018.',
    ],
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Upper Limb Specialist',
    bio: 'Sarah specializes in upper limb prosthetics, with particular expertise in myoelectric devices and activity-specific adaptations. She works closely with occupational therapists to ensure optimal functional outcomes for patients.',
    fullBio: 'Sarah Johnson is our Upper Limb Specialist, focusing exclusively on prosthetic solutions for individuals with upper limb differences or amputations. With specialized training in myoelectric technology and activity-specific adaptations, Sarah helps patients regain function and independence in their daily activities.\n\nAfter completing her MS in Prosthetics and Orthotics at Georgia Tech, Sarah pursued advanced training in upper limb prosthetics, including certification in various myoelectric systems. Her expertise spans the full range of upper limb prosthetic options, from body-powered devices to the latest microprocessor-controlled systems.\n\nSarah takes a highly collaborative approach to patient care, working closely with occupational therapists, hand surgeons, and rehabilitation specialists to ensure comprehensive treatment. She believes that successful upper limb prosthetic outcomes depend not only on the right device but also on proper training and ongoing support.\n\nKnown for her creativity and problem-solving skills, Sarah excels at developing custom adaptations for specific activities and occupations. Whether helping a musician return to playing their instrument or enabling a parent to care for their young child, she focuses on the activities that matter most to each individual.\n\nSarah leads our upper limb prosthetic support group, creating a community where patients can share experiences and strategies. She is passionate about connecting patients with peer mentors who can provide both practical advice and emotional support during the adjustment process.',
    image: '/placeholder-team.svg',
    specialties: ['Upper Limb Prosthetics', 'Myoelectric Devices', 'Activity-Specific Adaptations'],
    education: ['MS in Prosthetics and Orthotics, Georgia Tech', 'BS in Kinesiology, University of Michigan'],
    certifications: ['ABC Certified Prosthetist', 'Upper Limb Prosthetics Specialist'],
    publications: [
      'Johnson S, et al. "Functional Outcomes with Myoelectric Prostheses: A Longitudinal Study." Journal of Hand Therapy, 2021.',
      'Johnson S, Williams T. "Activity-Specific Terminal Devices: Improving Engagement in Meaningful Occupations." American Journal of Occupational Therapy, 2019.',
      'Johnson S. "Collaborative Care in Upper Limb Prosthetics: The Role of the Interdisciplinary Team." Rehabilitation Quarterly, 2017.',
    ],
  },
  {
    id: 'michael-thompson',
    name: 'Michael Thompson',
    title: 'Pediatric Specialist',
    bio: 'Michael specializes in pediatric prosthetics and orthotics, working with children from infancy through adolescence. His patient and compassionate approach helps children and their families navigate the unique challenges of pediatric prosthetic and orthotic care.',
    fullBio: 'Michael Thompson is our Pediatric Specialist, dedicated to providing prosthetic and orthotic care for children from infancy through adolescence. With specialized training in pediatric care and child development, Michael understands the unique physical, emotional, and social needs of growing children.\n\nAfter earning his MS in Prosthetics and Orthotics from Northwestern University, Michael completed additional training in pediatric care and developmental adaptations. His background in child development from Stanford University gives him insight into how prosthetic and orthotic interventions can support overall development and milestone achievement.\n\nMichael is known for his patient, gentle approach with young patients. He takes time to build rapport with children, making the fitting and adjustment process less intimidating. He also works closely with parents, providing education and support as they help their child adapt to a new device.\n\nAs children grow, their prosthetic and orthotic needs change rapidly. Michael excels at anticipating these changes and developing solutions that accommodate growth while maintaining function. He is particularly skilled at creating devices that allow children to participate fully in age-appropriate activities, from playground play to organized sports.\n\nMichael leads our pediatric support program, which includes regular events where young patients can meet others with similar experiences. He believes in the importance of peer connections for building confidence and resilience in children with limb differences or orthotic needs.',
    image: '/placeholder-team.svg',
    specialties: ['Pediatric Prosthetics', 'Pediatric Orthotics', 'Developmental Adaptations'],
    education: ['MS in Prosthetics and Orthotics, Northwestern University', 'BS in Child Development, Stanford University'],
    certifications: ['ABC Certified Prosthetist Orthotist', 'Pediatric Specialist Certification'],
    publications: [
      'Thompson M, et al. "Growth Considerations in Pediatric Prosthetic Design." Journal of Pediatric Rehabilitation, 2022.',
      'Thompson M, Rodriguez M. "Play-Friendly Prosthetic Designs for Young Children." Pediatric Prosthetics and Orthotics, 2020.',
      'Thompson M. "Supporting Developmental Milestones Through Adaptive Prosthetic Solutions." Child Development Perspectives, 2018.',
    ],
  },
  {
    id: 'jennifer-garcia',
    name: 'Jennifer Garcia',
    title: 'Patient Care Coordinator',
    bio: 'Jennifer coordinates patient care across our clinical team, ensuring seamless communication and continuity of care. With a background in nursing and healthcare administration, she advocates for patients throughout their treatment journey.',
    fullBio: 'Jennifer Garcia serves as our Patient Care Coordinator, the central point of contact for patients navigating their prosthetic or orthotic care journey. With her background in nursing and healthcare administration, Jennifer ensures that each patient receives coordinated, comprehensive care from their initial consultation through ongoing follow-up.\n\nAfter earning her BSN from UCLA, Jennifer worked as a registered nurse in rehabilitation settings before transitioning to her role in patient care coordination. Her clinical experience gives her valuable insight into the rehabilitation process and the importance of coordinated care for optimal outcomes.\n\nJennifer is a skilled patient advocate, helping individuals navigate insurance coverage, appointment scheduling, and communication with their care team. She takes time to understand each patient\'s unique circumstances and concerns, providing personalized support throughout their treatment.\n\nAs a bilingual professional fluent in English and Spanish, Jennifer has been instrumental in expanding our services to Spanish-speaking patients. She ensures that language barriers do not impede access to quality care or clear communication about treatment options.\n\nJennifer coordinates our patient education programs, organizing workshops and developing materials to help patients understand their devices and care. She believes that informed patients are empowered to take an active role in their rehabilitation and ongoing health maintenance.',
    image: '/placeholder-team.svg',
    specialties: ['Patient Advocacy', 'Care Coordination', 'Bilingual Services (English/Spanish)'],
    education: ['BSN, Nursing, UCLA', 'Healthcare Administration Certificate, UCI'],
    certifications: ['Registered Nurse', 'Certified Patient Advocate'],
    publications: [
      'Garcia J, et al. "Improving Patient Navigation in Prosthetic and Orthotic Care." Patient Experience Journal, 2021.',
      'Garcia J, Wilson J. "Bilingual Services in Healthcare: Addressing Disparities in Access to Specialized Care." Journal of Healthcare Equity, 2019.',
      'Garcia J. "The Role of Patient Advocates in Prosthetic and Orthotic Services." Rehabilitation Nursing, 2017.',
    ],
  },
];

export async function generateMetadata({ params: { locale, member } }: Props) {
  const memberData = teamMembers.find((m) => m.id === member);
  if (!memberData) return {};

  // NOTE: Translation variable removed for deployment - will be added back in future development
  await getTranslations({ locale, namespace: 'team' });

  return constructMetadata({
    title: memberData.name,
    description: memberData.bio,
    keywords: ['team', 'specialist', 'prosthetist', 'orthotist', memberData.name.toLowerCase()],
  });
}

export default function TeamMemberPage({ params: { locale, member } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  const memberData = teamMembers.find((m) => m.id === member);
  if (!memberData) notFound();
  
  // NOTE: Translation function removed for deployment - will be added back in future development

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <Link 
            href="/team" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Team
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="bg-white/10 rounded-lg h-64 md:h-80 relative overflow-hidden">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  Team Member Photo
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{memberData.name}</h1>
              <p className="text-xl text-white/90 mb-6">{memberData.title}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {memberData.specialties.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <p className="text-lg text-white/80">{memberData.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Biography</h2>
            
            {memberData.fullBio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Credentials</h2>
            
            <div className="space-y-8">
              {/* Education */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary-600">Education</h3>
                <ul className="space-y-2">
                  {memberData.education.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Certifications */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary-600">Certifications</h3>
                <ul className="space-y-2">
                  {memberData.certifications.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Publications */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary-600">Publications</h3>
                <ul className="space-y-2">
                  {memberData.publications.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Schedule a Consultation with {memberData.name.split(' ')[0]}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today to schedule an appointment and learn how {memberData.name.split(' ')[0]} can help with your prosthetic or orthotic needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                {useTranslations('cta')('contactUs')}
              </Link>
              <Link href="/team" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
                View All Team Members
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return teamMembers.map((member) => ({
    member: member.id,
  }));
}
