
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

interface ContactFormProps {
  formType: 'dental' | 'aesthetic';
}

const ContactForm = ({ formType }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInquiry: '',
    message: '',
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#serviceInquiry')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use apiClient instead of direct fetch - it talks to Supabase directly
      const result = await apiClient.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceInquiry: formData.serviceInquiry,
        message: formData.message,
        formType: formType, // 'dental' or 'aesthetic'
      });

      if (result.success) {
        toast({
          title: "Form submitted successfully",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceInquiry: '',
          message: '',
        });
      } else {
        toast({
          title: "Submission failed",
          description: result.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = formType === 'dental' 
    ? [
        'Dental Implants',
        'RCT & Crown',
        'Wisdom Tooth Extraction',
        'Aligners',
        'Teeth Whitening',
        'Scaling & Polishing',
        'Pediatric Dentistry',
        'Smile Redesign',
        'Full Mouth Rehabilitation',
        'Maxillofacial Prosthesis',
        'General Inquiry'
      ]
    : [
        'HydraFacial Skin Rejuvenation',
        'Removal of Warts, Skin Tags & Moles',
        'Chemical Peel',
        'Body Peel',
        'Tattoo Removal (Laser)',
        'Hair Transplants',
        'Hifu',
        'Skin PRP with Microneedling',
        'Semi Permanent Makeup',
        'General Inquiry'
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
            className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              formType === 'aesthetic' 
                ? 'focus:ring-meditouch-primary focus:border-meditouch-primary focus:shadow-[0_0_0_3px_rgba(90,44,139,0.1)]'
                : 'focus:ring-mudra-primary focus:border-mudra-primary'
            }`}
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
            className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              formType === 'aesthetic' 
                ? 'focus:ring-meditouch-primary focus:border-meditouch-primary focus:shadow-[0_0_0_3px_rgba(90,44,139,0.1)]'
                : 'focus:ring-mudra-primary focus:border-mudra-primary'
            }`}
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
            className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              formType === 'aesthetic' 
                ? 'focus:ring-meditouch-primary focus:border-meditouch-primary focus:shadow-[0_0_0_3px_rgba(90,44,139,0.1)]'
                : 'focus:ring-mudra-primary focus:border-mudra-primary'
            }`}
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
            onChange={(e) => {
              handleChange(e);
              setIsDropdownOpen(false);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setIsDropdownOpen(false)}
            className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              formType === 'aesthetic' 
                ? 'focus:ring-meditouch-primary focus:border-meditouch-primary focus:shadow-[0_0_0_3px_rgba(90,44,139,0.1)]'
                : 'focus:ring-mudra-primary focus:border-mudra-primary'
            }`}
            size={isMobile && isDropdownOpen ? 6 : 1}
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
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 text-white rounded-xl transition-all duration-200 disabled:opacity-70 transform hover:scale-105 active:scale-95 ${
            formType === 'aesthetic'
              ? 'bg-gradient-to-r from-meditouch-secondary to-meditouch-accent hover:from-meditouch-accent hover:to-meditouch-secondary hover:shadow-md font-meditouch-primary'
              : 'bg-mudra-primary hover:bg-mudra-secondary'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        <a href="/explore-pune" className={`transition-colors text-center sm:text-left ${
          formType === 'aesthetic'
            ? 'text-meditouch-primary hover:text-meditouch-accent font-meditouch-primary'
            : 'text-mudra-primary hover:text-mudra-secondary'
        }`}>
          Visiting Pune? Plan Your Trip
        </a>
      </div>
    </form>
  );
};

export default ContactForm;
