
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface SectionNavProps {
  sections: {
    id: string;
    label: string;
  }[];
  backTo: {
    path: string;
    label: string;
  };
  logo?: string;
  logoAlt?: string;
}

const SectionNav = ({ sections, backTo, logo, logoAlt }: SectionNavProps) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // First set if we're scrolled down at all
      setIsScrolled(window.scrollY > 100);
      
      // Then find the active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      
      // Default to first section if we're at the top
      if (window.scrollY <= 100) {
        setActiveSection(sections[0]?.id || '');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize active section
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);
  
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust scroll position
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  return (
    <div className={`sticky top-16 md:top-20 z-40 w-full bg-white transition-shadow duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link 
              to={backTo.path} 
              className="flex items-center text-mudra-primary hover:text-mudra-secondary transition-colors mr-6"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>{backTo.label}</span>
            </Link>
            
            {logo && (
              <div className="hidden md:block h-10 w-32">
                <div className="h-10 w-32 bg-gray-100 rounded flex items-center justify-center">
                  <span className="font-serif text-base text-mudra-primary">{logoAlt || 'Logo'}</span>
                </div>
              </div>
            )}
          </div>
          
          <nav className="flex items-center space-x-1 overflow-x-auto hide-scrollbar py-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`px-3 py-1.5 whitespace-nowrap text-sm rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-mudra-primary/10 text-mudra-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SectionNav;
