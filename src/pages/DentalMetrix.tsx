
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import ServiceCard from "../components/ServiceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";

const DentalMetrix = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dental Metrix
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced dental solutions with a focus on implants and cosmetic
            dentistry
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About Dental Metrix
                </h2>
                <p className="text-gray-600 mb-4">
                  Dental Metrix is a state-of-the-art dental clinic specializing
                  in advanced dental treatments including implants, cosmetic
                  dentistry, and oral surgery. Our mission is to provide
                  world-class dental care using the latest technology and
                  techniques.
                </p>
                <p className="text-gray-600 mb-4">
                  With over 15 years of experience, our team of specialists
                  ensures that each patient receives personalized care tailored
                  to their specific needs. We pride ourselves on creating
                  comfortable, pain-free experiences for all our patients.
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Why Choose Us?
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Internationally trained dental specialists</li>
                    <li>Advanced digital dentistry technology</li>
                    <li>Comprehensive treatment planning</li>
                    <li>Comfortable, modern facilities</li>
                    <li>Transparent pricing and payment options</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Make an Appointment
                </h3>
                <form>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>Dental Implants</option>
                        <option>Cosmetic Dentistry</option>
                        <option>Orthodontics</option>
                        <option>Oral Surgery</option>
                        <option>General Dentistry</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full">
                      Request Appointment
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="services">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Dental Implants"
                description="Permanent tooth replacement solutions that look, feel, and function like natural teeth. Includes single tooth implants, All-on-4, and implant-supported dentures."
                price="Starting from ₹35,000 per implant"
              />
              <ServiceCard
                title="Cosmetic Dentistry"
                description="Enhance your smile with our range of cosmetic procedures including veneers, teeth whitening, smile makeovers, and composite bonding."
                price="Starting from ₹15,000"
              />
              <ServiceCard
                title="Scaling and Polishing"
                description="A professional dental cleaning procedure where a dentist or hygienist removes plaque and tartar (calculus) from the teeth using specialized instruments, followed by polishing the tooth surfaces to remove stains and create a smooth finish."
                price="Starting from ₹60,000"
              />
              <ServiceCard
                title="Orthodontics"
                description="Straighten your teeth with modern orthodontic options including traditional braces, clear aligners, and Invisalign treatments."
                price="Starting from ₹50,000"
              />
              <ServiceCard
                title="Oral Surgery"
                description="Specialized surgical procedures including wisdom tooth extraction, bone grafting, sinus lifts, and corrective jaw surgery."
                price="Starting from ₹8,000"
              />
              <ServiceCard
                title="General Dentistry"
                description="Comprehensive dental care including check-ups, cleanings, fillings, root canals, crowns, and bridges to maintain optimal oral health."
                price="Starting from ₹1,500"
              />
            </div>
          </TabsContent>
          <TabsContent value="team">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Meet Our Specialists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-1">
                    Dr. Aditya Sharma
                  </h3>
                  <p className="text-gray-600 text-center mb-3">
                    Implantologist & Oral Surgeon
                  </p>
                  <p className="text-sm text-gray-600">
                    MDS (Oral Surgery), Fellowship in Implantology (Germany).
                    Over 12 years of experience specializing in dental implants
                    and complex oral surgeries.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-1">
                    Dr. Priya Mehta
                  </h3>
                  <p className="text-gray-600 text-center mb-3">
                    Cosmetic Dentist
                  </p>
                  <p className="text-sm text-gray-600">
                    MDS (Prosthodontics), Certification in Aesthetic Dentistry
                    (USA). Specialized in smile design, veneers, and full mouth
                    rehabilitation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-1">
                    Dr. Rahul Desai
                  </h3>
                  <p className="text-gray-600 text-center mb-3">
                    Orthodontist
                  </p>
                  <p className="text-sm text-gray-600">
                    MDS (Orthodontics), Fellowship in Invisible Orthodontics.
                    Expert in complex orthodontic cases and Invisalign
                    treatments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="technology">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Our Advanced Technology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Digital Scanning & 3D Printing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We utilize intraoral scanners to create precise digital
                    impressions, eliminating the need for uncomfortable
                    traditional impressions. Our in-house 3D printing capability
                    allows for same-day fabrication of surgical guides and
                    temporary restorations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Cone Beam CT (CBCT)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our advanced 3D imaging system provides detailed views of
                    your oral structures, allowing for precise treatment planning
                    for implants, extractions, and other complex procedures while
                    minimizing radiation exposure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Computer-Guided Implant Surgery
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Using specialized software and custom surgical guides, we can
                    place dental implants with exceptional precision and minimal
                    invasiveness, resulting in faster healing and better
                    outcomes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Digital Smile Design
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Advanced software that allows you to preview your new smile
                    before treatment begins. Our digital workflow ensures
                    predictable results that match your expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Patient Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Rajiv Malhotra
                  </h4>
                  <p className="text-sm text-gray-600">Dental Implant Patient</p>
                </div>
              </div>
              <div className="mb-2 flex">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-600">
                "After losing my front teeth in an accident, I was devastated.
                Dr. Sharma and the team at Dental Metrix restored my smile with
                implants that look completely natural. The entire process was
                smooth and much less painful than I expected."
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Anita Patel</h4>
                  <p className="text-sm text-gray-600">
                    Smile Makeover Patient
                  </p>
                </div>
              </div>
              <div className="mb-2 flex">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-600">
                "I had been self-conscious about my smile for years. After my
                veneers treatment at Dental Metrix, I can't stop smiling! Dr.
                Priya truly understood what I wanted and delivered results that
                exceeded my expectations."
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            International Patient Services
          </h2>
          <p className="text-gray-600 mb-6">
            At Dental Metrix, we welcome patients from around the world seeking
            high-quality dental care at competitive prices. Our international
            patient services include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Virtual Consultations
              </h3>
              <p className="text-sm text-gray-600">
                Initial assessment and treatment planning via video call
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Travel Assistance
              </h3>
              <p className="text-sm text-gray-600">
                Help with accommodation, local transportation, and tourism
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Language Support
              </h3>
              <p className="text-sm text-gray-600">
                Translation services available in multiple languages
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Accelerated Treatment
              </h3>
              <p className="text-sm text-gray-600">
                Optimized treatment schedules to minimize your stay
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="outline" className="mr-4">
              Download Patient Guide
            </Button>
            <Button>Contact International Desk</Button>
          </div>
        </section>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default DentalMetrix;
