
import { Clock, MapPin } from 'lucide-react';

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
      <div className={`relative overflow-hidden ${large ? 'h-72' : 'h-48'}`}>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
