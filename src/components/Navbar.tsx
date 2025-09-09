
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const brandMode = import.meta.env.VITE_BRAND_MODE;

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navbarClass = isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300'
    : 'fixed top-0 left-0 right-0 z-50 bg-white/95 transition-all duration-300';

  const linkClass = brandMode === 'meditouch' 
    ? 'relative animated-link py-2 px-4 text-meditouch-primary hover:text-meditouch-accent transition-all duration-200 font-meditouch-primary font-medium tracking-wide hover:scale-105'
    : 'relative animated-link py-2 px-4 text-mudra-dark hover:text-mudra-primary transition-all duration-200 hover:scale-105';
  const activeLinkClass = brandMode === 'meditouch'
    ? 'relative py-2 px-4 text-meditouch-primary font-medium font-meditouch-primary tracking-wide scale-105'
    : 'relative py-2 px-4 text-mudra-primary font-medium scale-105';

  return (
    <header className={navbarClass}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {brandMode === 'meditouch' ? (
              <img 
                src="/images/meditouch-logo.png" 
                alt="Meditouch Logo" 
                className="h-12 md:h-20 w-auto"
              />
            ) : brandMode === 'dental' ? (
              <img 
                src="/images/dental-metrix-logo.png" 
                alt="Dental Metrix Logo" 
                className="h-12 md:h-20 w-auto"
              />
            ) : (
              <span className="font-serif text-xl font-medium text-mudra-primary">
                Mudra
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={location.pathname === '/' ? activeLinkClass : linkClass}>
              {brandMode === 'dental' ? 'Dental Metrix' : brandMode === 'meditouch' ? 'Meditouch' : 'Home'}
            </Link>
            <button onClick={() => {
              const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                brandMode === 'meditouch' ? '/meditouch' : '/';
              if (location.pathname !== targetPage) {
                window.location.href = `${targetPage}#about`;
              } else {
                const element = document.getElementById('about');
                if (element) {
                  const yOffset = -100;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }
            }} className={linkClass}>
              About
            </button>
            <button onClick={() => {
              const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                brandMode === 'meditouch' ? '/meditouch' : '/';
              if (location.pathname !== targetPage) {
                window.location.href = `${targetPage}#services`;
              } else {
                const element = document.getElementById('services');
                if (element) {
                  const yOffset = -100;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }
            }} className={linkClass}>
              Services
            </button>
            <button onClick={() => {
              const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                brandMode === 'meditouch' ? '/meditouch' : '/';
              if (location.pathname !== targetPage) {
                window.location.href = `${targetPage}#testimonials`;
              } else {
                const element = document.getElementById('testimonials');
                if (element) {
                  const yOffset = -100;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }
            }} className={linkClass}>
              Testimonials
            </button>
            <Link to="/explore-pune" className={location.pathname === '/explore-pune' ? activeLinkClass : linkClass}>
              Explore Pune
            </Link>
            <button 
              onClick={() => {
                const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                  brandMode === 'meditouch' ? '/meditouch' : '/';
                if (location.pathname !== targetPage) {
                  window.location.href = `${targetPage}#contact`;
                } else {
                  const element = document.getElementById('contact');
                  if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }
              }}
              className={`ml-2 py-2 px-4 text-white rounded-xl transition-all duration-200 font-medium transform hover:scale-105 active:scale-95 ${
                brandMode === 'meditouch' 
                  ? 'bg-gradient-to-r from-meditouch-secondary to-meditouch-accent hover:from-meditouch-accent hover:to-meditouch-secondary hover:shadow-md active:shadow-sm font-meditouch-primary'
                  : 'bg-mudra-primary hover:bg-mudra-secondary hover:shadow-md active:scale-95 active:shadow-sm'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark">
                {brandMode === 'dental' ? 'Dental Metrix' : brandMode === 'meditouch' ? 'Meditouch' : 'Home'}
              </Link>
              <button onClick={() => {
                const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                  brandMode === 'meditouch' ? '/meditouch' : '/';
                if (location.pathname !== targetPage) {
                  window.location.href = `${targetPage}#about`;
                } else {
                  document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
                }
              }} className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark text-left">
                About
              </button>
              <button onClick={() => {
                const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                  brandMode === 'meditouch' ? '/meditouch' : '/';
                if (location.pathname !== targetPage) {
                  window.location.href = `${targetPage}#services`;
                } else {
                  const element = document.getElementById('services');
                  if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }
              }} className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark text-left">
                Services
              </button>
              <button onClick={() => {
                const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                  brandMode === 'meditouch' ? '/meditouch' : '/';
                if (location.pathname !== targetPage) {
                  window.location.href = `${targetPage}#testimonials`;
                } else {
                  const element = document.getElementById('testimonials');
                  if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }
              }} className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark text-left">
                Testimonials
              </button>
              <Link to="/explore-pune" className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark">
                Explore Pune
              </Link>
              <button 
                onClick={() => {
                  const targetPage = brandMode === 'dental' ? '/dental-metrix' : 
                                    brandMode === 'meditouch' ? '/meditouch' : '/';
                  if (location.pathname !== targetPage) {
                    window.location.href = `${targetPage}#contact`;
                  } else {
                    const element = document.getElementById('contact');
                    if (element) {
                      const yOffset = -100;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }
                }}
                className="py-2 px-4 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors text-left"
              >
                Contact Us
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
