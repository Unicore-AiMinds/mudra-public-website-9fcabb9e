import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TravelCard from '@/components/TravelCard';

const ExplorePune = () => {
  const localAttractions = [
    {
      name: 'Aga Khan Palace',
      description: 'Historic monument and museum with beautiful architecture and gardens, significant for its connection to Mahatma Gandhi and India\'s freedom movement.',
      image: 'https://images.unsplash.com/photo-1628773822516-0a267c8ee58a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Pune',
    },
    {
      name: 'Shaniwar Wada',
      description: 'Historic fortification in the city of Pune, once the seat of the Peshwas of the Maratha Empire, known for its impressive architecture and cultural significance.',
      image: 'https://images.unsplash.com/photo-1624265853559-a7ba3437e750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Pune',
    },
    {
      name: 'Dagdusheth Halwai Ganpati Temple',
      description: 'One of the most visited temples in Maharashtra, dedicated to Lord Ganesha, with elaborate decorations and a rich cultural history.',
      image: 'https://images.unsplash.com/photo-1623776025811-fd139155a39b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Pune',
    },
    {
      name: 'Raja Dinkar Kelkar Museum',
      description: 'Houses a rich collection of Indian artifacts including sculptures, paintings, and everyday items from the Maratha period and beyond.',
      image: 'https://images.unsplash.com/photo-1566127444993-e5f2d192c780?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Pune',
    },
  ];
  
  const nearbyAttractions = [
    {
      name: 'Lonavala & Khandala',
      description: 'Popular hill stations with stunning viewpoints, waterfalls, and lush green landscapes, perfect for day trips or weekend getaways from Pune.',
      image: 'https://images.unsplash.com/photo-1591804709369-a4f6bd8b3d90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Western Ghats',
      travelTime: '1 hour from Pune',
    },
    {
      name: 'Sinhagad Fort',
      description: 'Historic fort offering panoramic views of the surrounding valley, with a significant place in Maratha history and perfect for trekking enthusiasts.',
      image: 'https://images.unsplash.com/photo-1589307357824-f2ff61a6e461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Thoptewadi',
      travelTime: '30 minutes from Pune',
    },
    {
      name: 'Lavasa City',
      description: 'Planned city with European-style architecture, a lakefront promenade, and various recreational activities in a picturesque setting.',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Mulshi Valley',
      travelTime: '1 hour from Pune',
    },
  ];
  
  const accommodations = [
    {
      name: 'Conrad Pune',
      description: 'Luxury 5-star hotel with elegant rooms, multiple dining options, spa facilities, and impeccable service, conveniently located near the clinic.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Luxury',
      priceRange: '₹₹₹₹',
    },
    {
      name: 'Novotel Pune',
      description: 'Contemporary 4-star hotel offering comfortable rooms, international dining, a pool, and fitness center, ideal for business and leisure travelers.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Business',
      priceRange: '₹₹₹',
    },
    {
      name: 'Oakwood Residence Naylor Road',
      description: 'Serviced apartments with fully equipped kitchens, living areas, and hotel amenities, perfect for extended stays and those seeking a home-like environment.',
      image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Service Apartment',
      priceRange: '₹₹₹',
    },
    {
      name: 'Treebo Trip Natraj',
      description: 'Affordable, clean and well-maintained hotel with basic amenities, friendly service, and a central location, offering great value for budget-conscious travelers.',
      image: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Budget',
      priceRange: '₹₹',
    },
  ];
  
  const culinaryHighlights = [
    {
      name: 'Misal Pav',
      description: 'Spicy sprouted lentil curry served with bread rolls, a beloved Pune specialty with a perfect balance of flavors and textures.',
      image: 'https://images.unsplash.com/photo-1626131340348-ee3c192e1184?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      recommended: 'Bedekar Tea Stall, JJ Garden',
    },
    {
      name: 'Vada Pav',
      description: 'Mumbai\'s favorite street food that\'s equally popular in Pune - a spicy potato fritter in a bread roll with chutneys and spices.',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      recommended: 'Joshi Wadewale, FC Road',
    },
    {
      name: 'Mastani',
      description: 'Pune\'s signature dessert drink - a rich, thick milkshake topped with ice cream, dry fruits, and various flavorings.',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      recommended: 'Sujata Mastani, Multiple Locations',
    },
    {
      name: 'Poha',
      description: 'Flattened rice preparation with peanuts, herbs, and spices - a light and flavorful breakfast option popular throughout Pune.',
      image: 'https://images.unsplash.com/photo-1589554532035-1c2a2c8c79d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      recommended: 'Nagraj Poha, Narayan Peth',
    },
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16 md:pt-20 bg-gray-50">
        <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1570555014133-3ade08de9c13?w=2070&auto=format&fit=crop&q=80&ixlib=rb-4.0.3)',
              filter: 'brightness(0.8)'
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="max-w-4xl text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Pune & Surroundings: Visitor Guide
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Discover the perfect blend of tradition and modernity while visiting Mudra Clinic
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-semibold">Welcome to Pune</h2>
                <div className="w-16 h-1 bg-mudra-accent mx-auto mt-4"></div>
              </div>
              
              <p className="text-gray-700 mb-6">
                We're delighted that you've chosen Mudra Dental & Aesthetic Clinic for your treatment. 
                Beyond providing exceptional care, we want to ensure your visit to Pune is comfortable and 
                enjoyable. This guide highlights local attractions, accommodations, and culinary experiences 
                to enhance your stay in our vibrant city.
              </p>
              
              <p className="text-gray-700">
                Our team is available to provide additional recommendations or assistance with planning your 
                itinerary around your appointments. Feel free to contact us with any questions about local 
                transportation, dining options, or cultural experiences.
              </p>
            </div>
            
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-semibold">Places to Visit</h2>
                <div className="h-1 w-32 bg-mudra-primary/20 rounded-full"></div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-serif font-medium mb-6 text-mudra-primary">Local Attractions (Within Pune)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {localAttractions.map((attraction, index) => (
                      <TravelCard 
                        key={index}
                        name={attraction.name}
                        description={attraction.description}
                        image={attraction.image}
                        location={attraction.location}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-medium mb-6 text-mudra-primary">Nearby Attractions (Around Pune)</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {nearbyAttractions.map((attraction, index) => (
                      <TravelCard 
                        key={index}
                        name={attraction.name}
                        description={attraction.description}
                        image={attraction.image}
                        location={attraction.location}
                        travelTime={attraction.travelTime}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-semibold">Accommodation Near Clinic</h2>
                <div className="h-1 w-32 bg-mudra-primary/20 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accommodations.map((accommodation, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={accommodation.image} 
                        alt={accommodation.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-serif text-xl font-medium">{accommodation.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">{accommodation.category}</span>
                          <span className="text-mudra-accent font-medium">{accommodation.priceRange}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm">{accommodation.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-mudra-primary/5 rounded-lg border border-mudra-primary/10">
                <h3 className="font-serif text-lg font-medium mb-3">Need Assistance with Booking?</h3>
                <p className="text-gray-700 text-sm">
                  Our team can help arrange your accommodation and provide special rates at select partner hotels.
                  Please contact us at least one week before your arrival for booking assistance.
                </p>
              </div>
            </section>
            
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-semibold">Pune's Culinary Highlights</h2>
                <div className="h-1 w-32 bg-mudra-primary/20 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {culinaryHighlights.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-medium mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="bg-gray-50 px-3 py-2 rounded-md">
                        <p className="text-sm">
                          <span className="font-medium">Where to try:</span> {item.recommended}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-serif text-lg font-medium mb-3">Dietary Considerations</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Many restaurants in Pune offer excellent vegetarian options. If you have specific dietary 
                  requirements or are looking for particular cuisines, our staff can recommend suitable 
                  dining establishments near your accommodation or the clinic.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">Vegetarian-Friendly</span>
                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">International Cuisine</span>
                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">Fine Dining</span>
                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">Street Food</span>
                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">Local Specialties</span>
                </div>
              </div>
            </section>
            
            <section className="mb-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-mudra-primary to-mudra-secondary p-8 text-white">
                  <h2 className="text-2xl font-serif font-semibold mb-4">Plan Your Treatment Visit</h2>
                  <p className="text-white/90 mb-6">
                    We're committed to making your visit to Mudra Clinic comfortable and convenient. 
                    Our team can help coordinate your treatment schedule with your travel plans.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/dental-metrix#contact" 
                      className="px-6 py-3 bg-white text-mudra-primary rounded-md font-medium hover:bg-mudra-accent hover:text-white transition-colors text-center"
                    >
                      Contact Dental Metrix
                    </Link>
                    <Link 
                      to="/meditouch#contact" 
                      className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors text-center"
                    >
                      Contact Meditouch
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-lg font-medium mb-3">Transportation Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">From Airport to Clinic</h4>
                      <p className="text-gray-600">
                        Pune Airport is approximately 12 km from the clinic. Pre-paid taxis and ride-sharing 
                        services like Uber and Ola are readily available.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">Getting Around Pune</h4>
                      <p className="text-gray-600">
                        Auto-rickshaws and taxis are convenient for short distances. Ride-sharing apps 
                        offer reliable service throughout the city.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExplorePune;
