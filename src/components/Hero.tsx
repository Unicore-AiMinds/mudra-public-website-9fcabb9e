
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
    <div className={`relative min-h-[80vh] md:min-h-[100vh] flex items-center overflow-hidden ${
      theme === 'meditouch' 
        ? 'bg-gradient-to-br from-meditouch-primary via-meditouch-primary-lighter to-meditouch-secondary' 
        : 'bg-gradient-to-br from-mudra-primary via-mudra-secondary to-mudra-primary'
    }`}>
      {/* Background image with enhanced overlay */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Dark gradient overlay for button contrast */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </>
      )}
      
      {/* Animated geometric elements */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {/* Floating circles */}
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 animate-bounce ${
          theme === 'meditouch' ? 'bg-meditouch-neutral' : 'bg-mudra-accent'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-32 right-16 w-20 h-20 rounded-full opacity-15 animate-bounce ${
          theme === 'meditouch' ? 'bg-meditouch-accent' : 'bg-white'
        }`} style={{ animationDelay: '4s' }}></div>
        <div className={`absolute top-1/3 right-1/4 w-16 h-16 rounded-full opacity-20 animate-pulse ${
          theme === 'meditouch' ? 'bg-meditouch-secondary' : 'bg-mudra-accent'
        }`} style={{ animationDelay: '1s' }}></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className={`absolute top-16 right-20 w-24 h-24 border-2 opacity-10 rotate-45 animate-spin ${
            theme === 'meditouch' ? 'border-meditouch-neutral' : 'border-mudra-accent'
          }`} style={{ animationDuration: '20s' }}></div>
          <div className={`absolute bottom-20 left-20 w-16 h-16 border border-dashed opacity-20 rotate-12 animate-pulse ${
            theme === 'meditouch' ? 'border-meditouch-accent' : 'border-white'
          }`}></div>
        </div>
      </div>
      
      {/* Enhanced gradient overlay with radial gradient */}
      <div className={`absolute inset-0 z-[3] ${
        theme === 'meditouch' 
          ? 'bg-gradient-radial from-meditouch-primary/85 via-meditouch-primary-lighter/70 to-meditouch-accent/80' 
          : 'bg-gradient-to-br from-mudra-primary/85 via-mudra-secondary/75 to-mudra-primary/85'
      }`} style={{
        background: theme === 'meditouch' 
          ? 'radial-gradient(ellipse at bottom center, rgba(90,44,139,0.9) 0%, rgba(90,44,139,0.7) 40%, rgba(177,159,217,0.6) 70%, rgba(255,107,53,0.75) 100%)'
          : undefined
      }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-16 pb-24 md:py-32 md:pb-40 relative z-10 mt-12 md:mt-0">
        <div className="max-w-5xl mx-auto text-center">
          {/* Refined typography with better proportions */}
          <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up-fade tracking-tight ${
            theme === 'meditouch' ? 'font-meditouch-script' : 'font-serif'
          }`}>
            {title}
          </h1>
          
          <p className={`text-lg md:text-xl lg:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed font-light animate-stagger-fade ${
            theme === 'meditouch' ? 'font-meditouch-primary' : ''
          }`} style={{ animationDelay: '0.4s' }}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-stagger-fade" style={{ animationDelay: '0.8s' }}>
            {cta && (
              <Link 
                to={cta.link} 
                className={`group px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-98 ${
                  theme === 'meditouch'
                    ? 'font-meditouch-primary bg-gradient-to-r from-meditouch-secondary to-meditouch-accent text-white hover:from-meditouch-accent hover:to-meditouch-secondary active:shadow-md hover:shadow-[0_0_30px_rgba(255,107,53,0.4),0_0_60px_rgba(244,208,63,0.2)]'
                    : 'bg-white text-mudra-primary hover:bg-mudra-accent hover:text-white active:scale-98'
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
                className={`px-8 py-3 border-2 border-white text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-98 backdrop-blur-sm ${
                  theme === 'meditouch' 
                    ? 'bg-white/10 hover:bg-white hover:text-meditouch-primary font-meditouch-primary active:bg-white/95' 
                    : 'bg-transparent hover:bg-white/20 active:scale-98'
                }`}
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
