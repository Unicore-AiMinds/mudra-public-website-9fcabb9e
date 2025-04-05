import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  price?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, image, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {image && (
        <div className="h-48 overflow-hidden">
          <img className="w-full h-full object-cover" src={image} alt={title} />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {price && <div className="text-gray-900 font-semibold">{price}</div>}
        {Icon && (
          <div className="mt-4">
            <Icon className="h-6 w-6 text-mudra-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
