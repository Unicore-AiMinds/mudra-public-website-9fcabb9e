
import { MapPin, MapIcon } from 'lucide-react';

const LocationMap = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-serif text-xl font-medium mb-4">Clinic Location</h3>
      <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center mb-4">
        <MapIcon className="h-10 w-10 text-gray-400" />
      </div>
      <div className="flex items-start">
        <MapPin className="h-5 w-5 text-mudra-primary mt-1 mr-3 flex-shrink-0" />
        <p className="text-gray-600 text-sm">
          Manas Apartment, 1st Floor, Lakaki Road, Opp. Hotel Ambience, Model Colony, Shivajinagar, Pune 411 016
        </p>
      </div>
    </div>
  );
};

export default LocationMap;
