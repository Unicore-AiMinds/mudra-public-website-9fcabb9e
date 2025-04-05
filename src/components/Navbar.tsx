
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  const linkClass = 'relative animated-link py-2 px-4 text-mudra-dark hover:text-mudra-primary transition-colors';
  const activeLinkClass = 'relative py-2 px-4 text-mudra-primary font-medium';

  return (
    <header className={navbarClass}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 w-36 bg-gray-100 rounded flex items-center justify-center">
              <span className="font-serif text-xl font-medium text-mudra-primary">Mudra</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={location.pathname === '/' ? activeLinkClass : linkClass}>
              Home
            </Link>
            <Link to="/dental-metrix" className={location.pathname === '/dental-metrix' ? activeLinkClass : linkClass}>
              Dental Metrix
            </Link>
            <Link to="/meditouch" className={location.pathname === '/meditouch' ? activeLinkClass : linkClass}>
              Meditouch
            </Link>
            <Link to="/explore-pune" className={location.pathname === '/explore-pune' ? activeLinkClass : linkClass}>
              Explore Pune
            </Link>
            <Link 
              to="/contact" 
              className="ml-2 py-2 px-4 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors"
            >
              Contact Us
            </Link>
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
                Home
              </Link>
              <Link to="/dental-metrix" className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark">
                Dental Metrix
              </Link>
              <Link to="/meditouch" className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark">
                Meditouch
              </Link>
              <Link to="/explore-pune" className="py-2 px-4 rounded-md hover:bg-gray-100 text-mudra-dark">
                Explore Pune
              </Link>
              <Link 
                to="/contact" 
                className="py-2 px-4 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
