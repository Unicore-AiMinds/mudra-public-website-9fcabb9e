
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

const queryClient = new QueryClient();
const brandMode = import.meta.env.VITE_BRAND_MODE;

const App = () => {
  // Update favicon based on brand mode
  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      if (brandMode === 'meditouch') {
        favicon.href = '/meditouch-favicon.png';
      } else if (brandMode === 'dental') {
        favicon.href = '/dental-metrix-favicon.png';
      }
    }
  }, []);

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
