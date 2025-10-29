import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  theme?: 'dental' | 'meditouch' | 'mudra';
}

const ScrollToTopButton = ({ theme = 'mudra' }: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Theme-based colors
  const getThemeClasses = () => {
    switch (theme) {
      case 'dental':
        return 'bg-mudra-primary hover:bg-mudra-primary-dark text-white border-mudra-primary';
      case 'meditouch':
        return 'bg-meditouch-primary hover:bg-meditouch-primary-dark text-white border-meditouch-primary';
      default:
        return 'bg-mudra-accent hover:bg-mudra-accent-dark text-white border-mudra-accent';
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 ${getThemeClasses()} animate-fade-in`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
