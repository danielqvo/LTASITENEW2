import React from "react";
import { Link } from "wouter";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://i.imgur.com/RW8q7Tw.jpg" 
                alt="Happy certified lifeguards in training" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading">About Us</h2>
            <p className="text-lg leading-relaxed mb-8">
              <span className="font-semibold text-red-700">Mission to Reduce Deaths by Drowning.</span> The United States has suffered a critical shortage of certified lifeguards and swim instructors for decades. As a result, many aquatic facilities go unsupervised by lifeguards and a frightening percentage of our population doesn't even learn to swim well enough to save their own life in an aquatic emergency. As a result, we suffer nearly 5,000 drowning deaths per year nationwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-medal text-primary text-2xl mr-3"></i>
                  <h3 className="font-semibold text-lg">Professional Training</h3>
                </div>
                <p>Industry-leading certification programs that meet all national standards</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-globe-americas text-primary text-2xl mr-3"></i>
                  <h3 className="font-semibold text-lg">Nationwide Service</h3>
                </div>
                <p>Available in all 50 states and 46 countries around the world</p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/about">
                <span className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer">
                  Learn more about our mission and clients we service
                  <i className="fas fa-arrow-right ml-2"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
