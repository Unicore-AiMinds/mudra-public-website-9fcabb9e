
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationMap = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-64">
      <div className="h-full w-full bg-gray-100 rounded-md flex flex-col items-center justify-center">
        <MapPin className="h-10 w-10 text-mudra-primary mb-3" />
        <p className="text-gray-500 text-sm text-center">
          Manas Apartment, 1st Floor, Lakaki Road, <br />
          Model Colony, Shivajinagar, <br />
          Pune 411 016
        </p>
        <button className="mt-4 text-sm text-mudra-primary hover:text-mudra-secondary transition-colors">
          View on Google Maps
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
