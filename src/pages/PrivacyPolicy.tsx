
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-serif font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                At Mudra Dental & Aesthetic Clinic, we are committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website or 
                become a patient at our clinic.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Information We Collect</h2>
              
              <p className="mb-4">
                We collect information that you provide directly to us, including:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Personal identification information (name, email address, phone number, etc.)</li>
                <li>Medical and dental history relevant to your treatment</li>
                <li>Financial information for payment processing</li>
                <li>Information you provide in forms, surveys, or other interactive features</li>
                <li>Records and copies of your correspondence with us</li>
              </ul>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">How We Use Your Information</h2>
              
              <p className="mb-4">
                We may use the information we collect from you for various purposes, including to:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send administrative information, such as appointment reminders</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about services, offers, promotions, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                <li>Fulfill any other purpose for which you provide it</li>
              </ul>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Disclosure of Your Information</h2>
              
              <p className="mb-4">
                We may disclose personal information that we collect or you provide as described in this privacy policy:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To our service providers and partners who perform services on our behalf</li>
                <li>To comply with any court order, law, or legal process</li>
                <li>To protect the rights, property, or safety of our patients, ourselves, or others</li>
                <li>With your consent or at your direction</li>
              </ul>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Data Security</h2>
              
              <p className="mb-4">
                We have implemented measures designed to secure your personal information from accidental loss and from 
                unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure 
                servers behind firewalls.
              </p>
              
              <h2 className="text-xl font-serif font-semibold mt-8 mb-4">Contact Information</h2>
              
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
