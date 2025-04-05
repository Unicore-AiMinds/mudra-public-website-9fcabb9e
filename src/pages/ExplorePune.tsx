import React from "react";
import SectionNav from "../components/SectionNav";
import TravelCard from "../components/TravelCard";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { Image } from "lucide-react";

const ExplorePune = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Explore Pune
        </h1>

        <SectionNav
          sections={[
            { id: "accommodation", label: "Accommodation" },
            { id: "restaurants", label: "Restaurants" },
            { id: "attractions", label: "Attractions" },
            { id: "transportation", label: "Transportation" },
          ]}
          backTo={{
            path: "/",
            label: "Home"
          }}
        />

        <section id="accommodation" className="py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Accommodation Near Clinic
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  JW Marriott
                </h3>
                <p className="text-gray-600 mb-4">
                  Luxury accommodation with excellent amenities, just 2km from
                  our clinic.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    ₹12,000/night
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    5.0 ★
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hotel Blue Diamond
                </h3>
                <p className="text-gray-600 mb-4">
                  Comfortable 4-star hotel with modern amenities, 3km from our
                  clinic.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    ₹8,000/night
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    4.5 ★
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Novotel Pune
                </h3>
                <p className="text-gray-600 mb-4">
                  Business hotel with comfortable rooms, located 4km from our
                  clinic.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    ₹6,500/night
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    4.2 ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="restaurants" className="py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Culinary Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Shivaji Military Hotel
                </h3>
                <p className="text-gray-600 mb-4">
                  Famous for traditional Maharashtrian cuisine with a focus on
                  meat specialties.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">₹500-800</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    4.7 ★
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Malaka Spice
                </h3>
                <p className="text-gray-600 mb-4">
                  Award-winning pan-Asian cuisine in a beautiful outdoor setting.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    ₹1,500-2,000
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    4.6 ★
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  German Bakery
                </h3>
                <p className="text-gray-600 mb-4">
                  Iconic cafe with international cuisine and famous for fresh
                  baked goods.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">₹600-900</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    4.4 ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="attractions" className="py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Must-Visit Attractions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TravelCard
              name="Shaniwar Wada"
              description="Historic fortification in the city of Pune, built in 1732 as the seat of the Peshwas."
              cost="Entry: ₹200"
              rating="4.5 ★"
            />
            <TravelCard
              name="Aga Khan Palace"
              description="Built by Sultan Muhammed Shah Aga Khan III in 1892, this palace holds historical significance."
              cost="Entry: ₹150"
              rating="4.6 ★"
            />
            <TravelCard
              name="Dagdusheth Halwai Ganpati Temple"
              description="One of the most visited Ganesh temples in Maharashtra, known for its grand celebrations."
              cost="Free entry"
              rating="4.8 ★"
            />
          </div>
        </section>

        <section id="transportation" className="py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Getting Around Pune
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Private Taxi Services"
              description="Convenient door-to-door service. Recommended for patients after procedures."
              icon={null}
            />
            <ServiceCard
              title="Ola & Uber"
              description="Readily available ride-sharing services throughout the city."
              icon={null}
            />
            <ServiceCard
              title="Auto Rickshaws"
              description="Affordable option for shorter distances within the city."
              icon={null}
            />
          </div>
        </section>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ExplorePune;
