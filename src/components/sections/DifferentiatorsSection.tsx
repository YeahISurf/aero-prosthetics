import { useTranslations } from 'next-intl';

export default function DifferentiatorsSection() {
  const t = useTranslations('home.differentiators');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-primary-600">{t('title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]"
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                {/* Placeholder for icon - would be replaced with actual icons */}
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
