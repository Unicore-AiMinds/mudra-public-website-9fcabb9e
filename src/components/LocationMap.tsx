
import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the map after component mounts
    if (mapRef.current) {
      // Location coordinates for Mudra Clinic (Model Colony, Shivajinagar, Pune)
      const location = { lat: 18.5321, lng: 73.8465 };
      
      // Create the Google Maps iframe dynamically
      const iframe = document.createElement('iframe');
      iframe.style.border = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.borderRadius = 'inherit';
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Mudra+Dental+%26+Aesthetic+Clinic,+Manas+Apartment,+Lakaki+Road,+Model+Colony,+Shivajinagar,+Pune+411016`;
      
      // Clear any existing content and append the iframe
      if (mapRef.current.children.length > 0) {
        mapRef.current.innerHTML = '';
      }
      mapRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden h-full min-h-[300px] flex flex-col">
      <div className="bg-mudra-primary/10 p-4 flex items-center">
        <MapPin className="h-5 w-5 text-mudra-primary mr-2" />
        <h3 className="font-serif font-medium">Clinic Location</h3>
      </div>
      
      <div className="flex-1 w-full bg-gray-200 relative" ref={mapRef}>
        {/* Google Map will be embedded here */}
      </div>
    </div>
  );
};

export default LocationMap;
