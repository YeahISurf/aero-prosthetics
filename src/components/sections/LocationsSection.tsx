import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Location details with enhanced information
const locationDetails = {
  anaheim: {
    specialists: 8,
    established: 2010,
    size: "5,600 sq ft",
    specialFeatures: ["State-of-the-art scanning equipment", "In-house fabrication lab", "Private fitting rooms"],
    accessibility: ["Wheelchair accessible", "Reserved parking", "ADA compliant facilities"],
    hours: [
      { day: "Monday - Thursday", hours: "8:00 AM - 5:00 PM" },
      { day: "Friday", hours: "8:00 AM - 4:00 PM" },
      { day: "Saturday - Sunday", hours: "Closed" }
    ],
    rating: 4.9
  },
  victorville: {
    specialists: 6,
    established: 2015,
    size: "4,200 sq ft",
    specialFeatures: ["3D scanning technology", "Custom fitting lab", "Children's play area"],
    accessibility: ["Ground floor location", "Wide doorways", "Accessible restrooms"],
    hours: [
      { day: "Monday - Thursday", hours: "8:30 AM - 5:30 PM" },
      { day: "Friday", hours: "8:30 AM - 3:00 PM" },
      { day: "Saturday - Sunday", hours: "Closed" }
    ],
    rating: 4.8
  }
};

export default function LocationsSection() {
  const t = useTranslations('home.locations');
  const details = locationDetails;

  return (
    <section className="section relative pt-24 pb-32 overflow-hidden">
      {/* Light clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/15 to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-3 z-0"></div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-blue-100/15 -z-0"></div>
      <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full bg-blue-50/15 -z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full mb-4">
            Premium Care Centers
          </span>
          <h2 className="section-title text-gray-900 mb-4">{t('title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Our state-of-the-art facilities are designed to provide the highest level of care and comfort during your prosthetic journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Anaheim Location - Premium Version */}
          <div className="bg-gradient-to-b from-white via-blue-50/10 to-white rounded-xl shadow-xl overflow-hidden border border-gray-50 transition-all duration-300 hover:shadow-2xl group">
            {/* Premium Map Visualization with Pin */}
            <div className="h-72 bg-blue-50 relative overflow-hidden">
              {/* Stylized Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 to-blue-100/50">
                {/* Map Road Elements */}
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#d1d5db" strokeWidth="12" />
                    <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#d1d5db" strokeWidth="12" />
                    <circle cx="50%" cy="50%" r="4" fill="#dc2626" strokeWidth="4" stroke="#ffffff" />
                    <rect x="40%" y="40%" width="20%" height="20%" fill="#4f46e5" fillOpacity="0.7" />
                  </svg>
                </div>
              </div>
              
              {/* Location Pin with Animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-primary-500 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {/* Animation Ripple Effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary-500 rounded-full opacity-20 animate-ping"></div>
              </div>
              
              {/* Map Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white text-center">
                <p className="font-medium">{t('anaheim.title')}</p>
                <p className="text-sm text-white/80">{t('anaheim.city')}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('anaheim.title')}</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(details.anaheim.rating) ? 'text-amber-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{details.anaheim.rating}/5</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">Est. {details.anaheim.established}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <address className="not-italic">
                    <p className="text-gray-700">{t('anaheim.address')}</p>
                    <p className="text-gray-700">{t('anaheim.city')}</p>
                    <p className="text-gray-700 font-medium">{t('anaheim.phone')}</p>
                  </address>
                  
                  {/* Specialists */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Our Team</h4>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-primary-700 text-xs font-bold">
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{details.anaheim.specialists} specialists available</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Hours of Operation</h4>
                  <ul className="space-y-1">
                    {details.anaheim.hours.map((item, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.day}</span>
                        <span className="font-medium text-gray-800">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Features Badges */}
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Facility Features</h4>
                <div className="flex flex-wrap gap-2">
                  {details.anaheim.accessibility.map((feature, index) => (
                    <span key={`acc-${index}`} className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between pt-4 border-t border-gray-100">
                <a 
                  href="https://maps.google.com/?q=1001+N+Weir+Canyon+Road,+Anaheim+Hills,+CA+92807" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn bg-primary-500 text-white hover:bg-primary-600 mb-2 sm:mb-0 text-center"
                >
                  {t('directions')}
                </a>
                <Link 
                  href="/en/locations/anaheim" 
                  className="btn bg-white text-primary-600 border border-primary-500 hover:bg-primary-50 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Victorville Location - Premium Version */}
          <div className="bg-gradient-to-b from-white via-blue-50/10 to-white rounded-xl shadow-xl overflow-hidden border border-gray-50 transition-all duration-300 hover:shadow-2xl group">
            {/* Premium Map Visualization with Pin */}
            <div className="h-72 bg-teal-50 relative overflow-hidden">
              {/* Stylized Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 to-blue-100/50">
                {/* Map Road Elements */}
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#d1d5db" strokeWidth="12" />
                    <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="#d1d5db" strokeWidth="12" />
                    <circle cx="30%" cy="50%" r="4" fill="#dc2626" strokeWidth="4" stroke="#ffffff" />
                    <rect x="60%" y="45%" width="20%" height="20%" fill="#4f46e5" fillOpacity="0.7" />
                  </svg>
                </div>
              </div>
              
              {/* Location Pin with Animation */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-primary-500 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {/* Animation Ripple Effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary-500 rounded-full opacity-20 animate-ping"></div>
              </div>
              
              {/* Map Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white text-center">
                <p className="font-medium">{t('victorville.title')}</p>
                <p className="text-sm text-white/80">{t('victorville.city')}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('victorville.title')}</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(details.victorville.rating) ? 'text-amber-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{details.victorville.rating}/5</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">Est. {details.victorville.established}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <address className="not-italic">
                    <p className="text-gray-700">{t('victorville.address')}</p>
                    <p className="text-gray-700">{t('victorville.city')}</p>
                    <p className="text-gray-700 font-medium">{t('victorville.phone')}</p>
                  </address>
                  
                  {/* Specialists */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Our Team</h4>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-primary-700 text-xs font-bold">
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{details.victorville.specialists} specialists available</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Hours of Operation</h4>
                  <ul className="space-y-1">
                    {details.victorville.hours.map((item, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.day}</span>
                        <span className="font-medium text-gray-800">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Features Badges */}
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Facility Features</h4>
                <div className="flex flex-wrap gap-2">
                  {details.victorville.accessibility.map((feature, index) => (
                    <span key={`acc-${index}`} className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between pt-4 border-t border-gray-100">
                <a 
                  href="https://maps.google.com/?q=17189+Yuma+Street,+Victorville,+CA+92395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn bg-primary-500 text-white hover:bg-primary-600 mb-2 sm:mb-0 text-center"
                >
                  {t('directions')}
                </a>
                <Link 
                  href="/en/locations/victorville" 
                  className="btn bg-white text-primary-600 border border-primary-500 hover:bg-primary-50 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Virtual Consultations Banner - Light Premium Style */}
        <div className="mt-16 bg-gradient-to-r from-blue-400 to-blue-300 rounded-xl shadow-xl p-8 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/15 to-transparent rounded-full"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <span className="inline-block px-2 py-1 bg-white/10 text-white/90 rounded-md text-sm font-medium mb-3">New Service</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Virtual Consultations Available</h3>
              <p className="text-white/80 mb-2">Unable to visit us in person? Schedule a virtual consultation with our specialists from the comfort of your home.</p>
              <div className="flex items-center mt-4">
                <svg className="h-5 w-5 text-primary-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-primary-200">Secure, HIPAA-compliant video platform</p>
              </div>
            </div>
            <div>
              <Link 
                href="/en/contact" 
                className="btn bg-white text-blue-600 hover:bg-blue-50 shadow-lg transition-all inline-block"
              >
                Schedule Now
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/en/locations" className="btn-primary bg-gradient-to-r from-primary-500 to-primary-400 shadow-lg hover:shadow-xl transition-all px-8 py-3 rounded-lg">
            {useTranslations('navigation')('locations')}
          </Link>
        </div>
      </div>
    </section>
  );
}
