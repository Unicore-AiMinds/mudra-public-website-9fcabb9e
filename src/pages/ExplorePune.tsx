import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TravelCard from '@/components/TravelCard';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ExplorePune = () => {
  const brandMode = import.meta.env.VITE_BRAND_MODE;
  
  // Carousel states
  const [localAttractionsSlide, setLocalAttractionsSlide] = useState(0);
  const [nearbyAttractionsSlide, setNearbyAttractionsSlide] = useState(0);
  const [accommodationSlide, setAccommodationSlide] = useState(0);
  const [legendaryLocalSlide, setLegendaryLocalSlide] = useState(0);
  const [fineDiningSlide, setFineDiningSlide] = useState(0);
  
  // Touch gesture states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Auto-advance states
  const [isPaused, setIsPaused] = useState(false);
  
  const clinicName = brandMode === 'dental' ? 'Dental Metrix' : 
                    brandMode === 'meditouch' ? 'Meditouch' : 
                    'Dental Metrix or Meditouch';

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return; // Only on mobile
    setIsPaused(true); // Pause auto-advance on touch
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (slideType: string, currentSlide: number, maxSlides: number, setSlide: (slide: number) => void) => {
    if (!touchStart || !touchEnd || window.innerWidth >= 768) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < maxSlides - 1) {
      setSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setSlide(currentSlide - 1);
    }
    
    // Resume auto-advance after 3 seconds of inactivity
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Navigation functions
  const nextSlide = (slideType: string, currentSlide: number, maxSlides: number, setSlide: (slide: number) => void) => {
    if (currentSlide < maxSlides - 1) {
      setSlide(currentSlide + 1);
    }
  };

  const prevSlide = (slideType: string, currentSlide: number, setSlide: (slide: number) => void) => {
    if (currentSlide > 0) {
      setSlide(currentSlide - 1);
    }
  };
  const localAttractions = [
    {
      name: 'Aga Khan Palace',
      description: 'Historic monument and museum with beautiful architecture and gardens, significant for its connection to Mahatma Gandhi and India\'s freedom movement.',
      image: '/images/aga-khan-palace.webp',
      location: 'Pune',
    },
    {
      name: 'Shaniwar Wada',
      description: 'Historic fortification in the city of Pune, once the seat of the Peshwas of the Maratha Empire, known for its impressive architecture and cultural significance.',
      image: '/images/shaniwar-wada.jpg',
      location: 'Pune',
    },
    {
      name: 'Dagdusheth Halwai Ganpati Temple',
      description: 'One of the most visited temples in Maharashtra, dedicated to Lord Ganesha, with elaborate decorations and a rich cultural history.',
      image: '/images/dagduseth-halwai.jpg',
      location: 'Pune',
    },
    {
      name: 'Raja Dinkar Kelkar Museum',
      description: 'Houses a rich collection of Indian artifacts including sculptures, paintings, and everyday items from the Maratha period and beyond.',
      image: '/images/raja-dinkar-kelkar-museum.jpg',
      location: 'Pune',
    },
  ];
  
  const nearbyAttractions = [
    {
      name: 'Lonavala & Khandala',
      description: 'Popular hill stations with stunning viewpoints, waterfalls, and lush green landscapes, perfect for day trips or weekend getaways from Pune.',
      image: '/images/lonavala-and-khandala.webp',
      location: 'Western Ghats',
      travelTime: '1.5 hours from Pune',
    },
    {
      name: 'Sinhagad Fort',
      description: 'Historic fort offering panoramic views of the surrounding valley, with a significant place in Maratha history and perfect for trekking enthusiasts.',
      image: '/images/sinhagad-fort.jpg',
      location: 'Thoptewadi',
      travelTime: '1 hour from Pune',
    },
    {
      name: 'Lavasa City',
      description: 'Planned city with European-style architecture, a lakefront promenade, and various recreational activities in a picturesque setting.',
      image: '/images/lavasa-city.avif',
      location: 'Mulshi Valley',
      travelTime: '2 hours from Pune',
    },
    {
      name: 'Mulshi Dam & Lake',
      description: 'Scenic reservoir surrounded by lush green hills and valleys, offering tranquil views, water sports, and perfect spots for photography and relaxation.',
      image: '/images/mulshi-lake.avif',
      location: 'Mulshi',
      travelTime: '1.5 hours from Pune',
    },
  ];
  
  const accommodations = [
    {
      name: 'JW Marriott Hotel Pune',
      description: 'Luxury 5-star hotel with elegant rooms, multiple dining options, spa facilities, and impeccable service, offering world-class hospitality.',
      image: '/images/jw-marriott.jpg',
      category: 'Luxury Option',
      priceRange: '₹₹₹₹',
    },
    {
      name: 'Ambience Hotel',
      description: 'Comfortable mid-range hotel with modern amenities, quality service, and convenient location, perfect for business and leisure travelers.',
      image: '/images/ambience-hotel.avif',
      category: 'Moderate Option',
      priceRange: '₹₹₹',
    },
    {
      name: 'The Ambassador Hotel',
      description: 'Well-established moderate hotel offering reliable service, comfortable rooms, and good value for money in a central location.',
      image: '/images/ambassador-hotel.jpg',
      category: 'Moderate Option',
      priceRange: '₹₹₹',
    },
    {
      name: 'Serviced Apartments & Airbnb',
      description: 'Independent accommodation options with fully equipped kitchens, living areas, and flexible stays, ideal for extended visits and family groups.',
      image: '/images/airbnb.avif',
      category: 'Affordable',
      priceRange: '₹₹',
    },
  ];
  
  const legendaryLocalEats = [
    {
      name: 'Vaishali (FC Road)',
      description: 'An iconic establishment famous for its South Indian dishes like Dosa and Idli Sambhar.',
      image: '/images/vaishali-new.jpg',
      category: 'Legendary & Local',
    },
    {
      name: 'Marz-O-Rin (Camp)',
      description: 'A charming heritage bakery café famous for its delicious sandwiches, fresh pastries, and homemade baked goods since 1965.',
      image: '/images/marz-o-rin.jpg',
      category: 'Legendary & Local',
    },
    {
      name: 'Bedekar Tea Stall (Narayan Peth)',
      description: 'For the most authentic Puneri Misal Pav—a spicy curry of sprouts.',
      image: '/images/bedekar-misal.avif',
      category: 'Legendary & Local',
    },
    {
      name: 'Garden Vadapav (Camp)',
      description: 'A popular local spot serving delicious Vadapav, Mumbai\'s iconic street food that\'s equally beloved in Pune.',
      image: '/images/garden-vadapav.jpg',
      category: 'Legendary & Local',
    },
  ];

  const fineDiningOptions = [
    {
      name: 'Paasha, JW Marriott (SB Road)',
      description: 'Rooftop lounge with stunning city views and exquisite North-West Frontier cuisine.',
      image: '/images/paasha.jpg',
      category: 'Fine Dining & Modern Cuisine',
      rating: '⭐',
    },
    {
      name: 'Malaka Spice (Koregaon Park)',
      description: 'A celebrated Pan-Asian restaurant with a beautiful, ambient setting.',
      image: '/images/malaka-spice.jpg',
      category: 'Fine Dining & Modern Cuisine',
      rating: '⭐',
    },
    {
      name: 'Hotel Ambience (Shivajinagar)',
      description: 'Elegant dining experience featuring fusion cuisine in a sophisticated atmosphere.',
      image: '/images/hotel-ambience.jpg',
      category: 'Fine Dining & Modern Cuisine',
      rating: '⭐',
    },
    {
      name: 'Coriander Kitchen, Conrad (Bund Garden Road)',
      description: 'Contemporary all-day dining restaurant offering international cuisine with sophisticated presentation and premium hospitality.',
      image: '/images/coriander-kitchen.png',
      category: 'Fine Dining & Modern Cuisine',
      rating: '⭐',
    },
  ];
  
  // Auto-advance effect for mobile only
  useEffect(() => {
    if (window.innerWidth >= 768 || isPaused) return; // Only on mobile and when not paused

    const interval = setInterval(() => {
      // Auto-advance local attractions
      setLocalAttractionsSlide(prev => {
        const maxSlides = Math.ceil(localAttractions.length / 2);
        return prev >= maxSlides - 1 ? 0 : prev + 1;
      });
      
      // Auto-advance nearby attractions
      setNearbyAttractionsSlide(prev => {
        const maxSlides = Math.ceil(nearbyAttractions.length / 2);
        return prev >= maxSlides - 1 ? 0 : prev + 1;
      });
      
      // Auto-advance accommodation
      setAccommodationSlide(prev => {
        const maxSlides = Math.ceil(accommodations.length / 2);
        return prev >= maxSlides - 1 ? 0 : prev + 1;
      });
      
      // Auto-advance legendary local
      setLegendaryLocalSlide(prev => {
        const maxSlides = Math.ceil(legendaryLocalEats.length / 2);
        return prev >= maxSlides - 1 ? 0 : prev + 1;
      });
      
      // Auto-advance fine dining
      setFineDiningSlide(prev => {
        const maxSlides = Math.ceil(fineDiningOptions.length / 2);
        return prev >= maxSlides - 1 ? 0 : prev + 1;
      });
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [isPaused, localAttractions.length, nearbyAttractions.length, accommodations.length, legendaryLocalEats.length, fineDiningOptions.length]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16 md:pt-20 bg-gray-50">
        <div className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/onkar-gotale-3Z8s_-Qh9GY-unsplash.jpg)',
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
                Discover the perfect blend of tradition and modernity while visiting {clinicName}
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
                We're delighted that you've chosen {clinicName} for your treatment. 
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
                  
                  {/* Desktop: Original grid layout */}
                  <div className="hidden md:grid grid-cols-2 gap-6">
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
                  
                  {/* Mobile: Carousel layout */}
                  <div className="md:hidden">
                    <div className="overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={() => onTouchEnd('localAttractions', localAttractionsSlide, Math.ceil(localAttractions.length / 2), setLocalAttractionsSlide)}
                      >
                        {Array.from({ length: Math.ceil(localAttractions.length / 2) }, (_, slideIndex) => (
                          <div key={slideIndex} className={`w-full flex-shrink-0 ${slideIndex === localAttractionsSlide ? 'block' : 'hidden'}`}>
                            <div className="space-y-6">
                              {localAttractions.slice(slideIndex * 2, slideIndex * 2 + 2).map((attraction, index) => (
                                <TravelCard 
                                  key={slideIndex * 2 + index}
                                  name={attraction.name}
                                  description={attraction.description}
                                  image={attraction.image}
                                  location={attraction.location}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mobile indicators with navigation arrows */}
                    <div className="flex justify-center items-center mt-6 space-x-4">
                      <button
                        onClick={() => {
                          prevSlide('localAttractions', localAttractionsSlide, setLocalAttractionsSlide);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                        className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        disabled={localAttractionsSlide === 0}
                      >
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                      </button>
                      
                      <div className="flex space-x-2">
                        {Array.from({ length: Math.ceil(localAttractions.length / 2) }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setLocalAttractionsSlide(index);
                              setIsPaused(true);
                              setTimeout(() => setIsPaused(false), 3000);
                            }}
                            className={`h-2 w-2 rounded-full transition-colors ${
                              index === localAttractionsSlide ? 'bg-mudra-primary' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          nextSlide('localAttractions', localAttractionsSlide, Math.ceil(localAttractions.length / 2), setLocalAttractionsSlide);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                        className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        disabled={localAttractionsSlide >= Math.ceil(localAttractions.length / 2) - 1}
                      >
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-medium mb-6 text-mudra-primary">Nearby Attractions (Around Pune)</h3>
                  
                  {/* Desktop: Original grid layout */}
                  <div className="hidden md:grid grid-cols-2 gap-6">
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
                  
                  {/* Mobile: Carousel layout */}
                  <div className="md:hidden">
                    <div className="overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={() => onTouchEnd('nearbyAttractions', nearbyAttractionsSlide, Math.ceil(nearbyAttractions.length / 2), setNearbyAttractionsSlide)}
                      >
                        {Array.from({ length: Math.ceil(nearbyAttractions.length / 2) }, (_, slideIndex) => (
                          <div key={slideIndex} className={`w-full flex-shrink-0 ${slideIndex === nearbyAttractionsSlide ? 'block' : 'hidden'}`}>
                            <div className="space-y-6">
                              {nearbyAttractions.slice(slideIndex * 2, slideIndex * 2 + 2).map((attraction, index) => (
                                <TravelCard 
                                  key={slideIndex * 2 + index}
                                  name={attraction.name}
                                  description={attraction.description}
                                  image={attraction.image}
                                  location={attraction.location}
                                  travelTime={attraction.travelTime}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mobile indicators with navigation arrows */}
                    <div className="flex justify-center items-center mt-6 space-x-4">
                      <button
                        onClick={() => {
                          prevSlide('nearbyAttractions', nearbyAttractionsSlide, setNearbyAttractionsSlide);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                        className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        disabled={nearbyAttractionsSlide === 0}
                      >
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                      </button>
                      
                      <div className="flex space-x-2">
                        {Array.from({ length: Math.ceil(nearbyAttractions.length / 2) }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setNearbyAttractionsSlide(index);
                              setIsPaused(true);
                              setTimeout(() => setIsPaused(false), 3000);
                            }}
                            className={`h-2 w-2 rounded-full transition-colors ${
                              index === nearbyAttractionsSlide ? 'bg-mudra-primary' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          nextSlide('nearbyAttractions', nearbyAttractionsSlide, Math.ceil(nearbyAttractions.length / 2), setNearbyAttractionsSlide);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                        className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        disabled={nearbyAttractionsSlide >= Math.ceil(nearbyAttractions.length / 2) - 1}
                      >
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-semibold">Accommodation Near Clinic</h2>
                <div className="h-1 w-32 bg-mudra-primary/20 rounded-full"></div>
              </div>
              
              {/* Desktop: Original grid layout */}
              <div className="hidden md:grid grid-cols-2 gap-6">
                {accommodations.map((accommodation, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      {accommodation.image ? (
                        <img 
                          src={accommodation.image} 
                          alt={accommodation.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path></svg></div>`;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
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

              {/* Mobile: Carousel layout */}
              <div className="md:hidden">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={() => onTouchEnd('accommodation', accommodationSlide, Math.ceil(accommodations.length / 2), setAccommodationSlide)}
                  >
                    {Array.from({ length: Math.ceil(accommodations.length / 2) }, (_, slideIndex) => (
                      <div key={slideIndex} className={`w-full flex-shrink-0 ${slideIndex === accommodationSlide ? 'block' : 'hidden'}`}>
                        <div className="space-y-6">
                          {accommodations.slice(slideIndex * 2, slideIndex * 2 + 2).map((accommodation, index) => (
                            <div key={slideIndex * 2 + index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                              <div className="h-48 bg-gray-100 overflow-hidden">
                                {accommodation.image ? (
                                  <img 
                                    src={accommodation.image} 
                                    alt={accommodation.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      const parent = target.parentElement;
                                      if (parent) {
                                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path></svg></div>`;
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="h-16 w-16 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="p-5">
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="font-serif text-xl font-medium">{accommodation.name}</h3>
                                  <div className="flex items-center">
                                    <span className="text-sm text-gray-500 mr-2">{accommodation.category}</span>
                                    <span className="text-mudra-accent font-medium whitespace-nowrap">{accommodation.priceRange}</span>
                                  </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm">{accommodation.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile indicators with navigation arrows */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                  <button
                    onClick={() => {
                      prevSlide('accommodation', accommodationSlide, setAccommodationSlide);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 3000);
                    }}
                    className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={accommodationSlide === 0}
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </button>
                  
                  <div className="flex space-x-2">
                    {Array.from({ length: Math.ceil(accommodations.length / 2) }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAccommodationSlide(index);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          index === accommodationSlide ? 'bg-mudra-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      nextSlide('accommodation', accommodationSlide, Math.ceil(accommodations.length / 2), setAccommodationSlide);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 3000);
                    }}
                    className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={accommodationSlide >= Math.ceil(accommodations.length / 2) - 1}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
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
                <h2 className="text-3xl font-serif font-semibold">A Culinary Journey: Where to Eat</h2>
                <div className="h-1 w-32 bg-mudra-primary/20 rounded-full"></div>
              </div>
              <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                From legendary cafés to fine dining, Pune is a food lover's paradise.
              </p>
              
              {/* Legendary & Local Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-semibold mb-6 text-mudra-primary">🏛️ Legendary & Local</h3>
                
                {/* Desktop: Original grid layout */}
                <div className="hidden md:grid grid-cols-2 gap-6">
                  {legendaryLocalEats.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path></svg></div>`;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <h4 className="font-serif text-lg font-medium mb-2">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile: Carousel layout */}
                <div className="md:hidden">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={() => onTouchEnd('legendaryLocal', legendaryLocalSlide, Math.ceil(legendaryLocalEats.length / 2), setLegendaryLocalSlide)}
                    >
                      {Array.from({ length: Math.ceil(legendaryLocalEats.length / 2) }, (_, slideIndex) => (
                        <div key={slideIndex} className={`w-full flex-shrink-0 ${slideIndex === legendaryLocalSlide ? 'block' : 'hidden'}`}>
                          <div className="space-y-6">
                            {legendaryLocalEats.slice(slideIndex * 2, slideIndex * 2 + 2).map((item, index) => (
                              <div key={slideIndex * 2 + index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                                <div className="h-48 bg-gray-100 overflow-hidden">
                                  {item.image ? (
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path></svg></div>`;
                                        }
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <ImageIcon className="h-16 w-16 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="p-5">
                                  <h4 className="font-serif text-lg font-medium mb-2">{item.name}</h4>
                                  <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mobile indicators with navigation arrows */}
                  <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                      onClick={() => {
                        prevSlide('legendaryLocal', legendaryLocalSlide, setLegendaryLocalSlide);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 3000);
                      }}
                      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={legendaryLocalSlide === 0}
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <div className="flex space-x-2">
                      {Array.from({ length: Math.ceil(legendaryLocalEats.length / 2) }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setLegendaryLocalSlide(index);
                            setIsPaused(true);
                            setTimeout(() => setIsPaused(false), 3000);
                          }}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === legendaryLocalSlide ? 'bg-mudra-primary' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        nextSlide('legendaryLocal', legendaryLocalSlide, Math.ceil(legendaryLocalEats.length / 2), setLegendaryLocalSlide);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 3000);
                      }}
                      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={legendaryLocalSlide >= Math.ceil(legendaryLocalEats.length / 2) - 1}
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fine Dining Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold mb-6 text-mudra-primary">⭐ Fine Dining & Modern Cuisine</h3>
                
                {/* Desktop: Original grid layout */}
                <div className="hidden md:grid grid-cols-2 gap-6">
                  {fineDiningOptions.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path></svg></div>`;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-serif text-lg font-medium">{item.name}</h4>
                          {item.rating && <span className="text-lg">{item.rating}</span>}
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile: Carousel layout */}
                <div className="md:hidden">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={() => onTouchEnd('fineDining', fineDiningSlide, Math.ceil(fineDiningOptions.length / 2), setFineDiningSlide)}
                    >
                      {Array.from({ length: Math.ceil(fineDiningOptions.length / 2) }, (_, slideIndex) => (
                        <div key={slideIndex} className={`w-full flex-shrink-0 ${slideIndex === fineDiningSlide ? 'block' : 'hidden'}`}>
                          <div className="space-y-6">
                            {fineDiningOptions.slice(slideIndex * 2, slideIndex * 2 + 2).map((item, index) => (
                              <div key={slideIndex * 2 + index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md image-card">
                                <div className="h-48 bg-gray-100 overflow-hidden">
                                  {item.image ? (
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path></svg></div>`;
                                        }
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <ImageIcon className="h-16 w-16 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="p-5">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-serif text-lg font-medium">{item.name}</h4>
                                    {item.rating && <span className="text-lg">{item.rating}</span>}
                                  </div>
                                  <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mobile indicators with navigation arrows */}
                  <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                      onClick={() => {
                        prevSlide('fineDining', fineDiningSlide, setFineDiningSlide);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 3000);
                      }}
                      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={fineDiningSlide === 0}
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <div className="flex space-x-2">
                      {Array.from({ length: Math.ceil(fineDiningOptions.length / 2) }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setFineDiningSlide(index);
                            setIsPaused(true);
                            setTimeout(() => setIsPaused(false), 3000);
                          }}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === fineDiningSlide ? 'bg-mudra-primary' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        nextSlide('fineDining', fineDiningSlide, Math.ceil(fineDiningOptions.length / 2), setFineDiningSlide);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 3000);
                      }}
                      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={fineDiningSlide >= Math.ceil(fineDiningOptions.length / 2) - 1}
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
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
                    We're committed to making your visit to {clinicName} comfortable and convenient. 
                    Our team can help coordinate your treatment schedule with your travel plans.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {import.meta.env.VITE_BRAND_MODE !== 'meditouch' && (
                      <a href="/dental-metrix#contact" className="px-6 py-3 bg-white text-mudra-primary rounded-md font-medium hover:bg-mudra-accent hover:text-white transition-colors text-center">
                        Contact Dental Metrix
                      </a>
                    )}
                    {import.meta.env.VITE_BRAND_MODE !== 'dental' && (
                      <a href="/meditouch#contact" className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors text-center">
                        Contact Meditouch
                      </a>
                    )}
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
