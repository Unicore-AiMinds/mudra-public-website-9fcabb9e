
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  theme?: 'mudra' | 'meditouch';
  animationDelay?: number;
}

const ServiceCard = ({ title, description, icon, image, theme = 'mudra', animationDelay = 0 }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative h-full bg-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] ${
        theme === 'meditouch' 
          ? 'shadow-[0_4px_6px_rgba(90,44,139,0.04),0_1px_3px_rgba(90,44,139,0.08)] hover:shadow-[0_8px_16px_rgba(90,44,139,0.12),0_4px_8px_rgba(90,44,139,0.08)] border border-meditouch-primary/10 hover:border-meditouch-primary/20' 
          : 'shadow-[0_4px_6px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.08)] border border-gray-100 hover:border-mudra-primary/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="h-40 w-full bg-gray-100 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
              }
            }}
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start mb-3">
          {icon && <div className={`mr-3 ${
            theme === 'meditouch' 
              ? 'text-meditouch-accent' 
              : 'text-mudra-primary'
          }`}>{icon}</div>}
          <h3 className={`font-bold tracking-tight leading-snug ${icon ? '' : 'mb-3'} ${
            theme === 'meditouch' ? 'text-xl font-meditouch-primary text-meditouch-primary' : 'text-lg font-display'
          }`}>{title}</h3>
        </div>
        <p className={`text-sm leading-relaxed ${
          theme === 'meditouch' ? 'font-meditouch-primary text-meditouch-primary/80 leading-[1.7]' : 'text-gray-600 leading-6'
        }`}>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
