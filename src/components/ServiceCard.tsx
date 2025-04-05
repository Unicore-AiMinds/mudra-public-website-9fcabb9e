
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
}

const ServiceCard = ({ title, description, icon, image }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative h-full bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-md hover:border-mudra-primary/20 image-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="h-40 w-full bg-gray-100 flex items-center justify-center transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start mb-3">
          {icon && <div className="mr-3 text-mudra-primary">{icon}</div>}
          <h3 className={`font-serif text-lg font-medium ${icon ? '' : 'mb-3'}`}>{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
