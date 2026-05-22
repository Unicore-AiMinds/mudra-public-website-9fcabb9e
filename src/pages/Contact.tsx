
import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Building, Phone, Mail, Clock, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationMap from '@/components/LocationMap';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const brandMode = import.meta.env.VITE_BRAND_MODE;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isFieldInvalid = (fieldName: string, fieldValue: string) =>
    (attempted || touched[fieldName]) && !fieldValue.trim();

  const isEmailInvalid = () => {
    if (!formData.email.trim()) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (attempted || touched['email']) && !emailRegex.test(formData.email.trim());
  };

  const isPhoneInvalid = () => {
    if (!formData.phone.trim()) return false;
    const phoneRegex = /^\d{10}$/;
    return (attempted || touched['phone']) && !phoneRegex.test(formData.phone.trim());
  };
  
  const [countryCode, setCountryCode] = useState('+91');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCountryClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('click', handleCountryClickOutside);
    return () => document.removeEventListener('click', handleCountryClickOutside);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    division: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.division.trim()) {
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      return;
    }

    if (!captchaToken) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${countryCode} ${formData.phone}`,
          serviceInquiry: formData.division,
          message: formData.message,
          formType: formData.division === 'aesthetic' ? 'aesthetic' : 'dental',
          captchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent successfully",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          division: '',
          message: '',
        });
        setAttempted(false);
        setTouched({});
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
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about our services or want to schedule an appointment? 
                Reach out to us through any of the channels below or fill out the contact form.
              </p>
              <div className="w-20 h-1 bg-mudra-accent mx-auto mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
                  <h2 className="text-2xl font-serif font-semibold mb-6">Clinic Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-mudra-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">
                          Manas Apartment, 1st Floor, Lakaki Road, Opp. Hotel Ambience, Model Colony, Shivajinagar, Pune 411 016
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-mudra-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        {brandMode !== 'meditouch' && (
                          <p className="text-gray-600">Dental Metrix: <a href="tel:+919152951573" className="text-mudra-primary">+919152951573</a></p>
                        )}
                        {brandMode !== 'dental' && (
                          <p className="text-gray-600">Meditouch: <a href="tel:+919371015255" className="text-mudra-primary">+919371015255</a></p>
                        )}
                        {!brandMode && (
                          <>
                            <p className="text-gray-600">Dental Metrix: <a href="tel:+919152951573" className="text-mudra-primary">+919152951573</a></p>
                            <p className="text-gray-600">Meditouch: <a href="tel:+919371015255" className="text-mudra-primary">+919371015255</a></p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-mudra-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Hours</p>
                        <p className="text-gray-600">Monday - Saturday: 10:00 am - 7:00 pm</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-64 md:h-80">
                  <LocationMap />
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-serif font-semibold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        isFieldInvalid('name', formData.name)
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-mudra-primary'
                      }`}
                    />
                    {isFieldInvalid('name', formData.name) && <p className="text-red-500 text-xs mt-1">Full Name is required</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          isEmailInvalid()
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-mudra-primary'
                        }`}
                      />
                      {isEmailInvalid() && <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className={`flex border rounded-md focus-within:ring-2 ${
                        isFieldInvalid('phone', formData.phone)
                          ? 'border-red-500 focus-within:ring-red-500'
                          : 'border-gray-300 focus-within:ring-mudra-primary'
                      }`}>
                        <div ref={countryRef} className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                            className="flex items-center gap-1 pl-3 pr-2 py-2 bg-gray-50 border-r border-gray-300 text-sm cursor-pointer hover:bg-gray-100 h-full rounded-l-md"
                          >
                            <span>{countryCode}</span>
                            <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>
                          {isCountryOpen && (
                            <ul className="absolute top-full left-0 mt-1 w-56 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                              {[
                                { code: '+91', name: 'India' },
                                { code: '+1', name: 'United States' },
                                { code: '+44', name: 'United Kingdom' },
                                { code: '+61', name: 'Australia' },
                                { code: '+971', name: 'UAE' },
                                { code: '+65', name: 'Singapore' },
                                { code: '+60', name: 'Malaysia' },
                                { code: '+974', name: 'Qatar' },
                                { code: '+966', name: 'Saudi Arabia' },
                                { code: '+49', name: 'Germany' },
                                { code: '+33', name: 'France' },
                                { code: '+81', name: 'Japan' },
                                { code: '+86', name: 'China' },
                                { code: '+82', name: 'South Korea' },
                                { code: '+977', name: 'Nepal' },
                                { code: '+94', name: 'Sri Lanka' },
                                { code: '+880', name: 'Bangladesh' },
                                { code: '+92', name: 'Pakistan' },
                              ].map((country) => (
                                <li
                                  key={country.code}
                                  onClick={() => { setCountryCode(country.code); setIsCountryOpen(false); }}
                                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between ${
                                    countryCode === country.code ? 'bg-gray-50 font-medium' : ''
                                  }`}
                                >
                                  <span>{country.name}</span>
                                  <span className="text-gray-500">{country.code}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="flex-1 min-w-0 px-3 py-2 focus:outline-none rounded-r-md"
                        />
                      </div>
                      {isFieldInvalid('phone', formData.phone) && <p className="text-red-500 text-xs mt-1">Phone Number is required</p>}
                      {isPhoneInvalid() && <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Division
                    </label>
                    <select
                      id="division"
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        isFieldInvalid('division', formData.division)
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-mudra-primary'
                      }`}
                    >
                      <option value="">Select a division</option>
                      {brandMode !== 'meditouch' && <option value="dental">Dental Metrix</option>}
                      {brandMode !== 'dental' && <option value="aesthetic">Meditouch</option>}
                      {!brandMode && (
                        <>
                          <option value="dental">Dental Metrix</option>
                          <option value="aesthetic">Meditouch</option>
                        </>
                      )}
                      <option value="general">General Inquiry</option>
                    </select>
                    {isFieldInvalid('division', formData.division) && <p className="text-red-500 text-xs mt-1">Division is required</p>}
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
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mudra-primary"
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={(token) => setCaptchaToken(token)}
                      onExpired={() => setCaptchaToken(null)}
                    />
                    {attempted && !captchaToken && <p className="text-red-500 text-xs mt-2">Please complete the CAPTCHA</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors disabled:opacity-70 w-full"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
            
            <div className={`mt-12 grid gap-6 ${brandMode ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
              {brandMode !== 'meditouch' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-mudra-primary mr-2" />
                  <h3 className="font-serif text-lg font-medium">Dental Services</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Looking for information about our dental treatments or want to schedule a dental consultation?
                </p>
                <a 
                  href="/dental-metrix#contact" 
                  className="inline-block px-4 py-2 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors text-sm"
                >
                  Contact Dental Metrix
                </a>
              </div>
              )}
              
              {brandMode !== 'dental' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-mudra-secondary mr-2" />
                  <h3 className="font-serif text-lg font-medium">Aesthetic Treatments</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Interested in our hair, skin, or body treatments? Get in touch with our aesthetic specialists.
                </p>
                <a 
                  href="/meditouch#contact" 
                  className="inline-block px-4 py-2 bg-mudra-secondary text-white rounded-md hover:bg-mudra-primary transition-colors text-sm"
                >
                  Contact Meditouch
                </a>
              </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
