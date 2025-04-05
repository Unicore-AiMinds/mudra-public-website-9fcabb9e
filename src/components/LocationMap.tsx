
import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the map after component mounts
    if (mapRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.739210678149!2d73.83199857472081!3d18.534055982574936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06b7a8cb601%3A0x3147b725b0f7eca0!2sLakaki%20Rd%2C%20Model%20Colony%2C%20Shivajinagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712354548276!5m2!1sen!2sin";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "0";
      iframe.allowFullscreen = false;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      
      // Clear any existing content and append the iframe
      if (mapRef.current.firstChild) {
        mapRef.current.innerHTML = '';
      }
      mapRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-serif text-xl font-medium mb-4">Clinic Location</h3>
      <div ref={mapRef} className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
        {/* Map will be loaded here */}
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
