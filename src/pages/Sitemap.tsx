
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Sitemap = () => {
  const pages = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Dental Metrix', path: '/dental-metrix' },
        { name: 'Meditouch', path: '/meditouch' },
        { name: 'Explore Pune', path: '/explore-pune' },
        { name: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Legal & Information',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Sitemap', path: '/sitemap' },
      ],
    },
    {
      title: 'Sections',
      links: [
        { name: 'About Dental Metrix', path: '/dental-metrix#about' },
        { name: 'Dental Services', path: '/dental-metrix#services' },
        { name: 'Dental Testimonials', path: '/dental-metrix#testimonials' },
        { name: 'Dental Contact', path: '/dental-metrix#contact' },
        { name: 'About Meditouch', path: '/meditouch#about' },
        { name: 'Aesthetic Services', path: '/meditouch#services' },
        { name: 'Aesthetic Testimonials', path: '/meditouch#testimonials' },
        { name: 'Aesthetic Contact', path: '/meditouch#contact' },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-serif font-bold mb-4">Sitemap</h1>
              <p className="text-gray-600">
                Find all pages and sections of the Mudra Dental & Aesthetic Clinic website.
              </p>
              <div className="w-20 h-1 bg-mudra-accent mx-auto mt-6"></div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {pages.map((section, index) => (
                <div key={index} className={index > 0 ? 'mt-8 pt-8 border-t border-gray-100' : ''}>
                  <h2 className="text-xl font-serif font-semibold mb-4 text-mudra-primary">{section.title}</h2>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          to={link.path} 
                          className="text-gray-700 hover:text-mudra-primary transition-colors flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-mudra-accent rounded-full mr-2"></span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;
