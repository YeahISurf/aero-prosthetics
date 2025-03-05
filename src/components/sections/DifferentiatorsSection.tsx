import { useTranslations } from 'next-intl';

// Define SVG icons for each differentiator (maps to the items in translation file)
const ICONS = [
  // Innovation icon
  <svg key="innovation" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  // Personalization icon
  <svg key="personalization" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Quality icon
  <svg key="quality" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Support icon
  <svg key="support" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
];

export default function DifferentiatorsSection() {
  const t = useTranslations('home.differentiators');
  const items = t.raw('items') as Array<{ title: string; description: string }>;
  const stats = t.raw('stats') as Array<{ value: string; label: string }>;

  // Ensure we have valid arrays to prevent rendering errors
  const safeItems = items || [];
  const safeStats = stats || [];
  
  return (
    <section className="section relative overflow-hidden">
      {/* Light and clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-3 z-0"></div>
      
      {/* Subtle blue accent lines */}
      <div className="absolute left-0 top-20 w-16 h-1 bg-gradient-to-r from-blue-200 to-transparent"></div>
      <div className="absolute right-0 bottom-20 w-16 h-1 bg-gradient-to-l from-blue-200 to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title text-gray-900 mb-4 relative inline-block">
            {t('title')}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300"></span>
          </h2>
          <p className="text-lg text-gray-700 mt-6">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {safeItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-b from-white via-blue-50/10 to-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md relative overflow-hidden group"
            >
              {/* Subtle blue corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-100/30 to-transparent"></div>
              
              {/* Icon container with fancy border */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100/70 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-blue-100 group-hover:bg-blue-300 group-hover:text-blue-700 transition-colors duration-300">
                {ICONS[index % ICONS.length]}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-700 mb-6">{item.description}</p>
              
              {/* Statistics - added for premium feel */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="flex items-center">
                  {safeStats.length > 0 && (
                    <>
                      <span className="text-xl font-bold text-blue-600">
                        {safeStats[Math.min(index, safeStats.length - 1)].value}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {safeStats[Math.min(index, safeStats.length - 1)].label}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
