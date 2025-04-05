
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

const Index = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('divisions');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToContact = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero 
          title="Discover the Perfect Harmony of Dental & Aesthetic Excellence" 
          subtitle="Mudra Clinic brings together specialized dental and aesthetic services under one roof, providing comprehensive care for your smile and appearance." 
          cta={{
            text: 'Explore Our Services',
            link: '#divisions'
          }} 
          secondaryCta={{
            text: 'Contact Us',
            link: '/contact'
          }}
          onCtaClick={scrollToServices}
          onSecondaryCtaClick={navigateToContact}
        />
        
        <section id="divisions" className="py-20 pt-32"> {/* Increased top padding to push content down */}
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-serif font-semibold mb-4">Our Specialized Clinics</h2>
              <p className="text-gray-600">
                Mudra Dental & Aesthetic Clinic houses two premier divisions, each focused on delivering 
                exceptional specialized care with state-of-the-art technology and expert practitioners.
              </p>
              <div className="w-20 h-1 bg-mudra-accent mx-auto mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Dental Metrix Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-mudra-primary/20 h-full">
                <div className="h-64 overflow-hidden relative">
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)'
                }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-mudra-primary/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="h-16 w-48 bg-white rounded-md flex items-center justify-center mb-4">
                      <span className="font-serif text-xl font-medium text-mudra-primary">Dental Metrix</span>
                    </div>
                    <h3 className="text-white font-serif text-2xl font-medium mb-2">
                      Advanced Esthetic & Implant Dentistry
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Expert dental care focused on creating beautiful, functional smiles. From advanced implantology to
                    comprehensive smile design, our specialists deliver precise and personalized solutions.
                  </p>
                  
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                      <span>Dental Implants & Smile Designing</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                      <span>Teeth Whitening & Dental Aligners</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                      <span>Full Mouth Rehabilitation</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-primary rounded-full mr-2 mt-1.5"></span>
                      <span>Artificial Eyes, Ears & Nose</span>
                    </li>
                  </ul>
                  
                  <Link to="/dental-metrix" className="inline-flex items-center text-mudra-primary hover:text-mudra-secondary transition-colors font-medium">
                    Visit Dental Metrix
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              {/* Meditouch Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-mudra-primary/20 h-full">
                <div className="h-64 overflow-hidden relative">
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)'
                }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-mudra-secondary/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="h-16 w-48 bg-white rounded-md flex items-center justify-center mb-4">
                      <span className="font-serif text-xl font-medium text-mudra-secondary">Meditouch</span>
                    </div>
                    <h3 className="text-white font-serif text-2xl font-medium mb-2">
                      Expert Hair, Skin & Wellness Clinic
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Comprehensive aesthetic treatments delivered by a multidisciplinary team of specialists.
                    Advanced technologies and personalized approaches for remarkable, natural-looking results.
                  </p>
                  
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                      <span>Hair Transplant & PRP Treatments</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                      <span>HydraFacial & Laser Hair Reduction</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                      <span>Skin Tightening (HIFU) & Body Fat Reduction</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="w-2 h-2 bg-mudra-secondary rounded-full mr-2 mt-1.5"></span>
                      <span>Chemical Peels & Microneedling</span>
                    </li>
                  </ul>
                  
                  <Link to="/meditouch" className="inline-flex items-center text-mudra-secondary hover:text-mudra-primary transition-colors font-medium">
                    Visit Meditouch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-8 md:p-10 border border-gray-100">
                <h2 className="text-2xl font-serif font-semibold mb-4 text-center">Why Choose Mudra Clinic?</h2>
                
                <div className="gradient-divider mb-8"></div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-serif text-lg font-medium mb-2">Integrated Care</h3>
                    <p className="text-gray-600 text-sm">Experience the convenience and benefits of comprehensive dental and aesthetic treatments in one premier location.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-lg font-medium mb-2">Expert Specialists</h3>
                    <p className="text-gray-600 text-sm">Our team consists of highly qualified professionals with extensive training and experience in their specialized fields.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-lg font-medium mb-2">Advanced Technology</h3>
                    <p className="text-gray-600 text-sm">We utilize the latest equipment and techniques to ensure optimal results with minimal discomfort and recovery time.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-lg font-medium mb-2">Personalized Approach</h3>
                    <p className="text-gray-600 text-sm">Every treatment plan is customized to address your specific needs, concerns, and aesthetic goals.</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 italic mb-6">
                    "At Mudra, we believe in the powerful synergy between oral health and aesthetic appearance, 
                    providing comprehensive care that enhances your natural beauty and confidence."
                  </p>
                  
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center px-6 py-3 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors"
                  >
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-serif font-semibold mb-4">Planning a Visit?</h2>
              <p className="text-gray-600">
                Experience world-class dental and aesthetic treatments while exploring the vibrant 
                city of Pune. We're here to assist with treatment planning and local recommendations.
              </p>
              <div className="w-20 h-1 bg-mudra-accent mx-auto mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-mudra-primary/20 image-card">
                <div className="h-48 overflow-hidden">
                  <img alt="Pune City" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/lovable-uploads/11798f90-38f2-40db-b3bd-8e8ac6328850.jpg" />
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl font-medium mb-2">Explore Pune</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Discover attractions, dining, and accommodations in and around Pune during your visit.
                  </p>
                  <Link to="/explore-pune" className="inline-flex items-center text-mudra-primary hover:text-mudra-secondary transition-colors font-medium text-sm">
                    View Travel Guide
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-mudra-primary/20 image-card">
                <div className="h-48 overflow-hidden">
                  <img alt="Dental Consultation" src="/lovable-uploads/30de7436-0ae6-4822-9328-75927ae20900.jpg" className="w-full h-full transition-transform duration-500 group-hover:scale-105 object-contain" />
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl font-medium mb-2">Dental Services</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Comprehensive dental care including implants, smile design, and full rehabilitation.
                  </p>
                  <Link to="/dental-metrix" className="inline-flex items-center text-mudra-primary hover:text-mudra-secondary transition-colors font-medium text-sm">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-mudra-primary/20 image-card">
                <div className="h-48 overflow-hidden">
                  <img alt="Aesthetic Treatment" src="/lovable-uploads/c0e3ce1f-672d-45e9-9a2b-14f226f52519.jpg" className="w-full h-full transition-transform duration-500 group-hover:scale-105 object-contain" />
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl font-medium mb-2">Aesthetic Treatments</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Advanced hair, skin, and body treatments delivered by specialized practitioners.
                  </p>
                  <Link to="/meditouch" className="inline-flex items-center text-mudra-primary hover:text-mudra-secondary transition-colors font-medium text-sm">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
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

export default Index;
