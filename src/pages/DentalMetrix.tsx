
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import Hero from '../components/Hero';
import ScrollToTop from '../components/ScrollToTop';
import EditableServiceCard from '../components/EditableServiceCard';
import TestimonialsSection from '../components/TestimonialsSection';

const DentalMetrix = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ScrollToTop />
      
      <Hero 
        title="DentalMetrix" 
        subtitle="Advanced Dental Care Solutions in Pune" 
        description="State-of-the-art dental care clinic providing comprehensive dental services with the latest technology and personalized patient care."
        imageSrc="/public/lovable-uploads/11798f90-38f2-40db-b3bd-8e8ac6328850.jpg"
        buttonText="Book Appointment"
        buttonLink="#contact"
      />
      
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">About DentalMetrix</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gray-600 mb-6">
                Founded in 2005, DentalMetrix has been at the forefront of dental innovation in Pune. 
                Our clinic is equipped with the latest digital dental technology, allowing us to provide 
                precise diagnoses and effective treatments.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of experienced dentists specializes in various fields of dentistry, 
                ensuring that we can address all your dental needs under one roof. From cosmetic dentistry 
                to complex oral surgeries, we are committed to delivering exceptional care with a gentle touch.
              </p>
              <p className="text-gray-600">
                At DentalMetrix, we believe in preventive care and patient education. We take the time to 
                explain treatment options and procedures, ensuring that you are comfortable and informed 
                throughout your dental journey with us.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                id="dentalmetrix-about-image"
                src="/public/lovable-uploads/30de7436-0ae6-4822-9328-75927ae20900.jpg" 
                alt="DentalMetrix Clinic Interior" 
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
                id={`dentalmetrix-service-image-${index}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <section className="py-16 bg-white" id="technology">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Digital Dentistry</h3>
              <p className="text-gray-600 mb-6">
                We leverage the latest in digital dentistry to provide precise, efficient, and comfortable 
                treatments. Our digital scanners eliminate the need for uncomfortable traditional impressions, 
                while our 3D imaging technology allows for accurate diagnostics and treatment planning.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Laser Dentistry</h3>
              <p className="text-gray-600">
                Our advanced laser dentistry techniques enable us to perform many procedures with minimal 
                discomfort and reduced recovery time. From treating gum disease to performing soft tissue 
                surgeries, laser dentistry represents the cutting edge of dental care.
              </p>
            </div>
            <div className="flex justify-center order-1 md:order-2">
              <img 
                id="dentalmetrix-technology-image"
                src="/placeholder.svg" 
                alt="Dental Technology" 
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50" id="team">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center p-6">
                <img 
                  id={`dentalmetrix-team-image-${index}`}
                  src={member.image} 
                  alt={member.name} 
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.qualification}</p>
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
                123 Dental Street, Koregaon Park<br />
                Pune, Maharashtra 411001<br />
                India
              </p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Operating Hours</h3>
              <p className="text-gray-600 mb-2">Monday to Friday: 9:00 AM - 8:00 PM</p>
              <p className="text-gray-600 mb-6">Saturday & Sunday: 10:00 AM - 6:00 PM</p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
              <p className="text-gray-600 mb-2">Phone: +91 98765 43210</p>
              <p className="text-gray-600">Email: info@dentalmetrix.com</p>
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
    title: "General Dentistry",
    description: "Comprehensive dental check-ups, cleanings, fillings, and preventive care to maintain your oral health.",
    image: "/placeholder.svg"
  },
  {
    title: "Cosmetic Dentistry",
    description: "Enhance your smile with our range of cosmetic services including teeth whitening, veneers, and smile makeovers.",
    image: "/placeholder.svg"
  },
  {
    title: "Orthodontics",
    description: "Straighten your teeth and correct bite issues with our advanced orthodontic treatments including clear aligners.",
    image: "/placeholder.svg"
  },
  {
    title: "Implant Dentistry",
    description: "Replace missing teeth with dental implants that look, feel, and function like natural teeth.",
    image: "/placeholder.svg"
  },
  {
    title: "Pediatric Dentistry",
    description: "Specialized dental care for children in a friendly environment to promote lifelong oral health habits.",
    image: "/placeholder.svg"
  },
  {
    title: "Endodontics",
    description: "Root canal treatments and therapies to save damaged or infected teeth and relieve pain.",
    image: "/placeholder.svg"
  }
];

const teamMembers = [
  {
    name: "Dr. Ananya Sharma",
    role: "Senior Dentist & Founder",
    qualification: "MDS, Oral Surgery",
    image: "/placeholder.svg"
  },
  {
    name: "Dr. Rajiv Mehta",
    role: "Cosmetic Dentist",
    qualification: "MDS, Prosthodontics",
    image: "/placeholder.svg"
  },
  {
    name: "Dr. Priya Patel",
    role: "Orthodontist",
    qualification: "MDS, Orthodontics",
    image: "/placeholder.svg"
  }
];

export default DentalMetrix;
