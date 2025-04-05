
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-serif font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                These Terms of Service govern your use of the website operated by Mudra Dental & Aesthetic Clinic and 
                the services provided by our clinic. By accessing our website or utilizing our services, you acknowledge 
                and agree to these terms.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Website Use</h2>
              
              <p className="mb-4">
                The content of the pages of this website is for your general information and use only. It is subject to 
                change without notice. This website uses cookies to monitor browsing preferences.
              </p>
              
              <p className="mb-4">
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, 
                performance, completeness or suitability of the information and materials found or offered on this website 
                for any particular purpose. You acknowledge that such information and materials may contain inaccuracies 
                or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent 
                permitted by law.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Medical Disclaimer</h2>
              
              <p className="mb-4">
                The information provided on our website is designed to complement, not replace, the relationship between 
                a patient and their healthcare provider.
              </p>
              
              <p className="mb-4">
                <strong>The medical and dental information provided is for general educational purposes only.</strong> It 
                is not intended nor implied to be a substitute for professional medical advice. Always seek the advice of 
                your physician, dentist, or other qualified healthcare provider with any questions regarding a medical 
                condition or treatment, and never disregard professional medical advice or delay seeking it because of 
                something you have read on this website.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Treatment Results</h2>
              
              <p className="mb-4">
                The dental and aesthetic treatments described on this website have been shown to be effective for many 
                patients. However, no treatment can guarantee results for all patients. Individual results may vary.
              </p>
              
              <p className="mb-4">
                Any testimonials or before-and-after images displayed on our website represent individual cases and do not 
                guarantee that you will get the same or similar results.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Appointments and Cancellations</h2>
              
              <p className="mb-4">
                By scheduling an appointment with Mudra Dental & Aesthetic Clinic, you agree to our appointment and 
                cancellation policies. We require at least 24 hours' notice for cancellations to avoid a cancellation fee.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Limitation of Liability</h2>
              
              <p className="mb-4">
                Your use of any information or materials on this website is entirely at your own risk, for which we shall 
                not be liable. It shall be your own responsibility to ensure that any products, services or information 
                available through this website meet your specific requirements.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Contact Information</h2>
              
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              
              <div className="p-4 bg-gray-50 rounded-md mb-4">
                <p>Mudra Dental & Aesthetic Clinic</p>
                <p>Email: info@mudraclinicpune.com</p>
                <p>Phone: 91529 51573 / 91129 57369</p>
              </div>
              
              <p className="mt-8 text-sm text-gray-500">
                Last updated: April 5, 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
