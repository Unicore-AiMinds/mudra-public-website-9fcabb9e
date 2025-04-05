
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  cta?: {
    text: string;
    link: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    link: string;
    onClick?: () => void;
  };
}

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  cta,
  secondaryCta,
}: HeroProps) => {
  // Determine if we should render a background image or use the default gradient
  const hasBackgroundImage = !!backgroundImage;
  
  const handleCtaClick = (e: React.MouseEvent, onClick?: () => void) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <section className="relative">
      {/* Background container */}
      <div className={`relative ${hasBackgroundImage ? 'h-[70vh] md:h-[60vh] min-h-[500px]' : 'py-20 md:py-32 bg-gradient-to-br from-mudra-primary/5 to-mudra-accent/10'}`}>
        {/* Background image (if provided) */}
        {hasBackgroundImage && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex items-center h-full">
          <div className={`max-w-3xl mx-auto text-center ${hasBackgroundImage ? 'text-white' : 'text-gray-900'}`}>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
              {title}
            </h1>
            
            <p className={`text-lg md:text-xl mb-10 ${hasBackgroundImage ? 'text-white/90' : 'text-gray-600'}`}>
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {cta && (
                <Link 
                  to={cta.link}
                  className="px-6 py-3 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors font-medium"
                  onClick={(e) => handleCtaClick(e, cta.onClick)}
                >
                  {cta.text}
                </Link>
              )}
              
              {secondaryCta && (
                <Link 
                  to={secondaryCta.link}
                  className={`px-6 py-3 rounded-md font-medium ${
                    hasBackgroundImage 
                      ? 'bg-white/10 text-white border border-white/30 hover:bg-white/20' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                  onClick={(e) => handleCtaClick(e, secondaryCta.onClick)}
                >
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
