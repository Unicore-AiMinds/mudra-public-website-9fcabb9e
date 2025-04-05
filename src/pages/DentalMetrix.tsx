
import { useEffect } from 'react';
import { Tooth, Smile, Sparkles, Stethoscope, Heart, Building, Clock, CalendarClock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import SectionNav from '@/components/SectionNav';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactForm from '@/components/ContactForm';
import LocationMap from '@/components/LocationMap';

const DentalMetrix = () => {
  // This effect handles scroll reveal animations
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-section');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        
        if (elementTop < viewportHeight - 100) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const sectionNavItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="scroll-smooth pt-16 md:pt-20">
        <Hero 
          title="Crafting Confident Smiles with Precision" 
          subtitle="Dental Metrix provides advanced implant solutions and esthetic dentistry to restore function and beauty to your smile."
          backgroundImage="https://images.unsplash.com/photo-1606811971618-23b39c5204f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          cta={{
            text: 'Book Appointment',
            link: '#contact',
          }}
        />
        
        <SectionNav 
          sections={sectionNavItems} 
          backTo={{
            path: '/',
            label: 'Mudra Group',
          }}
          logo="dental-metrix-logo.png"
          logoAlt="Dental Metrix"
        />
        
        <section id="about" className="py-20 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-semibold mb-6">About Dental Metrix</h2>
                
                <div className="w-20 h-1 bg-mudra-accent mb-8"></div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Dental Metrix represents the pinnacle of advanced esthetic and implant dentistry in Pune. 
                    We combine cutting-edge technology with meticulous attention to detail, 
                    ensuring exceptional results for every patient.
                  </p>
                  
                  <div className="bg-mudra-primary/5 p-6 rounded-lg border border-mudra-primary/10">
                    <h3 className="font-serif text-xl font-medium mb-4">Meet Dr. Bhargavi Railkar-Kolhapure</h3>
                    <p className="text-gray-700 mb-4">
                      Lead Prosthodontist with extensive credentials and expertise in advanced dental procedures:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                        <span>MDS Prosthodontics & Implantology</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                        <span>Certification in Maxillofacial Prosthodontics</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                        <span>Advanced Training in Full Mouth Rehabilitation</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                        <span>Specializes in Complex Implant Cases</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700">
                    Our clinic philosophy centers on comprehensive, personalized care that prioritizes 
                    both function and aesthetics. We believe in creating natural-looking smiles that 
                    enhance your overall appearance while supporting optimal oral health.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Dental Professional" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1612712191426-54334a37f7d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Dental Office" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Dental Equipment" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Dental Treatment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="services" className="py-20 bg-gray-50 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-serif font-semibold mb-4">Our Dental Services</h2>
              <p className="text-gray-600">
                We offer a comprehensive range of advanced dental treatments designed to restore 
                function, enhance aesthetics, and improve your overall quality of life.
              </p>
              <div className="w-20 h-1 bg-mudra-accent mx-auto mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard 
                title="Dental Implants" 
                description="Permanent replacement for missing teeth that look, feel and function like natural teeth. Our advanced implantology approaches ensure optimal integration and long-term success."
                icon={<Tooth size={24} />}
                image="https://images.unsplash.com/photo-1606811971618-23b39c5204f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              />
              
              <ServiceCard 
                title="Smile Designing" 
                description="Comprehensive approach to improving your smile's appearance using various treatments including veneers, bonding, and contouring to create harmonious, natural-looking results."
                icon={<Smile size={24} />}
                image="https://images.unsplash.com/photo-1581582494801-5f32dd761f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              />
              
              <ServiceCard 
                title="Teeth Whitening" 
                description="Professional whitening treatments that deliver dramatic results, removing years of stains and discoloration for a brighter, more youthful smile."
                icon={<Sparkles size={24} />}
                image="https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              />
              
              <ServiceCard 
                title="Dental Aligners" 
                description="Discreet alternative to traditional braces, custom-designed clear aligners gradually shift teeth into their ideal position for a straight, well-aligned smile."
                icon={<Stethoscope size={24} />}
                image="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              />
              
              <ServiceCard 
                title="Full Mouth Rehabilitation" 
                description="Comprehensive treatment plan that addresses multiple dental issues simultaneously, restoring both function and aesthetics for patients with extensive dental problems."
                icon={<Heart size={24} />}
                image="https://images.unsplash.com/photo-1580377968103-83d4ae369039?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              />
              
              <ServiceCard 
                title="Artificial Eyes, Ears & Nose" 
                description="Specialized maxillofacial prosthetics that restore appearance and function for patients who have lost facial structures due to congenital conditions, trauma, or surgical procedures."
                icon={<Building size={24} />}
                image="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              />
            </div>
          </div>
        </section>
        
        <div id="testimonials" className="reveal-section">
          <TestimonialsSection type="dental" />
        </div>
        
        <section id="contact" className="py-20 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-semibold mb-4">Contact Dental Metrix</h2>
                <div className="w-20 h-1 bg-mudra-accent mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <ContactForm formType="dental" />
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-serif text-xl font-medium mb-4">Clinic Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-mudra-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Mudra Dental & Aesthetic Clinic</p>
                          <p className="text-gray-600 text-sm">
                            Manas Apartment, 1st Floor, Lakaki Road, Opp. Hotel Ambience, Model Colony, Shivajinagar, Pune 411 016
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-mudra-primary mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Clinic Hours</p>
                          <p className="text-gray-600 text-sm">Mon - Sat: 10:00 am - 7:00 pm</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <CalendarClock className="h-5 w-5 text-mudra-primary mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Phone Number</p>
                          <p className="text-gray-600 text-sm">91529 51573</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <LocationMap />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DentalMetrix;
