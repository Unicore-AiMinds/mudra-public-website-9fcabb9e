
import { MapPin } from 'lucide-react';

const LocationMap = () => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden h-full min-h-[300px] flex flex-col">
      <div className="bg-mudra-primary/10 p-4 flex items-center">
        <MapPin className="h-5 w-5 text-mudra-primary mr-2" />
        <h3 className="font-serif font-medium">Clinic Location</h3>
      </div>
      
      <div className="flex-1 w-full bg-gray-200 relative">
        {/* This would be replaced with an actual Google Maps embed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-center px-4">
            Interactive Google Map would be embedded here<br/>
            <span className="text-sm">
              Manas Apartment, 1st Floor, Lakaki Road, Model Colony, Shivajinagar, Pune 411 016
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
