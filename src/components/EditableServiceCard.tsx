
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  id: string;
}

const EditableServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img 
          id={id}
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default EditableServiceCard;
