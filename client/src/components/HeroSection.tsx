import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative py-32 md:py-40 text-white bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: "url('https://i.imgur.com/Or0oYz8.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      {/* Overlay to make text more readable */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="container relative mx-auto px-6 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading leading-tight">
          Lifeguard Certification Courses
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Join the family of over 300,000 Lifeguards certified each year in the USA.
          Serving all 50 States and 46 different countries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#courses">
            <Button className="bg-secondary hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 w-full sm:w-auto">
              Explore Courses
            </Button>
          </Link>
          <Link href="/contact-register">
            <Button variant="outline" className="bg-white hover:bg-gray-100 text-primary-dark font-semibold py-3 px-8 rounded-lg transition duration-300 w-full sm:w-auto">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
