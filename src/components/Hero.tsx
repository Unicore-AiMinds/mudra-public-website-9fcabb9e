
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  cta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  theme?: 'mudra' | 'meditouch';
}

const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop',
  cta,
  secondaryCta,
  onCtaClick,
  onSecondaryCtaClick,
  theme = 'mudra'
}: HeroProps) => {
  return (
    <div className={`relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden ${
      theme === 'meditouch' 
        ? 'bg-gradient-to-r from-meditouch-primary/90 to-meditouch-secondary/90' 
        : 'bg-gradient-to-r from-mudra-primary/90 to-mudra-secondary/90'
    }`}>
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-20 relative z-10 mt-12 md:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta && (
              <Link 
                to={cta.link} 
                className={`px-8 py-3 bg-white rounded-md font-medium transition-colors flex items-center ${
                  theme === 'meditouch'
                    ? 'text-meditouch-primary hover:bg-meditouch-secondary hover:text-white'
                    : 'text-mudra-primary hover:bg-mudra-accent hover:text-white'
                }`}
                onClick={(e) => {
                  if (onCtaClick && cta.link.startsWith('#')) {
                    e.preventDefault();
                    onCtaClick();
                  }
                }}
              >
                {cta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
            
            {secondaryCta && (
              <Link 
                to={secondaryCta.link} 
                className="px-8 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
                onClick={(e) => {
                  if (onSecondaryCtaClick) {
                    e.preventDefault();
                    onSecondaryCtaClick();
                  }
                }}
              >
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M0 0L60 5C120 10 240 20 360 31.7C480 43.3 600 56.7 720 63.3C840 70 960 70 1080 63.3C1200 56.7 1320 43.3 1380 36.7L1440 30V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
