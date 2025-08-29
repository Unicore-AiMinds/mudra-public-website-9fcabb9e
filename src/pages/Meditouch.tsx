import { useEffect, useRef, useState } from 'react';
import { Scissors, Zap, Droplet, Gauge, HandMetal, Sparkles, Building, Clock, CalendarClock, Eraser, Paintbrush, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import SectionNav from '@/components/SectionNav';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactForm from '@/components/ContactForm';
import LocationMap from '@/components/LocationMap';
const Meditouch = () => {
  const brandMode = import.meta.env.VITE_BRAND_MODE;
  const clinicName = brandMode === 'dental' ? 'Dental Metrix' : 
                    brandMode === 'meditouch' ? 'Meditouch' : 
                    'Mudra Dental & Aesthetic Clinic';
  const contactSectionRef = useRef<HTMLElement>(null);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  
  const serviceSlides = [
    // Slide 1: 3 services
    [
      { title: "HydraFacial Skin Rejuvenation", description: "A non-invasive facial treatment that deeply cleanses, exfoliates, extracts impurities from pores, and intensely hydrates the skin.", icon: <Sparkles size={24} />, image: "/images/hydrafacial-skin-rejuvenation.jpg" },
      { title: "Removal of Warts, Skin Tags & Moles", description: "Safe and effective removal of benign skin growths using advanced techniques for smooth, clear skin.", icon: <Eraser size={24} />, image: "/images/warts-skin-tags-moles-removal.jpg" },
      { title: "Chemical Peel", description: "A cosmetic procedure that uses a chemical solution to improve the appearance of the skin and treat acne, pimples and brightening.", icon: <Droplet size={24} />, image: "/images/chemical-peel.jpg" }
    ],
    // Slide 2: 3 services
    [
      { title: "Body Peel", description: "A chemical exfoliation treatment that removes dead skin cells from the body, improving skin texture and tone.", icon: <HandMetal size={24} />, image: "/images/body-peel.webp" },
      { title: "Tattoo Removal (Laser)", description: "Uses a laser to break down and remove tattoo ink from the skin, offering a clean slate for those with unwanted tattoos.", icon: <Zap size={24} />, image: "/images/tattoo-removal-laser.jpg" },
      { title: "Hair Transplants", description: "A surgical procedure that moves hair to treat hair loss, also known as hair restoration or hair replacement.", icon: <Scissors size={24} />, image: "/images/hair-transplants.jpg" }
    ],
    // Slide 3: 3 services
    [
      { title: "Hifu", description: "Skin lifting procedure that tightens skin, removes excess skin, or repositions it for a more youthful appearance.", icon: <Gauge size={24} />, image: "/images/hifu.jpg" },
      { title: "Skin PRP with Microneedling", description: "Combines microneedling with platelet-rich plasma to rejuvenate the skin, reducing wrinkles and acne scars.", icon: <Building size={24} />, image: "/images/skin-prp-microneedling.webp" },
      { title: "Semi Permanent Makeup", description: "Also known as micropigmentation, enhances facial features through the application of pigments by specialists.", icon: <Paintbrush size={24} />, image: "/images/semi-permanent-makeup.jpg" }
    ]
  ];

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
    };
  }, []);

  // Auto-rotate services carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceSlide((prev) => (prev === serviceSlides.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [serviceSlides.length]);

  const handleServicePrev = () => {
    setCurrentServiceSlide((prev) => (prev === 0 ? serviceSlides.length - 1 : prev - 1));
  };

  const handleServiceNext = () => {
    setCurrentServiceSlide((prev) => (prev === serviceSlides.length - 1 ? 0 : prev + 1));
  };
  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const sectionNavItems = [{
    id: 'about',
    label: 'About'
  }, {
    id: 'services',
    label: 'Services'
  }, {
    id: 'testimonials',
    label: 'Testimonials'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  return <div className="min-h-screen">
      <Navbar />
      
      <main className="scroll-smooth pt-16 md:pt-20">
        <Hero 
          title="Reveal Your Radiance: Advanced Skin & Hair Solutions" 
          subtitle="At Meditouch, our multidisciplinary team combines expertise with cutting-edge technologies to deliver personalized aesthetic treatments." 
          backgroundImage="/images/hero-image-1.webp"
          cta={{
            text: 'Request Consultation',
            link: '#contact'
          }} 
          onCtaClick={scrollToContact} 
          theme="meditouch" 
        />
        
        
        <section id="about" className="py-24 bg-gradient-to-br from-meditouch-warm-50 via-white to-meditouch-primary-lightest/40 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="grid grid-cols-2 gap-6 order-2 md:order-1">
                <div className="hover:ring-2 hover:ring-meditouch-primary/40 transition-all duration-300 rounded-lg overflow-hidden h-48">
                  <img alt="Meditouch Clinic Interior" src="/images/hero-image-1.webp" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="mt-8 rounded-lg overflow-hidden h-48">
                  <img alt="Aesthetic Treatment Room" src="/images/hero-image-4.webp" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="hover:ring-2 hover:ring-meditouch-primary/40 transition-all duration-300 rounded-lg overflow-hidden h-48">
                  <img src="/images/hero-image-3.jpeg" alt="Meditouch Facility" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="mt-8 rounded-lg overflow-hidden h-48">
                  <img alt="Skin Care Treatment" src="/images/hero-image-2.jpeg" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-serif font-semibold mb-8 bg-gradient-to-r from-meditouch-primary-dark to-meditouch-secondary-dark bg-clip-text text-transparent">About Meditouch</h2>
                
                <div className="w-24 h-1.5 bg-gradient-to-r from-meditouch-primary via-meditouch-accent to-meditouch-secondary mb-10 rounded-full"></div>
                
                <div className="space-y-8">
                  <p className="text-lg text-meditouch-gray leading-relaxed">
                    Meditouch is Pune's premier destination for advanced aesthetic treatments, 
                    bringing together a multidisciplinary team of specialists to deliver 
                    comprehensive hair, skin, and body solutions.
                  </p>
                  
                  <div className="bg-gradient-to-br from-meditouch-primary-lightest/70 to-meditouch-secondary-lightest/50 p-8 rounded-2xl border-2 border-meditouch-primary-lighter/30 shadow-lg shadow-meditouch-primary/5">
                    <h3 className="font-serif text-lg font-medium mb-4 text-meditouch-primary-dark">Our Multidisciplinary Team</h3>
                    <p className="text-meditouch-gray/90 mb-4 text-sm leading-relaxed">
                      Meditouch brings together a collaborative team of aesthetic specialists:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-accent rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-gray text-sm">Experienced Dermatologists</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-accent rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-gray text-sm">Specialized Trichologists</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-accent rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-gray text-sm">Skilled Plastic Surgeons</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-accent rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-gray text-sm">Qualified Cosmetologists</span>
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
        
        <section id="services" className="py-28 bg-gradient-to-br from-meditouch-gray-50 via-white to-meditouch-warm-100 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl font-serif font-semibold mb-6 bg-gradient-to-r from-meditouch-primary-dark to-meditouch-secondary-dark bg-clip-text text-transparent">Our Comprehensive Beauty & Wellness Services</h2>
              <p className="text-lg text-meditouch-gray leading-relaxed">
                Advanced treatments for skin, hair and aesthetic care by Meditouch specialists
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-meditouch-primary via-meditouch-accent to-meditouch-secondary mx-auto mt-10 rounded-full"></div>
            </div>
            
            {/* Services Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentServiceSlide * 100}%)` }}
                >
                  {serviceSlides.map((slide, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {slide.map((service, serviceIndex) => (
                          <ServiceCard 
                            key={`${slideIndex}-${serviceIndex}`}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            image={service.image}
                            theme="meditouch"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <button 
                  onClick={handleServicePrev}
                  className="p-2 rounded-full border border-meditouch-primary/20 hover:bg-meditouch-primary/10 hover:border-meditouch-primary/40 transition-colors"
                  aria-label="Previous services"
                >
                  <ChevronLeft className="h-5 w-5 text-meditouch-primary" />
                </button>
                
                <div className="flex space-x-2">
                  {serviceSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentServiceSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentServiceSlide ? 'bg-meditouch-primary' : 'bg-meditouch-primary/20'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleServiceNext}
                  className="p-2 rounded-full border border-meditouch-primary/20 hover:bg-meditouch-primary/10 hover:border-meditouch-primary/40 transition-colors"
                  aria-label="Next services"
                >
                  <ChevronRight className="h-5 w-5 text-meditouch-primary" />
                </button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  {currentServiceSlide + 1} of {serviceSlides.length}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div id="testimonials" className="reveal-section scroll-mt-24">
          <TestimonialsSection type="aesthetic" />
        </div>
        
        <section id="contact" ref={contactSectionRef} className="py-20 bg-gradient-to-t from-meditouch-primary/5 to-white reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-semibold mb-4 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary bg-clip-text text-transparent">Contact Meditouch</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                <div className="lg:col-span-3">
                  <ContactForm formType="aesthetic" />
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-white to-meditouch-primary/5 p-6 rounded-lg shadow-lg border border-meditouch-primary/20">
                    <h3 className="font-serif text-xl font-medium mb-4 text-meditouch-primary">Clinic Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-meditouch-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{clinicName}</p>
                          <p className="text-gray-600 text-sm">
                            Manas Apartment, 1st Floor, Lakaki Road, Opp. Hotel Ambience, Model Colony, Shivajinagar, Pune 411 016
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-meditouch-primary mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Clinic Hours</p>
                          <p className="text-gray-600 text-sm">Mon - Sat: 10:00 am - 7:00 pm</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <CalendarClock className="h-5 w-5 text-meditouch-primary mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Phone Number</p>
                          <p className="text-gray-600 text-sm">91129 57369</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Map - Full Width Below Contact Form */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-semibold mb-2 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary bg-clip-text text-transparent">Visit Our Clinic</h3>
                  <p className="text-gray-600">Find us easily with our interactive map</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary mx-auto mt-4"></div>
                </div>
                <LocationMap />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer theme="meditouch" />
    </div>;
};
export default Meditouch;