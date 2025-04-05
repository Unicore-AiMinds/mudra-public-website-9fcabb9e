import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink, Instagram, Facebook, Twitter } from 'lucide-react';
const Footer = () => {
  const year = new Date().getFullYear();
  return <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Clinic Info */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-mudra-primary">Mudra Dental & Aesthetic Clinic</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-mudra-primary mt-0.5 flex-shrink-0" />
                <span>
                  Manas Apartment, 1st Floor, Lakaki Road, Opp. Hotel Ambience, Model Colony, Shivajinagar, Pune 411 016
                </span>
              </p>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-mudra-primary flex-shrink-0" />
                <div>
                  <p><span className="font-medium">Dental Metrix:</span> <a href="tel:+919152951573" className="footer-link">91529 51573</a></p>
                  <p><span className="font-medium">Meditouch:</span> <a href="tel:+919112957369" className="footer-link">91129 57369</a></p>
                </div>
              </div>
              <p className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-mudra-primary flex-shrink-0" />
                <a href="mailto:info@mudraclinicpune.com" className="footer-link">
                  info@mudraclinicpune.com
                </a>
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-mudra-primary flex-shrink-0" />
                <span>Mon - Sat: 10:00 am - 7:00 pm</span>
              </p>
              <p className="flex items-center mt-1">
                <ExternalLink className="mr-2 h-5 w-5 text-mudra-primary flex-shrink-0" />
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  View on Google Maps
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-mudra-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/dental-metrix" className="footer-link">Dental Metrix</Link>
              </li>
              <li>
                <Link to="/meditouch" className="footer-link">Meditouch</Link>
              </li>
              <li>
                <Link to="/explore-pune" className="footer-link">Explore Pune</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
              </li>
              <li>
                <Link to="/sitemap" className="footer-link">Sitemap</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links & Social Media */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-mudra-primary">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mudra-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mudra-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mudra-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              
              <div className="flex items-center space-x-4">
                {/* Placeholder for certification logos */}
                
                
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-mudra-primary">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for health tips and clinic updates.</p>
            <form className="space-y-2">
              <input type="email" placeholder="Your email address" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mudra-primary" required />
              <button type="submit" className="w-full px-4 py-2 bg-mudra-primary text-white rounded-md hover:bg-mudra-secondary transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>© {year} Mudra Dental & Aesthetic Clinic. All Rights Reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;