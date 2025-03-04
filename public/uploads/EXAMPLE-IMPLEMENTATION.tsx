// This is an example component showing how to use the image uploads directories

import Image from 'next/image';
import OptimizedImage from '@/components/ui/OptimizedImage';

// Example of a component that uses images from various upload directories
export default function ImageExampleComponent() {
  
  return (
    <section className="py-12">
      <div className="container mx-auto">
        {/* Example 1: Hero image using Next.js Image */}
        <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
          <Image 
            src="/uploads/hero/main-hero.jpg" 
            alt="Advanced prosthetic solutions"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
            <div className="px-8">
              <h1 className="text-4xl font-bold text-white mb-4">Premium Prosthetic Solutions</h1>
              <p className="text-white/90 text-xl">Restore mobility with advanced technology</p>
            </div>
          </div>
        </div>
        
        {/* Example 2: Team members using OptimizedImage */}
        <h2 className="text-3xl font-bold mb-8">Our Specialists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Team member 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <OptimizedImage 
                src="/uploads/team/dr-smith.jpg"
                alt="Dr. Smith, Chief Prosthetist"
                width={300}
                height={300}
                className="rounded-lg mx-auto"
                importance="medium"
              />
            </div>
            <h3 className="text-xl font-bold text-center">Dr. Smith</h3>
            <p className="text-blue-600 text-center">Chief Prosthetist</p>
          </div>
          
          {/* Team member 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <OptimizedImage 
                src="/uploads/team/jane-doe.jpg"
                alt="Jane Doe, Orthotic Specialist"
                width={300}
                height={300}
                className="rounded-lg mx-auto"
                importance="medium"
              />
            </div>
            <h3 className="text-xl font-bold text-center">Jane Doe</h3>
            <p className="text-blue-600 text-center">Orthotic Specialist</p>
          </div>
          
          {/* Team member 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <OptimizedImage 
                src="/uploads/team/james-wilson.jpg"
                alt="James Wilson, Research Director"
                width={300}
                height={300}
                className="rounded-lg mx-auto"
                importance="medium"
              />
            </div>
            <h3 className="text-xl font-bold text-center">James Wilson</h3>
            <p className="text-blue-600 text-center">Research Director</p>
          </div>
        </div>
        
        {/* Example 3: Services with images */}
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="h-64 relative">
              <Image 
                src="/uploads/services/lower-limb-prosthetic.jpg"
                alt="Lower Limb Prosthetics"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Lower Limb Prosthetics</h3>
              <p className="text-gray-700">
                Custom-designed prosthetic solutions for below-knee, above-knee, 
                and partial foot amputations.
              </p>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="h-64 relative">
              <Image 
                src="/uploads/services/upper-limb-prosthetic.jpg"
                alt="Upper Limb Prosthetics"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Upper Limb Prosthetics</h3>
              <p className="text-gray-700">
                Advanced prosthetic options for hand, wrist, elbow, and shoulder amputations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Example 4: Testimonial with avatar */}
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="bg-blue-50 rounded-lg p-8 shadow-lg mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src="/uploads/testimonials/michael-johnson.jpg"
                alt="Michael Johnson"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <blockquote className="text-lg italic text-gray-700 mb-4">
                &quot;The team at Aero Prosthetics changed my life. Their personalized approach 
                and cutting-edge technology gave me back my mobility and confidence.&quot;
              </blockquote>
              <p className="font-bold">Michael Johnson</p>
              <p className="text-blue-600">Anaheim, CA</p>
            </div>
          </div>
        </div>
        
        {/* Example 5: Location with gallery image */}
        <h2 className="text-3xl font-bold mb-8">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="h-64 relative">
              <Image 
                src="/uploads/locations/anaheim-exterior.jpg"
                alt="Anaheim Location"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Anaheim Location</h3>
              <p className="text-gray-700">1001 N Weir Canyon Road, Anaheim Hills, CA 92807</p>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="h-64 relative">
              <Image 
                src="/uploads/locations/victorville-exterior.jpg"
                alt="Victorville Location"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Victorville Location</h3>
              <p className="text-gray-700">17189 Yuma Street, Victorville, CA 92395</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
