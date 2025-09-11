import { useEffect, useRef, useState } from 'react';
import { Scissors, Zap, Droplet, Gauge, HandMetal, Sparkles, Building, Clock, CalendarClock, Eraser, Paintbrush, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // All services as a flat array
  const allServices = [
    { title: "HydraFacial Skin Rejuvenation", description: "A non-invasive facial treatment that deeply cleanses, exfoliates, extracts impurities from pores, and intensely hydrates the skin.", icon: <Sparkles size={24} />, image: "/images/hydrafacial-skin-rejuvenation.jpg" },
    { title: "Removal of Warts, Skin Tags & Moles", description: "Safe and effective removal of benign skin growths using advanced techniques for smooth, clear skin.", icon: <Eraser size={24} />, image: "/images/warts-skin-tags-moles-removal.jpg" },
    { title: "Chemical Peel", description: "A cosmetic procedure that uses a chemical solution to improve the appearance of the skin and treat acne, pimples and brightening.", icon: <Droplet size={24} />, image: "/images/chemical-peel.jpg" },
    { title: "Body Peel", description: "A chemical exfoliation treatment that removes dead skin cells from the body, improving skin texture and tone.", icon: <HandMetal size={24} />, image: "/images/body-peel.webp" },
    { title: "Tattoo Removal (Laser)", description: "Uses a laser to break down and remove tattoo ink from the skin, offering a clean slate for those with unwanted tattoos.", icon: <Zap size={24} />, image: "/images/tattoo-removal-laser.jpg" },
    { title: "Hair Transplants", description: "A surgical procedure that moves hair to treat hair loss, also known as hair restoration or hair replacement.", icon: <Scissors size={24} />, image: "/images/hair-transplants.jpg" },
    { title: "Hifu", description: "Skin lifting procedure that tightens skin, removes excess skin, or repositions it for a more youthful appearance.", icon: <Gauge size={24} />, image: "/images/hifu.jpg" },
    { title: "Skin PRP with Microneedling", description: "Combines microneedling with platelet-rich plasma to rejuvenate the skin, reducing wrinkles and acne scars.", icon: <Building size={24} />, image: "/images/skin-prp-microneedling.webp" },
    { title: "Semi Permanent Makeup", description: "Also known as micropigmentation, enhances facial features through the application of pigments by specialists.", icon: <Paintbrush size={24} />, image: "/images/semi-permanent-makeup.jpg" }
  ];

  // Desktop layout (original 3 slides)
  const desktopServiceSlides = [
    [allServices[0], allServices[1], allServices[2]], // 3 services
    [allServices[3], allServices[4], allServices[5]], // 3 services  
    [allServices[6], allServices[7], allServices[8]] // 3 services
  ];

  // Mobile layout (5 slides with 2 services each, except last slide has 1)
  const mobileServiceSlides = [
    [allServices[0], allServices[1]], // Slide 1: HydraFacial, Warts/Tags/Moles Removal
    [allServices[2], allServices[3]], // Slide 2: Chemical Peel, Body Peel
    [allServices[4], allServices[5]], // Slide 3: Tattoo Removal, Hair Transplants
    [allServices[6], allServices[7]], // Slide 4: Hifu, Skin PRP with Microneedling
    [allServices[8]]                  // Slide 5: Semi Permanent Makeup
  ];

  // This effect handles scroll reveal animations and screen size detection
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
          
          // Trigger various reveal animations when sections come into view
          const animationSelectors = [
            '.photo-reveal',
            '.section-heading-reveal', 
            '.section-text-reveal',
            '.section-underline-reveal',
            '.service-card-reveal',
            '.contact-form-reveal',
            '.contact-info-reveal'
          ];
          
          animationSelectors.forEach(selector => {
            const elements = element.querySelectorAll(selector);
            elements.forEach((el) => {
              const delay = parseInt(el.getAttribute('data-delay') || '0');
              setTimeout(() => {
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                el.style.opacity = '1';
                
                // Different transform resets for different animation types
                if (selector === '.section-underline-reveal') {
                  el.style.transform = 'scaleX(1)';
                } else {
                  el.style.transform = 'translate(0, 0)';
                }
              }, delay);
            });
          });
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
  return <div className="min-h-screen bg-gradient-to-b from-meditouch-neutral-light via-white via-[85%] to-meditouch-primary-lightest/30">
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
        
        
        <section id="about" className="py-32 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="grid grid-cols-2 gap-6 order-2 md:order-1">
                <div className="photo-reveal photo-reveal-left transition-all duration-300 rounded-xl overflow-hidden h-48 shadow-[0_1px_3px_rgba(90,44,139,0.06),0_4px_6px_rgba(90,44,139,0.03)] border border-meditouch-primary/8 opacity-0 transform translate-x-[-40px]" data-delay="0">
                  <img alt="Meditouch Clinic Interior" src="/images/hero-image-1.webp" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="photo-reveal photo-reveal-up mt-8 rounded-xl overflow-hidden h-48 shadow-[0_1px_3px_rgba(90,44,139,0.06),0_4px_6px_rgba(90,44,139,0.03)] border border-meditouch-primary/8 opacity-0 transform translate-y-[40px]" data-delay="200">
                  <img alt="Aesthetic Treatment Room" src="/images/hero-image-4.webp" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="photo-reveal photo-reveal-left transition-all duration-300 rounded-xl overflow-hidden h-48 shadow-[0_1px_3px_rgba(90,44,139,0.06),0_4px_6px_rgba(90,44,139,0.03)] border border-meditouch-primary/8 opacity-0 transform translate-x-[-40px]" data-delay="400">
                  <img src="/images/hero-image-3.jpeg" alt="Meditouch Facility" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="photo-reveal photo-reveal-up mt-8 rounded-xl overflow-hidden h-48 shadow-[0_1px_3px_rgba(90,44,139,0.06),0_4px_6px_rgba(90,44,139,0.03)] border border-meditouch-primary/8 opacity-0 transform translate-y-[40px]" data-delay="600">
                  <img alt="Skin Care Treatment" src="/images/hero-image-2.jpeg" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="section-heading-reveal text-3xl font-meditouch-script font-semibold mb-8 bg-gradient-to-r from-meditouch-primary to-meditouch-accent bg-clip-text text-transparent opacity-0 transform translate-y-[20px]" data-delay="0">About Meditouch</h2>
                
                <div className="section-underline-reveal w-16 h-1 bg-gradient-to-r from-meditouch-primary via-meditouch-secondary to-meditouch-accent mb-10 rounded-full opacity-0 transform scale-x-0" data-delay="300"></div>
                
                <div className="space-y-8">
                  <p className="text-lg text-meditouch-primary font-meditouch-primary leading-[1.7]">
                    Meditouch is Pune's premier destination for advanced aesthetic treatments, 
                    bringing together a multidisciplinary team of specialists to deliver 
                    comprehensive hair, skin, and body solutions.
                  </p>
                  
                  <div className="bg-meditouch-primary-lighter/30 p-8 rounded-xl shadow-[0_1px_3px_rgba(90,44,139,0.06),0_4px_6px_rgba(90,44,139,0.03)] border border-meditouch-primary/12">
                    <h3 className="font-meditouch-primary text-xl font-extrabold mb-4 text-meditouch-primary">Our Multidisciplinary Team</h3>
                    <p className="text-meditouch-primary/80 mb-4 font-meditouch-primary leading-[1.7]">
                      Meditouch brings together a collaborative team of aesthetic specialists:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-primary text-sm font-meditouch-primary">Experienced Dermatologists</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-primary text-sm font-meditouch-primary">Specialized Trichologists</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-primary text-sm font-meditouch-primary">Skilled Plastic Surgeons</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="w-2 h-2 bg-gradient-to-r from-meditouch-primary to-meditouch-secondary rounded-full mr-2 mt-1.5"></span>
                        <span className="text-meditouch-primary text-sm font-meditouch-primary">Qualified Cosmetologists</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-meditouch-primary font-meditouch-primary leading-[1.7]">
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
        
        <section id="services" className="py-32 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl font-meditouch-script font-semibold mb-6 bg-gradient-to-r from-meditouch-primary to-meditouch-accent bg-clip-text text-transparent">Our Comprehensive Beauty & Wellness Services</h2>
              <p className="text-lg text-meditouch-primary/80 font-meditouch-primary leading-[1.7]">
                Advanced treatments for skin, hair and aesthetic care by Meditouch specialists
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-meditouch-primary via-meditouch-secondary to-meditouch-accent mx-auto mt-10 rounded-full"></div>
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
                              theme="meditouch"
                              animationDelay={serviceIndex * 150}
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
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                          {slide.map((service, serviceIndex) => (
                            <ServiceCard 
                              key={`desktop-${slideIndex}-${serviceIndex}`}
                              title={service.title}
                              description={service.description}
                              icon={service.icon}
                              image={service.image}
                              theme="meditouch"
                              animationDelay={serviceIndex * 100}
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
                  className="group p-3 rounded-full bg-meditouch-primary/10 hover:bg-meditouch-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 backdrop-blur-sm border border-meditouch-primary/20 hover:border-meditouch-primary"
                  aria-label="Previous services"
                >
                  <ChevronLeft className="h-5 w-5 text-meditouch-primary group-hover:text-white transition-colors duration-200" />
                </button>
                
                {/* Mobile Pagination */}
                <div className="flex space-x-2 md:hidden">
                  {mobileServiceSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentServiceSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 active:scale-110 ${
                        index === currentServiceSlide 
                          ? 'bg-gradient-to-r from-meditouch-secondary to-meditouch-accent shadow-md scale-125' 
                          : 'bg-meditouch-primary/20 hover:bg-meditouch-primary/40 hover:shadow-sm'
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
                      className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 active:scale-110 ${
                        index === currentServiceSlide 
                          ? 'bg-gradient-to-r from-meditouch-secondary to-meditouch-accent shadow-md scale-125' 
                          : 'bg-meditouch-primary/20 hover:bg-meditouch-primary/40 hover:shadow-sm'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleServiceNext}
                  className="group p-3 rounded-full bg-meditouch-primary/10 hover:bg-meditouch-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 backdrop-blur-sm border border-meditouch-primary/20 hover:border-meditouch-primary"
                  aria-label="Next services"
                >
                  <ChevronRight className="h-5 w-5 text-meditouch-primary group-hover:text-white transition-colors duration-200" />
                </button>
              </div>
              
              {/* Counter */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  {currentServiceSlide + 1} of {isMobile ? mobileServiceSlides.length : desktopServiceSlides.length}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div id="testimonials" className="reveal-section scroll-mt-24">
          <TestimonialsSection type="aesthetic" />
        </div>
        
        <section id="contact" ref={contactSectionRef} className="py-32 reveal-section scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-meditouch-script font-semibold mb-4 bg-gradient-to-r from-meditouch-primary to-meditouch-accent bg-clip-text text-transparent">Contact Meditouch</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-meditouch-primary to-meditouch-accent mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                <div className="lg:col-span-3">
                  <ContactForm formType="aesthetic" />
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-meditouch-primary-lighter/30 p-6 rounded-xl shadow-[0_1px_3px_rgba(90,44,139,0.06),0_4px_6px_rgba(90,44,139,0.03)] border border-meditouch-primary/12">
                    <h3 className="font-meditouch-script text-xl font-medium mb-4 text-meditouch-primary">Clinic Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-meditouch-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium font-meditouch-primary">{clinicName}</p>
                          <p className="text-meditouch-primary text-sm font-meditouch-primary">
                            Manas Apartment, 1st Floor, Lakaki Road, Opp. Hotel Ambience, Model Colony, Shivajinagar, Pune 411 016
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-meditouch-primary mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium font-meditouch-primary">Clinic Hours</p>
                          <p className="text-meditouch-primary text-sm font-meditouch-primary">Mon - Sat: 10:00 am - 7:00 pm</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <CalendarClock className="h-5 w-5 text-meditouch-primary mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium font-meditouch-primary">Phone Number</p>
                          <p className="text-meditouch-primary text-sm font-meditouch-primary">+919371015255</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Map - Full Width Below Contact Form */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-meditouch-script font-semibold mb-2 bg-gradient-to-r from-meditouch-primary to-meditouch-accent bg-clip-text text-transparent">Visit Our Clinic</h3>
                  <p className="text-meditouch-primary font-meditouch-primary">Find us easily with our interactive map</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-meditouch-primary to-meditouch-accent mx-auto mt-4 rounded-full"></div>
                </div>
                <LocationMap />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Elegant curved wave transition to footer */}
      <div className="relative">
        <svg 
          className="w-full h-16 md:h-20 fill-current text-meditouch-primary" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 120"
        >
          <path d="M0,0 C150,120 350,120 600,60 C850,0 1050,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
      
      <Footer theme="meditouch" />
    </div>;
};
export default Meditouch;