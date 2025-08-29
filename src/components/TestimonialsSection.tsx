
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
  
  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000); // 8 second interval

    return () => clearInterval(interval);
  }, [testimonials.length]);
  
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
              <div className="text-center mb-6">
                <h3 className="font-serif text-lg font-medium">{currentTestimonial.name}</h3>
                {currentTestimonial.location && (
                  <p className="text-gray-500 text-sm">{currentTestimonial.location}</p>
                )}
                {currentTestimonial.rating && (
                  <div className="flex justify-center mt-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
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
