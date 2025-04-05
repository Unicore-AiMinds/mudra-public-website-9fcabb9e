
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import Hero from '../components/Hero';
import ScrollToTop from '../components/ScrollToTop';
import EditableServiceCard from '../components/EditableServiceCard';
import TestimonialsSection from '../components/TestimonialsSection';

const Meditouch = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ScrollToTop />
      
      <Hero 
        title="Meditouch" 
        subtitle="Expert Medical Care in Pune" 
        description="A modern multi-specialty medical center providing comprehensive healthcare services with a focus on personalized patient care."
        imageSrc="/public/lovable-uploads/30de7436-0ae6-4822-9328-75927ae20900.jpg"
        buttonText="Book Appointment"
        buttonLink="#contact"
      />
      
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">About Meditouch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gray-600 mb-6">
                Established in 2010, Meditouch has grown to become one of Pune's leading medical centers. 
                Our facility is equipped with state-of-the-art medical technology, enabling us to provide 
                accurate diagnoses and effective treatments across multiple specialties.
              </p>
              <p className="text-gray-600 mb-6">
                Our team consists of highly qualified doctors, specialists, and healthcare professionals who are 
                committed to delivering exceptional care. With expertise spanning various medical fields, we ensure 
                that our patients receive comprehensive healthcare services under one roof.
              </p>
              <p className="text-gray-600">
                At Meditouch, we believe in a patient-centered approach to healthcare. We prioritize clear communication, 
                compassionate care, and personalized treatment plans tailored to each patient's unique needs and circumstances.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                id="meditouch-about-image"
                src="/placeholder.svg" 
                alt="Meditouch Clinic Interior" 
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <EditableServiceCard 
                key={index} 
                title={service.title} 
                description={service.description} 
                image={service.image}
                id={`meditouch-service-image-${index}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <section className="py-16 bg-white" id="facilities">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Advanced Diagnostic Center</h3>
              <p className="text-gray-600 mb-6">
                Our diagnostic center is equipped with the latest medical imaging technologies, including 
                MRI, CT scans, ultrasound, and X-ray facilities. This enables our specialists to make accurate 
                diagnoses quickly, leading to more effective treatment plans.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Modern Treatment Rooms</h3>
              <p className="text-gray-600">
                Meditouch features comfortable and hygienic treatment rooms designed with patient comfort in mind. 
                Each room is equipped with advanced medical equipment and maintained according to the highest 
                standards of cleanliness and safety.
              </p>
            </div>
            <div className="flex justify-center order-1 md:order-2">
              <img 
                id="meditouch-facilities-image"
                src="/placeholder.svg" 
                alt="Meditouch Facilities" 
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50" id="team">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Specialists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialists.map((specialist, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center p-6">
                <img 
                  id={`meditouch-specialist-image-${index}`}
                  src={specialist.image} 
                  alt={specialist.name} 
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800">{specialist.name}</h3>
                <p className="text-gray-600 mb-2">{specialist.specialty}</p>
                <p className="text-gray-500 text-sm">{specialist.qualification}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <ContactForm />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Visit Our Clinic</h3>
              <p className="text-gray-600 mb-6">
                456 Medical Avenue, Aundh<br />
                Pune, Maharashtra 411007<br />
                India
              </p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Operating Hours</h3>
              <p className="text-gray-600 mb-2">Monday to Saturday: 8:00 AM - 9:00 PM</p>
              <p className="text-gray-600 mb-6">Sunday: 10:00 AM - 5:00 PM</p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
              <p className="text-gray-600 mb-2">Emergency: +91 98765 12345</p>
              <p className="text-gray-600 mb-2">Appointments: +91 98765 54321</p>
              <p className="text-gray-600">Email: care@meditouch.com</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Data
const services = [
  {
    title: "General Medicine",
    description: "Comprehensive healthcare services for adults, including preventive care, diagnosis, and treatment of various medical conditions.",
    image: "/placeholder.svg"
  },
  {
    title: "Pediatrics",
    description: "Specialized healthcare for children from birth through adolescence, including routine check-ups, vaccinations, and treatment of childhood illnesses.",
    image: "/placeholder.svg"
  },
  {
    title: "Cardiology",
    description: "Advanced cardiac care with focus on heart disease prevention, diagnosis, and management using the latest cardiac technology.",
    image: "/placeholder.svg"
  },
  {
    title: "Orthopedics",
    description: "Comprehensive care for musculoskeletal issues, including joint problems, sports injuries, and orthopedic surgeries.",
    image: "/placeholder.svg"
  },
  {
    title: "Gynecology",
    description: "Complete women's health services, including routine check-ups, pregnancy care, and treatment for various gynecological conditions.",
    image: "/placeholder.svg"
  },
  {
    title: "Dermatology",
    description: "Expert care for skin, hair, and nail conditions, including medical and cosmetic dermatology services.",
    image: "/placeholder.svg"
  }
];

const specialists = [
  {
    name: "Dr. Vikram Singh",
    specialty: "Chief Medical Officer",
    qualification: "MD, Internal Medicine",
    image: "/placeholder.svg"
  },
  {
    name: "Dr. Sunita Joshi",
    specialty: "Senior Cardiologist",
    qualification: "DM, Cardiology",
    image: "/placeholder.svg"
  },
  {
    name: "Dr. Rahul Kapoor",
    specialty: "Orthopedic Surgeon",
    qualification: "MS, Orthopedics",
    image: "/placeholder.svg"
  }
];

export default Meditouch;
