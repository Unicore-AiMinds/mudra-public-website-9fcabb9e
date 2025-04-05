
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  image?: string;
  location?: string;
}

interface TestimonialsSectionProps {
  type: 'dental' | 'aesthetic';
}

const TestimonialsSection = ({ type }: TestimonialsSectionProps) => {
  const testimonials: Testimonial[] = type === 'dental' 
    ? [
        {
          id: '1',
          name: 'Aditya Sharma',
          location: 'Pune',
          text: 'Dr. Bhargavi at Dental Metrix transformed my smile with her expert implant work. The entire staff was professional and caring throughout my treatment. I can now smile with confidence!',
          image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '2',
          name: 'Priya Desai',
          location: 'Mumbai',
          text: 'I had severe dental anxiety, but the team at Dental Metrix made me feel so comfortable. My smile makeover exceeded all expectations, and the pain-free experience was remarkable.',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '3',
          name: 'Raj Malhotra',
          location: 'Delhi',
          text: 'I traveled from Delhi specifically for treatment at Dental Metrix. The full mouth rehabilitation has restored both function and aesthetics. Worth every penny and the travel!',
        },
      ]
    : [
        {
          id: '1',
          name: 'Neha Kapoor',
          location: 'Pune',
          text: 'The HydraFacial at Meditouch gave my skin an incredible glow. The dermatologist carefully assessed my skin concerns and suggested the perfect treatment. Impressive results!',
          image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '2',
          name: 'Vikram Mehta',
          location: 'Bengaluru',
          text: 'I underwent hair transplant at Meditouch, and the results surpassed my expectations. The trichologist was knowledgeable and honest about what I could achieve. Very satisfied!',
          image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: '3',
          name: 'Anjali Reddy',
          location: 'Hyderabad',
          text: 'The HIFU skin tightening treatment at Meditouch has taken years off my appearance. The detailed consultation and personalized approach made all the difference.',
        },
      ];
      
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const currentTestimonial = testimonials[currentIndex];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-4">Patient Testimonials</h2>
            <div className="w-20 h-1 bg-mudra-accent mx-auto"></div>
          </div>
          
          <div className="relative bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">
            <Quote className="absolute text-mudra-primary/10 h-24 w-24 -top-4 -left-4" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center mb-6">
                {currentTestimonial.image ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <img 
                      src={currentTestimonial.image} 
                      alt={currentTestimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-mudra-primary/10 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <span className="text-mudra-primary font-serif text-xl">
                      {currentTestimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-lg font-medium">{currentTestimonial.name}</h3>
                  {currentTestimonial.location && (
                    <p className="text-gray-500 text-sm">{currentTestimonial.location}</p>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 italic mb-8">{currentTestimonial.text}</p>
              
              <div className="flex justify-center md:justify-end items-center space-x-4">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-gray-200 hover:bg-mudra-primary/10 hover:border-mudra-primary/20 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-mudra-primary" />
                </button>
                
                <span className="text-sm text-gray-500">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                
                <button 
                  onClick={handleNext}
                  className="p-2 rounded-full border border-gray-200 hover:bg-mudra-primary/10 hover:border-mudra-primary/20 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-mudra-primary" />
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
