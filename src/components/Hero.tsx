
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
  backgroundImage,
  cta,
  secondaryCta,
  onCtaClick,
  onSecondaryCtaClick,
  theme = 'mudra'
}: HeroProps) => {
  return (
    <div className={`relative min-h-[95vh] md:min-h-[90vh] flex items-center overflow-hidden ${
      theme === 'meditouch' 
        ? 'bg-gradient-to-br from-meditouch-primary via-meditouch-accent to-meditouch-secondary' 
        : 'bg-gradient-to-br from-mudra-primary via-mudra-secondary to-mudra-primary'
    }`}>
      {/* Background image with enhanced overlay */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25 animate-pulse"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Animated geometric elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {/* Floating circles */}
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 animate-bounce ${
          theme === 'meditouch' ? 'bg-white' : 'bg-mudra-accent'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-32 right-16 w-20 h-20 rounded-full opacity-15 animate-bounce ${
          theme === 'meditouch' ? 'bg-meditouch-secondary' : 'bg-white'
        }`} style={{ animationDelay: '4s' }}></div>
        <div className={`absolute top-1/3 right-1/4 w-16 h-16 rounded-full opacity-20 animate-pulse ${
          theme === 'meditouch' ? 'bg-white' : 'bg-mudra-accent'
        }`} style={{ animationDelay: '1s' }}></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className={`absolute top-16 right-20 w-24 h-24 border-2 opacity-10 rotate-45 animate-spin ${
            theme === 'meditouch' ? 'border-white' : 'border-mudra-accent'
          }`} style={{ animationDuration: '20s' }}></div>
          <div className={`absolute bottom-20 left-20 w-16 h-16 border border-dashed opacity-20 rotate-12 animate-pulse ${
            theme === 'meditouch' ? 'border-meditouch-secondary' : 'border-white'
          }`}></div>
        </div>
      </div>
      
      {/* Enhanced gradient overlay */}
      <div className={`absolute inset-0 z-[2] ${
        theme === 'meditouch' 
          ? 'bg-gradient-to-br from-meditouch-primary/80 via-meditouch-accent/70 to-meditouch-secondary/80' 
          : 'bg-gradient-to-br from-mudra-primary/85 via-mudra-secondary/75 to-mudra-primary/85'
      }`}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-20 relative z-10 mt-12 md:mt-0">
        <div className="max-w-5xl mx-auto text-center">
          {/* Refined typography with better proportions */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in tracking-tight">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {cta && (
              <Link 
                to={cta.link} 
                className={`group px-8 py-3 bg-white rounded-lg font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 ${
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
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            
            {secondaryCta && (
              <Link 
                to={secondaryCta.link} 
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
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
