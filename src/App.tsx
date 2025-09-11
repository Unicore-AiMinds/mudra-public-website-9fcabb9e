
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import DentalMetrix from "./pages/DentalMetrix";
import Meditouch from "./pages/Meditouch";
import ExplorePune from "./pages/ExplorePune";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDentalData from "./pages/AdminDentalData";
import AdminAestheticData from "./pages/AdminAestheticData";

const queryClient = new QueryClient();
const brandMode = import.meta.env.VITE_BRAND_MODE;

const App = () => {
  // Update favicon, title, and meta tags based on brand mode
  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      if (brandMode === 'meditouch') {
        favicon.href = '/meditouch-favicon.png';
      } else if (brandMode === 'dental') {
        favicon.href = '/dental-metrix-favicon.png';
      }
    }

    // Update document title and meta tags based on brand mode
    if (brandMode === 'dental') {
      document.title = 'Dental Metrix - Advanced Dental Care in Pune';
      updateMetaTag('description', 'Dental Metrix - Advanced dental and implant solutions in Pune, India. Specialized in precision dentistry and smile restoration.');
      updateMetaTag('og:title', 'Dental Metrix - Advanced Dental Care in Pune');
      updateMetaTag('og:description', 'Dental Metrix - Advanced dental and implant solutions in Pune, India. Specialized in precision dentistry and smile restoration.');
    } else if (brandMode === 'meditouch') {
      document.title = 'Meditouch - Aesthetic & Wellness Clinic in Pune';
      updateMetaTag('description', 'Meditouch - Premium aesthetic and wellness treatments in Pune, India. Specialized in beauty enhancement and wellness solutions.');
      updateMetaTag('og:title', 'Meditouch - Aesthetic & Wellness Clinic in Pune');
      updateMetaTag('og:description', 'Meditouch - Premium aesthetic and wellness treatments in Pune, India. Specialized in beauty enhancement and wellness solutions.');
    } else {
      document.title = 'Mudra Dental & Aesthetic Clinic';
      updateMetaTag('description', 'Mudra Dental & Aesthetic Clinic - Specialized dental and aesthetic services in Pune, India');
      updateMetaTag('og:title', 'Mudra Dental & Aesthetic Clinic');
      updateMetaTag('og:description', 'Mudra Dental & Aesthetic Clinic - Specialized dental and aesthetic services in Pune, India');
    }
  }, []);

  const updateMetaTag = (name: string, content: string) => {
    let metaTag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
    if (metaTag) {
      metaTag.setAttribute('content', content);
    }
  };

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route 
            path="/" 
            element={
              brandMode === 'dental' ? <DentalMetrix /> :
              brandMode === 'meditouch' ? <Meditouch /> :
              <Index />
            } 
          />
          <Route 
            path="/dental-metrix" 
            element={brandMode === 'meditouch' ? <Navigate to="/" replace /> : <DentalMetrix />} 
          />
          <Route 
            path="/meditouch" 
            element={brandMode === 'dental' ? <Navigate to="/" replace /> : <Meditouch />} 
          />
          <Route path="/explore-pune" element={<ExplorePune />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="dental" element={<AdminDentalData />} />
            <Route path="aesthetic" element={<AdminAestheticData />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
