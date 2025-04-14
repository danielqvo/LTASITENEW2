import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ScoutingAmericaLifeguardPro() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="w-full flex justify-center p-4 bg-blue-50">
            <img 
              src="https://i.imgur.com/iHIZXKx.png" 
              alt="Scouting America Lifeguard Pro Partnership" 
              className="max-w-full h-auto rounded-lg shadow-md" 
            />
          </div>
          
          {/* Content Section */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6">
              Attention Scouting America Members!
            </h1>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Lifeguard-Pro is thrilled to announce an exclusive new promotion for all members of Scouting America (formerly Boy Scouts of America (BSA)!
              </p>
              
              <p className="text-lg mb-6">
                To help you conveniently get your BSA Lifeguard Training and other necessary safety certification courses, we're offering incredible benefits to help you meet your training needs:
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  Training by Scouting America Instructors
                </h2>
                <p className="mb-6">
                  Learn from your fellow Scouting America members, the people who best understand your needs and goals.
                </p>
                
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  Training at Your Facility
                </h2>
                <p className="mb-6">
                  Super-flexible training schedules. Scouting America certified instructors will go to your facility to training your group on the date you reserve!
                </p>
                
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  Fully Satisfies Scouting America Requirements
                </h2>
                <p className="mb-6">
                  Who better understands your training needs and goals than your fellow Scouting America members? Rest assured that your safety training meets all Scouting America requirements because it is being designed and provided by Scouting America certified safety instructors.
                </p>
                
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  Unbeatable Scouting America Discount
                </h2>
                <p>
                  As a Scouting America member, you are entitled to the nationally discounted Scouting America course prices — guaranteed lowest price!
                </p>
              </div>
              
              <p className="text-xl font-bold text-center mb-4">
                Scouts, don't miss out!
              </p>
              
              <p className="text-xl text-center mb-8">
                Take advantage of this amazing offer!
              </p>
            </div>
            
            {/* Call to Action Button */}
            <div className="flex justify-center mt-8">
              <Link href="/contact-register">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-8 rounded-md text-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105">
                  Contact Us/Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}