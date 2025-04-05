
import { MapPin, MapIcon } from 'lucide-react';

const LocationMap = () => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden h-full min-h-[300px] flex flex-col">
      <div className="bg-mudra-primary/10 p-4 flex items-center">
        <MapPin className="h-5 w-5 text-mudra-primary mr-2" />
        <h3 className="font-serif font-medium">Clinic Location</h3>
      </div>
      
      <div className="flex-1 w-full bg-gray-200 relative flex items-center justify-center">
        <MapIcon className="h-24 w-24 text-gray-400" />
      </div>
    </div>
  );
};

export default LocationMap;
