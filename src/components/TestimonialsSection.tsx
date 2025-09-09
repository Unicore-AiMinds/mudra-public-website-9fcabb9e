
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  image?: string;
  location?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  type: 'dental' | 'aesthetic';
}

const TestimonialsSection = ({ type }: TestimonialsSectionProps) => {
  const testimonials: Testimonial[] = type === 'dental' 
    ? [
        {
          id: '1',
          name: 'Root Canal & Implant Patient',
          text: 'I can\'t say enough good things about Dr. Bhargavi Kolhapure. From the painless root canal to expertly placed implants, she made each procedure comfortable and stress-free. Her genuine warmth, meticulous care, and clear communication truly set her apart.',
          rating: 5,
        },
        {
          id: '2',
          name: 'Root Canal Patient',
          text: 'I recently got a root canal treatment done at Dental Matrix by Dr. Bhargavi Kolhapure and had a great experience. The clinic is very well-maintained, with excellent hygiene standards and they have all the equipment with the latest technology and filled with \'good vibes\'.',
          rating: 5,
        },
        {
          id: '3',
          name: 'Emergency Dental Care Patient',
          text: 'Dr. Bhargavi was super helpful to take an emergency for a broken tooth and to find a solution in no time. Highly meticulous and great quality of work. Very reassuring by giving clear and detailed explanation. Her office staff and reception were gracious and cooperative.',
          rating: 5,
        },
        {
          id: '4',
          name: 'Family Patient',
          text: 'My son Swaraj is taking Root canal treatment in this clinic. Mam is so much caring and giving nice treatment to my son. I strongly recommend this clinic for child as well as adults. My wife Priya already took treatment from Mam four years ago, till date she don\'t have any issue. Thank you!',
          rating: 5,
        },
      ]
    : [
        {
          id: '1',
          name: 'Skin Treatment Patient',
          text: 'Best skin treatment around sb road. I\'m very happy with the treatment and will surely complete all the sessions. Must visit best staff, doctors, ambience and value for time!',
          rating: 5,
        },
        {
          id: '2',
          name: 'Skin & Hair Treatment Patient',
          text: 'Very well trained professional staff and well equipped clinic. Must visit for best skin n hair treatment 😊',
          rating: 5,
        },
        {
          id: '3',
          name: 'Skin Treatment Patient',
          text: 'I\'m very happy and satisfied with the results on my skin. It\'s a must visit clinic and doctors there are experienced and gave me the best possible treatment. I will surely visit again.',
          rating: 5,
        },
        {
          id: '4',
          name: 'Aesthetic Treatment Patient',
          text: 'The doctors were very polite and helpful. The clinic is very well maintained. I would like to visit again ☺️',
          rating: 5,
        },
      ];
      
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (type === 'aesthetic') { // Only for Meditouch
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
          setTimeout(() => setIsTransitioning(false), 100);
        }, 300);
      } else {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }
    }, 8000); // 8 second interval

    return () => clearInterval(interval);
  }, [testimonials.length, type]);
  
  const handlePrev = () => {
    if (type === 'aesthetic') { // Only for Meditouch
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setTimeout(() => setIsTransitioning(false), 100);
      }, 300);
    } else {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };
  
  const handleNext = () => {
    if (type === 'aesthetic') { // Only for Meditouch
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200);
    } else {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }
  };
  
  const currentTestimonial = testimonials[currentIndex];
  
  return (
    <section className={`${type === 'aesthetic' ? 'py-32' : 'py-16'} ${type === 'aesthetic' ? 'bg-transparent' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`mx-auto ${type === 'aesthetic' ? 'max-w-4xl' : 'max-w-3xl'}`}>
          <div className={`text-center ${type === 'aesthetic' ? 'mb-20' : 'mb-12'}`}>
            <h2 className={`font-semibold mb-6 ${
              type === 'aesthetic' 
                ? 'text-4xl font-meditouch-script bg-gradient-to-r from-meditouch-primary to-meditouch-accent bg-clip-text text-transparent' 
                : 'text-3xl mb-4 font-serif'
            }`}>
              Patient Testimonials
            </h2>
            {type === 'aesthetic' && (
              <p className="text-lg text-meditouch-primary/80 font-meditouch-primary leading-[1.7]">
                Real experiences from our valued patients who trusted Meditouch with their aesthetic journey
              </p>
            )}
            <div className={`w-16 h-1 mx-auto rounded-full ${
              type === 'aesthetic' 
                ? 'bg-gradient-to-r from-meditouch-primary via-meditouch-secondary to-meditouch-accent mt-10' 
                : 'bg-mudra-accent'
            }`}></div>
          </div>
          
          <div className={`relative bg-white p-6 md:p-10 rounded-xl ${
            type === 'aesthetic'
              ? 'shadow-[0_4px_6px_rgba(90,44,139,0.04),0_1px_3px_rgba(90,44,139,0.08)] border border-meditouch-primary/10'
              : 'shadow-sm border border-gray-100'
          }`}>
            <Quote className={`absolute h-24 w-24 -top-4 -left-4 ${
              type === 'aesthetic' ? 'text-meditouch-primary/10' : 'text-mudra-primary/10'
            }`} />
            
            <div className="relative z-10">
              <div className={`text-center mb-6 transition-opacity duration-300 ${
                type === 'aesthetic' && isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
                <h3 className={`text-lg font-medium ${
                  type === 'aesthetic' 
                    ? 'font-meditouch-primary text-meditouch-primary' 
                    : 'font-serif'
                }`}>{currentTestimonial.name}</h3>
                {currentTestimonial.location && (
                  <p className={`text-sm ${
                    type === 'aesthetic' 
                      ? 'text-meditouch-primary/70 font-meditouch-primary' 
                      : 'text-gray-500'
                  }`}>{currentTestimonial.location}</p>
                )}
                {currentTestimonial.rating && (
                  <div className="flex justify-center mt-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
              </div>
              
              <p className={`italic mb-8 transition-opacity duration-300 leading-[1.7] ${
                type === 'aesthetic' 
                  ? 'text-meditouch-primary/80 font-meditouch-primary text-lg' 
                  : 'text-gray-700'
              } ${type === 'aesthetic' && isTransitioning ? 'opacity-0' : 'opacity-100'}`}>{currentTestimonial.text}</p>
              
              <div className={`flex items-center space-x-4 ${
                type === 'aesthetic' ? 'justify-center mt-8' : 'justify-center md:justify-end'
              }`}>
                <button 
                  onClick={handlePrev}
                  className={`${
                    type === 'aesthetic' 
                      ? 'group p-3 rounded-full bg-meditouch-primary/10 hover:bg-meditouch-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 backdrop-blur-sm border border-meditouch-primary/20 hover:border-meditouch-primary'
                      : 'p-2 rounded-full border border-gray-200 hover:bg-mudra-primary/10 hover:border-mudra-primary/20 transition-colors'
                  }`}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className={`h-5 w-5 ${
                    type === 'aesthetic' 
                      ? 'text-meditouch-primary group-hover:text-white transition-colors duration-200' 
                      : 'text-mudra-primary'
                  }`} />
                </button>
                
                {/* Pagination dots for aesthetic (Meditouch) */}
                {type === 'aesthetic' ? (
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 active:scale-110 ${
                          index === currentIndex 
                            ? 'bg-gradient-to-r from-meditouch-secondary to-meditouch-accent shadow-md scale-125' 
                            : 'bg-meditouch-primary/20 hover:bg-meditouch-primary/40 hover:shadow-sm'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                )}
                
                <button 
                  onClick={handleNext}
                  className={`${
                    type === 'aesthetic' 
                      ? 'group p-3 rounded-full bg-meditouch-primary/10 hover:bg-meditouch-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 backdrop-blur-sm border border-meditouch-primary/20 hover:border-meditouch-primary'
                      : 'p-2 rounded-full border border-gray-200 hover:bg-mudra-primary/10 hover:border-mudra-primary/20 transition-colors'
                  }`}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className={`h-5 w-5 ${
                    type === 'aesthetic' 
                      ? 'text-meditouch-primary group-hover:text-white transition-colors duration-200' 
                      : 'text-mudra-primary'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
