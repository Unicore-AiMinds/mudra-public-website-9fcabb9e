import { useEffect, useRef, useState } from 'react';
import { Stethoscope, Smile, Sparkles, Heart, Building, Clock, CalendarClock, MapPin, Baby, UserCheck, Scissors, Shield, Crown, Cross, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactForm from '@/components/ContactForm';
import LocationMap from '@/components/LocationMap';

const DentalMetrix = () => {
  const brandMode = import.meta.env.VITE_BRAND_MODE;
  const clinicName = brandMode === 'dental' ? 'Dental Metrix' : 
                    brandMode === 'meditouch' ? 'Meditouch' : 
                    'Mudra Dental & Aesthetic Clinic';
  const contactSectionRef = useRef<HTMLElement>(null);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // All services as a flat array
  const allServices = [
    { title: "Dental Implants", description: "A medical device that replaces a missing tooth's root and supports restorations like crowns and bridges.", icon: <Stethoscope size={24} />, image: "/images/dental-implants.jpg" },
    { title: "RCT & Crown", description: "Root canal treatment treats infected pulp and crowns restore teeth structure and function.", icon: <Crown size={24} />, image: "/images/root-canal-treatment.jpg" },
    { title: "Wisdom Tooth Extraction", description: "A surgical procedure to remove one or more wisdom teeth that may be impacted or causing discomfort.", icon: <Scissors size={24} />, image: "/images/wisdom-tooth-extraction.jpg" },
    { title: "Aligners", description: "A type of orthodontic device that straightens teeth and corrects alignment without traditional braces.", icon: <Shield size={24} />, image: "/images/aligners.jpg" },
    { title: "Teeth Whitening", description: "A cosmetic procedure that lightens tooth color, removes stains and improves appearance.", icon: <Sparkles size={24} />, image: "/images/teeth-whitening.jpg" },
    { title: "Scaling & Polishing", description: "A professional cleaning procedure where plaque and tartar are removed using specialized instruments.", icon: <Building size={24} />, image: "/images/scaling-polishing.jpg" },
    { title: "Pediatric Dentistry", description: "Specialized dental care for children focusing on prevention and early intervention.", icon: <Baby size={24} />, image: "/images/pediatric-dentistry.jpg" },
    { title: "Smile Redesign", description: "A cosmetic procedure that enhances smile appearance by addressing dental concerns and aesthetics.", icon: <Smile size={24} />, image: "/images/smile-redesign.jpg" },
    { title: "Full Mouth Rehabilitation", description: "Comprehensive restoration of all teeth to improve function, health, and aesthetics of the entire mouth.", icon: <Heart size={24} />, image: "/images/full-mouth-rehabilitation.jpg" },
    { title: "Maxillofacial Prosthesis", description: "Artificial replacements for facial structures lost due to trauma, surgery, or congenital conditions.", icon: <UserCheck size={24} />, image: "/images/maxillofacial-prosthesis.jpeg" }
  ];

  // Desktop layout (4 slides: 2, 2, 3, 3)
  const desktopServiceSlides = [
    [allServices[0], allServices[1]], // 2 services
    [allServices[2], allServices[3]], // 2 services
    [allServices[4], allServices[5], allServices[6]], // 3 services  
    [allServices[7], allServices[8], allServices[9]] // 3 services
  ];

  // Mobile layout (5 slides with 2 services each)
  const mobileServiceSlides = [
    [allServices[0], allServices[1]], // Slide 1: Dental Implants, RCT & Crown
    [allServices[2], allServices[3]], // Slide 2: Wisdom Tooth Extraction, Aligners
    [allServices[4], allServices[5]], // Slide 3: Teeth Whitening, Scaling & Polishing
    [allServices[6], allServices[7]], // Slide 4: Pediatric Dentistry, Smile Redesign
    [allServices[8], allServices[9]]  // Slide 5: Full Mouth Rehabilitation, Maxillofacial Prosthesis
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

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

    // Check if we need to scroll to any section on load (from URL hash)
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const sectionId = hash.substring(1); // Remove the '#'
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Auto-rotate services carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const maxSlides = isMobile ? mobileServiceSlides.length : desktopServiceSlides.length;
      setCurrentServiceSlide((prev) => (prev === maxSlides - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [isMobile, mobileServiceSlides.length, desktopServiceSlides.length]);

  // Reset slide when screen size changes
  useEffect(() => {
    setCurrentServiceSlide(0);
  }, [isMobile]);

  const handleServicePrev = () => {
    const maxSlides = isMobile ? mobileServiceSlides.length : desktopServiceSlides.length;
    setCurrentServiceSlide((prev) => (prev === 0 ? maxSlides - 1 : prev - 1));
  };

  const handleServiceNext = () => {
    const maxSlides = isMobile ? mobileServiceSlides.length : desktopServiceSlides.length;
    setCurrentServiceSlide((prev) => (prev === maxSlides - 1 ? 0 : prev + 1));
  };

  // Mobile swipe handlers (only on mobile view)
  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return; // Only on mobile
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return; // Only on mobile
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!isMobile) return; // Only on mobile
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleServiceNext();
    }
    if (isRightSwipe) {
      handleServicePrev();
    }
  };

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
          title="Crafting Confident Smiles with Precision" 
          subtitle="Dental Metrix provides advanced implant solutions and esthetic dentistry to restore function and beauty to your smile." 
          backgroundImage="/images/dental-treatment-room.jpg" 
          cta={{
            text: 'Book Appointment',
            link: '#contact'
          }}
          onCtaClick={scrollToContact}
        />
        
        
        <section id="about" className="pt-40 pb-24 md:py-24 bg-gradient-to-br from-mudra-gray-50 via-white to-mudra-primary-lightest/30 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-serif font-semibold mb-8 text-mudra-primary-dark">About Dental Metrix</h2>
                
                <div className="w-24 h-1.5 bg-gradient-to-r from-mudra-accent via-mudra-accent-light to-mudra-accent-lighter mb-10 rounded-full"></div>
                
                <div className="space-y-8">
                  <p className="text-lg text-mudra-dark/90 leading-relaxed">
                    Dental Metrix represents the pinnacle of advanced esthetic and implant dentistry in Pune. 
                    We combine cutting-edge technology with meticulous attention to detail, 
                    ensuring exceptional results for every patient.
                  </p>
                  
                  <div className="bg-gradient-to-br from-mudra-primary-lightest/60 to-mudra-secondary-lightest/40 p-8 rounded-2xl border-2 border-mudra-primary-lighter/30 shadow-lg shadow-mudra-primary/5">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img 
                          src="/images/dr-bhargavi.png" 
                          alt="Dr. Bhargavi Railkar-Kolhapure" 
                          className="w-48 h-56 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-medium mb-4 text-mudra-primary-dark">Meet Dr. Bhargavi Railkar-Kolhapure</h3>
                        <p className="text-mudra-dark/80 mb-4 text-sm leading-relaxed">
                          Lead Prosthodontist specializing in advanced dental procedures.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-baseline">
                            <span className="w-2 h-2 bg-gradient-to-r from-mudra-accent to-mudra-accent-light rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span className="text-mudra-dark/90 text-sm">MDS Prosthodontics & Implantology</span>
                          </li>
                          <li className="flex items-baseline">
                            <span className="w-2 h-2 bg-gradient-to-r from-mudra-accent to-mudra-accent-light rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span className="text-mudra-dark/90 text-sm">Maxillofacial Prosthodontics Certification</span>
                          </li>
                          <li className="flex items-baseline">
                            <span className="w-2 h-2 bg-gradient-to-r from-mudra-accent to-mudra-accent-light rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span className="text-mudra-dark/90 text-sm">Full Mouth Rehabilitation Expert</span>
                          </li>
                          <li className="flex items-baseline">
                            <span className="w-2 h-2 bg-gradient-to-r from-mudra-accent to-mudra-accent-light rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span className="text-mudra-dark/90 text-sm">Complex Implant Specialist</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">
                    Our clinic philosophy centers on comprehensive, personalized care that prioritizes 
                    both function and aesthetics. We believe in creating natural-looking smiles that 
                    enhance your overall appearance while supporting optimal oral health.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="hover:ring-2 hover:ring-mudra-accent/40 transition-all duration-300 rounded-lg overflow-hidden">
                  <img src="/images/dental-reception.jpeg" alt="Dental Metrix Reception Area" className="w-full h-auto rounded-lg" loading="lazy" />
                </div>
                <div className="mt-8 rounded-lg overflow-hidden">
                  <img alt="Dental Metrix Waiting Area" src="/images/dental-waiting-area.jpeg" className="w-full h-auto rounded-lg" loading="lazy" />
                </div>
                <div className="hover:ring-2 hover:ring-mudra-accent/40 transition-all duration-300 rounded-lg overflow-hidden">
                  <img src="/images/dental-smile-wall.jpeg" alt="Dental Metrix Smile Wall" className="w-full h-auto rounded-lg" loading="lazy" />
                </div>
                <div className="mt-8 rounded-lg overflow-hidden">
                  <img src="/images/dental-treatment-room-2.jpg" alt="Dental Metrix Treatment Room" className="w-full h-auto rounded-lg" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="services" className="py-28 bg-gradient-to-br from-mudra-light-teal via-white to-mudra-gray-100 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl font-serif font-semibold mb-6 text-mudra-primary-dark">Our Comprehensive Dental Services</h2>
              <p className="text-lg text-mudra-dark/80 leading-relaxed">
                Excellence in dental care with personalized treatment solutions
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-mudra-accent via-mudra-accent-light to-mudra-accent-lighter mx-auto mt-10 rounded-full"></div>
            </div>
            
            {/* Services Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                {/* Mobile Layout - Single Column with 2 services per slide */}
                <div className="md:hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentServiceSlide * 100}%)` }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    {mobileServiceSlides.map((slide, slideIndex) => (
                      <div key={`mobile-${slideIndex}`} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-1 gap-6">
                          {slide.map((service, serviceIndex) => (
                            <ServiceCard 
                              key={`mobile-${slideIndex}-${serviceIndex}`}
                              title={service.title}
                              description={service.description}
                              icon={service.icon}
                              image={service.image}
                              theme="dental"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Layout - Original multi-column grid */}
                <div className="hidden md:block">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentServiceSlide * 100}%)` }}
                  >
                    {desktopServiceSlides.map((slide, slideIndex) => (
                      <div key={`desktop-${slideIndex}`} className="w-full flex-shrink-0">
                        <div className={`grid gap-6 ${slide.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'}`}>
                          {slide.map((service, serviceIndex) => (
                            <ServiceCard 
                              key={`desktop-${slideIndex}-${serviceIndex}`}
                              title={service.title}
                              description={service.description}
                              icon={service.icon}
                              image={service.image}
                              theme="dental"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <button 
                  onClick={handleServicePrev}
                  className="p-2 rounded-full border border-mudra-primary/20 hover:bg-mudra-primary/10 hover:border-mudra-primary/40 transition-colors"
                  aria-label="Previous services"
                >
                  <ChevronLeft className="h-5 w-5 text-mudra-primary" />
                </button>
                
                {/* Mobile Pagination */}
                <div className="flex space-x-2 md:hidden">
                  {mobileServiceSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentServiceSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentServiceSlide ? 'bg-mudra-primary' : 'bg-mudra-primary/20'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Desktop Pagination */}
                <div className="hidden md:flex space-x-2">
                  {desktopServiceSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentServiceSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentServiceSlide ? 'bg-mudra-primary' : 'bg-mudra-primary/20'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleServiceNext}
                  className="p-2 rounded-full border border-mudra-primary/20 hover:bg-mudra-primary/10 hover:border-mudra-primary/40 transition-colors"
                  aria-label="Next services"
                >
                  <ChevronRight className="h-5 w-5 text-mudra-primary" />
                </button>
              </div>
              
              {/* Mobile Counter */}
              <div className="text-center mt-4 md:hidden">
                <p className="text-sm text-gray-500">
                  {currentServiceSlide + 1} of {mobileServiceSlides.length}
                </p>
              </div>

              {/* Desktop Counter */}
              <div className="hidden md:block text-center mt-4">
                <p className="text-sm text-gray-500">
                  {currentServiceSlide + 1} of {desktopServiceSlides.length}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div id="testimonials" className="reveal-section scroll-mt-24">
          <TestimonialsSection type="dental" />
        </div>
        
        <section id="contact" ref={contactSectionRef} className="py-20 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-semibold mb-4">Contact Dental Metrix</h2>
                <div className="w-20 h-1 bg-mudra-accent mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                <div className="lg:col-span-3">
                  <ContactForm formType="dental" />
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-serif text-xl font-medium mb-4">Clinic Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-mudra-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{clinicName}</p>
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
                          <p className="text-gray-600 text-sm">+919152951573</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Map - Full Width Below Contact Form */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-semibold mb-2">Visit Our Clinic</h3>
                  <p className="text-gray-600">Find us easily with our interactive map</p>
                  <div className="w-16 h-1 bg-mudra-accent mx-auto mt-4"></div>
                </div>
                <LocationMap />
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
