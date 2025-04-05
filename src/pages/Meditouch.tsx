import { useEffect, useRef } from 'react';
import { Scissors, Zap, Droplet, Gauge, HandMetal, Sparkles, Building, Clock, CalendarClock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import SectionNav from '@/components/SectionNav';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactForm from '@/components/ContactForm';
import LocationMap from '@/components/LocationMap';

const Meditouch = () => {
  const contactSectionRef = useRef<HTMLElement>(null);

  // This effect handles scroll reveal animations
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-section');
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        if (elementTop < viewportHeight - 100) {
          element.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on initial load

    // Check if we need to scroll to contact section on load (from URL hash)
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        scrollToContact();
      }, 500);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionNavItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="scroll-smooth pt-16 md:pt-20">
        <Hero 
          title="Reveal Your Radiance: Advanced Skin & Hair Solutions" 
          subtitle="At Meditouch, our multidisciplinary team combines expertise with cutting-edge technologies to deliver personalized aesthetic treatments." 
          backgroundImage="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
          cta={{
            text: 'Request Consultation',
            link: '#contact'
          }}
          onCtaClick={scrollToContact}
        />
        
        <SectionNav 
          sections={sectionNavItems} 
          backTo={{
            path: '/',
            label: 'Mudra Group'
          }} 
          logo="meditouch-logo.png" 
          logoAlt="Meditouch" 
        />
        
        <section id="about" className="py-20 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
                <div className="rounded-lg overflow-hidden h-64">
                  <img alt="Aesthetic Treatment" src="/lovable-uploads/a60c3883-6a5c-4418-9847-73ccdec99f7b.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden h-64 mt-8">
                  <img src="https://images.unsplash.com/photo-1614859135736-99160a1757e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Spa Facial" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden h-64">
                  <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Hair Treatment" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden h-64 mt-8">
                  <img alt="Skin Care" src="/lovable-uploads/318f8dc7-4638-410e-86dc-4a4a611558ba.jpg" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-serif font-semibold mb-6">About Meditouch</h2>
                
                <div className="w-20 h-1 bg-mudra-accent mb-8"></div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Meditouch is Pune's premier destination for advanced aesthetic treatments, 
                    bringing together a multidisciplinary team of specialists to deliver 
                    comprehensive hair, skin, and body solutions.
                  </p>
                  
                  <div className="bg-mudra-secondary/5 p-6 rounded-lg border border-mudra-secondary/10">
                    <h3 className="font-serif text-xl font-medium mb-4">Our Multidisciplinary Team</h3>
                    <p className="text-gray-700 mb-4">
                      Meditouch brings together a collaborative team of aesthetic specialists:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Experienced Dermatologists</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Specialized Trichologists</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Skilled Plastic Surgeons</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Qualified Cosmetologists</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700">
                    Our approach combines clinical expertise with cutting-edge technologies like HIFU, 
                    advanced lasers, and specialized treatment protocols. We prioritize natural-looking, 
                    sustainable results through personalized treatment plans tailored to each patient's 
                    unique concerns and aesthetic goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="services" className="py-20 bg-gray-50 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-serif font-semibold mb-4">Our Aesthetic Services</h2>
              <p className="text-gray-600">
                Meditouch offers a comprehensive range of advanced hair, skin, and body treatments 
                using the latest technologies and techniques for optimal results.
              </p>
              <div className="w-20 h-1 bg-mudra-accent mx-auto mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard title="Hair Transplant" description="Advanced FUE (Follicular Unit Extraction) technique for natural-looking hair restoration with minimal scarring and faster recovery times." icon={<Scissors size={24} />} image="https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
              
              <ServiceCard title="Hair & Face PRP" description="Platelet-Rich Plasma therapy uses your body's natural growth factors to stimulate hair growth and rejuvenate facial skin for a youthful appearance." icon={<Droplet size={24} />} image="https://images.unsplash.com/photo-1614859135736-99160a1757e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
              
              <ServiceCard title="HydraFacial" description="Multi-step treatment that cleanses, exfoliates, extracts, and hydrates skin using serums filled with antioxidants, peptides, and hyaluronic acid." icon={<Sparkles size={24} />} image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
              
              <ServiceCard title="Laser Hair Reduction" description="Permanent reduction of unwanted hair using state-of-the-art laser technology, effective for various skin and hair types with minimal discomfort." icon={<Zap size={24} />} image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
              
              <ServiceCard title="Skin Tightening (HIFU)" description="High-Intensity Focused Ultrasound technology lifts and tightens skin by targeting deep layers without surgery, stimulating collagen production for natural rejuvenation." icon={<Gauge size={24} />} image="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
              
              <ServiceCard title="Body Fat & Cellulite Reduction" description="Non-invasive treatments to reduce stubborn fat deposits and improve the appearance of cellulite for a more contoured silhouette." icon={<HandMetal size={24} />} image="https://images.unsplash.com/photo-1624623876661-5e7e74075ccb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 lg:col-span-3">
                <h3 className="font-serif text-xl font-medium mb-4">Additional Aesthetic Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-3">
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Chemical Peels</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Skin PRP with Microneedling</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Wart/Tag/Mole Removal</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Tattoo Removal</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Semi-permanent Makeup</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                        <span>Personalized Skincare Consultations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
                <h3 className="font-serif text-xl font-medium mb-4">Our Technologies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Meditouch utilizes advanced, clinically-proven technologies for optimal results:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-baseline">
                    <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1"></span>
                    <span>High-Intensity Focused Ultrasound (HIFU)</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1"></span>
                    <span>State-of-the-art Laser Systems</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1"></span>
                    <span>Advanced Microneedling Devices</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1"></span>
                    <span>Medical-grade Skincare Products</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <div id="testimonials" className="reveal-section">
          <TestimonialsSection type="aesthetic" />
        </div>
        
        <section id="contact" ref={contactSectionRef} className="py-20 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-semibold mb-4">Contact Meditouch</h2>
                <div className="w-20 h-1 bg-mudra-accent mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <ContactForm formType="aesthetic" />
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
                          <p className="text-gray-600 text-sm">91129 57369</p>
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

export default Meditouch;
