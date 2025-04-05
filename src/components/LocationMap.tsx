
import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create an iframe element to embed Google Maps
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.648422096551!2d73.83136171489322!3d18.534930587401392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c065a6aa472f%3A0xdd7b55bcad7c48ba!2sModel%20Colony%2C%20Shivajinagar%2C%20Pune%2C%20Maharashtra%20411016!5m2!1s0x3bc2c065a6aa472f%3A0xdd7b55bcad7c48ba!4e0';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = '0';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    
    // Clear the container and append the iframe
    if (mapRef.current.firstChild) {
      mapRef.current.innerHTML = '';
    }
    mapRef.current.appendChild(iframe);
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden h-full min-h-[300px] flex flex-col">
      <div className="bg-mudra-primary/10 p-4 flex items-center">
        <MapPin className="h-5 w-5 text-mudra-primary mr-2" />
        <h3 className="font-serif font-medium">Clinic Location</h3>
      </div>
      
      <div className="flex-1 w-full bg-gray-200 relative">
        <div ref={mapRef} className="absolute inset-0">
          {/* Google Map will be embedded here */}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
