
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const ExplorePune = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <ScrollToTop />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Explore Pune</h1>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Local Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localAttractions.map((attraction, index) => (
              <AttractionCard key={index} {...attraction} />
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Nearby Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <AttractionCard key={index} {...attraction} />
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Accommodation Near Clinic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.map((accommodation, index) => (
              <AccommodationCard key={index} {...accommodation} />
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Culinary Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culinaryHighlights.map((highlight, index) => (
              <CulinaryCard key={index} {...highlight} />
            ))}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

// Attraction Card Component
const AttractionCard = ({ name, description, image, distance }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          id={`attraction-image-${name.replace(/\s+/g, '-').toLowerCase()}`}
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
        {distance && <p className="text-sm text-gray-600 mb-2">Distance: {distance}</p>}
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

// Accommodation Card Component
const AccommodationCard = ({ name, description, image, priceRange, distance }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          id={`accommodation-image-${name.replace(/\s+/g, '-').toLowerCase()}`}
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">Price: {priceRange}</p>
          <p className="text-sm text-gray-600">Distance: {distance}</p>
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

// Culinary Card Component
const CulinaryCard = ({ name, description, image, priceRange, specialties }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          id={`culinary-image-${name.replace(/\s+/g, '-').toLowerCase()}`}
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">Price: {priceRange}</p>
        <p className="text-gray-700 mb-2">{description}</p>
        {specialties && (
          <div>
            <p className="text-sm font-semibold text-gray-800">Specialties:</p>
            <ul className="list-disc list-inside text-gray-700">
              {specialties.map((specialty, index) => (
                <li key={index}>{specialty}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Data for the page
const localAttractions = [
  {
    name: "Shaniwar Wada",
    description: "Historical fortification and the seat of the Peshwas of the Maratha Empire.",
    image: "/public/lovable-uploads/318f8dc7-4638-410e-86dc-4a4a611558ba.jpg",
    distance: "3 km from clinic"
  },
  {
    name: "Aga Khan Palace",
    description: "Built in 1892, this palace holds historical significance as it was used as a prison for Mahatma Gandhi.",
    image: "/placeholder.svg",
    distance: "5 km from clinic"
  },
  {
    name: "Dagdusheth Halwai Ganpati Temple",
    description: "One of the most visited temples in Maharashtra dedicated to Lord Ganesha.",
    image: "/placeholder.svg",
    distance: "2.5 km from clinic"
  }
];

const nearbyAttractions = [
  {
    name: "Lavasa",
    description: "A planned hill city with beautiful landscapes and lakeside views.",
    image: "/placeholder.svg",
    distance: "60 km from Pune"
  },
  {
    name: "Lonavala",
    description: "A hill station known for its chikki (a traditional sweet), waterfalls, and scenic viewpoints.",
    image: "/placeholder.svg",
    distance: "65 km from Pune"
  },
  {
    name: "Khandala",
    description: "A hill station offering spectacular views of the Western Ghats.",
    image: "/placeholder.svg",
    distance: "70 km from Pune"
  }
];

const accommodations = [
  {
    name: "The Orchid Hotel",
    description: "Eco-friendly 5-star hotel with modern amenities and elegant rooms.",
    image: "/placeholder.svg",
    priceRange: "₹5,000 - ₹12,000 per night",
    distance: "1.2 km from clinic"
  },
  {
    name: "JW Marriott Hotel",
    description: "Luxury hotel with spacious rooms, multiple dining options, and a spa.",
    image: "/placeholder.svg",
    priceRange: "₹8,000 - ₹20,000 per night",
    distance: "3.5 km from clinic"
  },
  {
    name: "Conrad Pune",
    description: "Contemporary luxury hotel with world-class service and amenities.",
    image: "/placeholder.svg",
    priceRange: "₹7,000 - ₹18,000 per night",
    distance: "2.8 km from clinic"
  }
];

const culinaryHighlights = [
  {
    name: "Vaishali",
    description: "Iconic South Indian restaurant famous for its dosas and filter coffee.",
    image: "/placeholder.svg",
    priceRange: "₹200 - ₹500 per person",
    specialties: ["Mysore Masala Dosa", "Idli Sambar", "Filter Coffee"]
  },
  {
    name: "Kayani Bakery",
    description: "Historic bakery known for its Shrewsbury biscuits and mawa cakes.",
    image: "/placeholder.svg",
    priceRange: "₹100 - ₹300 per item",
    specialties: ["Shrewsbury Biscuits", "Mawa Cake"]
  },
  {
    name: "German Bakery",
    description: "Popular cafe offering a mix of international and local cuisine.",
    image: "/placeholder.svg",
    priceRange: "₹500 - ₹1,200 per person",
    specialties: ["Quiches", "Croissants", "Organic Coffee"]
  }
];

export default ExplorePune;
