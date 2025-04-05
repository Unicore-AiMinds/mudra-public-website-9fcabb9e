
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ContactFormProps {
  formType: 'dental' | 'aesthetic';
}

const ContactForm = ({ formType }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInquiry: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Form submitted successfully",
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceInquiry: '',
        message: '',
      });
    }, 1000);
  };

  const services = formType === 'dental' 
    ? [
        'Dental Implants',
        'Smile Designing',
        'Teeth Whitening',
        'Dental Aligners',
        'Full Mouth Rehabilitation',
        'Artificial Eyes, Ears & Nose',
        'General Checkup'
      ]
    : [
        'Hair Transplant',
        'Hair & Face PRP',
        'HydraFacial',
        'Laser Hair Reduction',
        'Skin Tightening (HIFU)',
        'Body Fat & Cellulite Reduction',
        'Chemical Peels',
        'Skin PRP w/ Microneedling',
        'Wart/Tag/Mole Removal',
        'Tattoo Removal',
        'Semi-permanent Makeup'
      ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mudra-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mudra-primary"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mudra-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="serviceInquiry" className="block text-sm font-medium text-gray-700 mb-1">
            Service Inquiry
          </label>
          <select
            id="serviceInquiry"
            name="serviceInquiry"
            value={formData.serviceInquiry}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mudra-primary"
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mudra-primary"
          required
        ></textarea>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        <a href="/explore-pune" className="text-mudra-primary hover:text-mudra-secondary transition-colors">
          Visiting Pune? Plan Your Trip
        </a>
      </div>
    </form>
  );
};

export default ContactForm;
