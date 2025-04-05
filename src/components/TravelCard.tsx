import React from 'react';

interface TravelCardProps {
  name: string;
  description: string;
  cost: string;
  rating: string;
}

const TravelCard: React.FC<TravelCardProps> = ({ name, description, cost, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
        {/* Placeholder Image */}
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a4.5 4.5 0 00-4.5 4.5v3m13.5-3C15.168 5.477 16.754 4.75 18.5 4.75a4.5 4.5 0 014.5 4.5v3m-13.5-3c1.1 0 2.253.846 2.253 1.932v10.086c0 1.086-.824 1.932-1.932 1.932H8.31c-1.079 0-1.932-.846-1.932-1.932V9.232c0-1.086.853-1.932 1.932-1.932h3.258z" />
        </svg>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-semibold">{cost}</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
