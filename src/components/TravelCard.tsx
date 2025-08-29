
import { Clock, MapPin, ImageIcon } from 'lucide-react';

interface TravelCardProps {
  name: string;
  description: string;
  image: string;
  location?: string;
  travelTime?: string;
  large?: boolean;
}

const TravelCard = ({ name, description, image, location, travelTime, large = false }: TravelCardProps) => {
  return (
    <div className={`group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card ${large ? 'h-full' : ''}`}>
      <div className={`relative ${large ? 'h-72' : 'h-48'} bg-gray-100 overflow-hidden`}>
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-serif text-xl font-medium mb-2">{name}</h3>
        
        {(location || travelTime) && (
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mb-3 text-sm text-gray-600">
            {location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-mudra-primary mr-1" />
                <span>{location}</span>
              </div>
            )}
            
            {travelTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-mudra-primary mr-1" />
                <span>{travelTime}</span>
              </div>
            )}
          </div>
        )}
        
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default TravelCard;
