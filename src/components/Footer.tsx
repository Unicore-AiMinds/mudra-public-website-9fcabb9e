import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink, Instagram } from 'lucide-react';
interface FooterProps {
  theme?: 'mudra' | 'meditouch';
}

const Footer = ({ theme = 'mudra' }: FooterProps) => {
  const year = new Date().getFullYear();
  const brandMode = import.meta.env.VITE_BRAND_MODE;
  const instagramUrl = brandMode === 'dental' ? 'https://www.instagram.com/drbhargavikolhapure/' : 
                       brandMode === 'meditouch' ? 'https://www.instagram.com/meditouch_clinic/' : 
                       'https://www.instagram.com/drbhargavikolhapure/';
  const googleMapsUrl = brandMode === 'dental' ? 'https://maps.app.goo.gl/dUmLox99GnmX9mgT9' : 
                        'https://maps.google.com/maps?q=Manas+Apartment,+1st+Floor,+Lakaki+Road,+Opp.+Hotel+Ambience,+Model+Colony,+Shivajinagar,+Pune+411+016';
  return <footer className={`py-12 border-t ${theme === 'meditouch' ? 'bg-gradient-to-b from-white to-meditouch-primary/5 border-meditouch-primary/20' : 'bg-white border-gray-100'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Clinic Info */}
          <div className="text-center md:text-left">
            <h3 className={`font-serif text-lg font-medium mb-4 ${
              theme === 'meditouch' ? 'text-meditouch-primary' : 'text-mudra-primary'
            }`}>{
              brandMode === 'dental' ? 'Dental Metrix Clinic' :
              brandMode === 'meditouch' ? 'Meditouch Clinic' :
              'Mudra Dental & Aesthetic Clinic'
            }</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p className="flex items-start justify-center md:justify-start">
                <MapPin className={`mr-2 h-5 w-5 mt-0.5 flex-shrink-0 ${
                  theme === 'meditouch' ? 'text-meditouch-primary' : 'text-mudra-primary'
                }`} />
                <span>
                  Manas Apartment, 1st Floor, Lakaki Road,<br />
                  Opp. Hotel Ambience, Model Colony,<br />
                  Shivajinagar, Pune 411 016
                </span>
              </p>
              <div className="flex items-center justify-center md:justify-start">
                <Phone className={`mr-2 h-5 w-5 flex-shrink-0 ${
                  theme === 'meditouch' ? 'text-meditouch-primary' : 'text-mudra-primary'
                }`} />
                <div>
                  {brandMode !== 'meditouch' && (
                    <p><span className="font-medium">Dental Metrix:</span> <a href="tel:+919152951573" className="footer-link">91529 51573</a></p>
                  )}
                  {brandMode !== 'dental' && (
                    <p><span className="font-medium">Meditouch:</span> <a href="tel:+919112957369" className="footer-link">91129 57369</a></p>
                  )}
                  {!brandMode && (
                    <>
                      <p><span className="font-medium">Dental Metrix:</span> <a href="tel:+919152951573" className="footer-link">91529 51573</a></p>
                      <p><span className="font-medium">Meditouch:</span> <a href="tel:+919112957369" className="footer-link">91129 57369</a></p>
                    </>
                  )}
                </div>
              </div>
              <p className="flex items-center justify-center md:justify-start">
                <Clock className={`mr-2 h-5 w-5 flex-shrink-0 ${
                  theme === 'meditouch' ? 'text-meditouch-primary' : 'text-mudra-primary'
                }`} />
                <span>Mon - Sat: 10:00 am - 7:00 pm</span>
              </p>
              <p className="flex items-center justify-center md:justify-start mt-1">
                <ExternalLink className={`mr-2 h-5 w-5 flex-shrink-0 ${
                  theme === 'meditouch' ? 'text-meditouch-primary' : 'text-mudra-primary'
                }`} />
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                  View on Google Maps
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className={`font-serif text-lg font-medium mb-4 ${
              theme === 'meditouch' ? 'text-meditouch-primary' : 'text-mudra-primary'
            }`}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              {brandMode !== 'meditouch' && (
                <li>
                  <Link to="/dental-metrix" className="footer-link">Dental Metrix</Link>
                </li>
              )}
              {brandMode !== 'dental' && (
                <li>
                  <Link to="/meditouch" className="footer-link">Meditouch</Link>
                </li>
              )}
              {!brandMode && (
                <>
                  <li>
                    <Link to="/dental-metrix" className="footer-link">Dental Metrix</Link>
                  </li>
                  <li>
                    <Link to="/meditouch" className="footer-link">Meditouch</Link>
                  </li>
                </>
              )}
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

          {/* Social Media */}
          <div className="text-center">
            <h3 className={`font-serif text-lg font-medium mb-4 ${
              theme === 'meditouch' ? 'text-meditouch-primary' : 'text-mudra-primary'
            }`}>Connect With Us</h3>
            <div className="flex justify-center">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`text-gray-600 transition-colors ${
                theme === 'meditouch' ? 'hover:text-meditouch-secondary' : 'hover:text-mudra-primary'
              }`}>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>© {year} {
            brandMode === 'dental' ? 'Dental Metrix Clinic' :
            'Meditouch Clinic'
          }. All Rights Reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;