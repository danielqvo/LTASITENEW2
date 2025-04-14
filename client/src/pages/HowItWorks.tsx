import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">How It Works</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Our streamlined certification process is designed to get you certified quickly and efficiently
            </p>
          </div>
        </section>
        
        {/* Certification Overview */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading">Certification in Your Hand in 2 Days</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-8">
                <p className="text-xl font-semibold text-primary-dark">1-Day Online Home-Study & 1-Day Instructor-Led Training</p>
              </div>
              <p className="text-lg mb-8">
                All our certification courses follow this same convenient two-part training format. Yes, that includes the Lifeguard, Lifeguard Instructor, Water Safety Swim Instructor, Water Safety Swim Instructor Trainer, CPR & First Instructor, and Certified Pool Operator (CPO) certification courses. CPR, First Aid, Oxygen Administrator, and recertification classes require even fewer training hours.
              </p>
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Our course consists of two parts</h3>
            </div>
            
            {/* Two-Part Format Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {/* Part 1 Box */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-primary-dark text-white p-4 text-center">
                  <h3 className="text-2xl font-bold">Part 1</h3>
                  <p className="text-lg">Home-Study Course</p>
                </div>
                <div className="p-6">
                  <p className="text-lg mb-6">
                    Complete your comprehensive, online Home-Study Course (textbooks, videos, and exams) in the comfort and convenience of your own home, while working at your own pace. Stop and start as often as you like.
                  </p>
                  <p className="text-xl font-semibold text-primary">Ultra-convenient!</p>
                </div>
              </div>
              
              {/* Part 2 Box */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-primary-dark text-white p-4 text-center">
                  <h3 className="text-2xl font-bold">Part 2</h3>
                  <p className="text-lg">Instructor-Led Training</p>
                </div>
                <div className="p-6">
                  <p className="text-lg mb-6">
                    After completing your Home-Study Course, participate in an instructor-led, physical skills training class near you. You can either use your own instructor or we'll connect you with a local instructor.
                  </p>
                  <p className="text-xl font-semibold text-primary">Super-easy!</p>
                </div>
              </div>
            </div>
            
            {/* Detailed Explanation */}
            <div className="bg-gray-50 p-8 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-primary-dark mb-6">How it works in detail</h3>
              <div className="space-y-4 text-lg">
                <p>
                  You can have your certification in your hand in as little as two days – one day online training, and one day instructor-led training.
                </p>
                <p>
                  All our certification courses follow this same convenient two-part training format. Yes, that includes the Lifeguard, Lifeguard Instructor, Water Safety Swim Instructor, Water Safety Swim Instructor Trainer, CPR & First Aid, CPR & First Instructor, and Certified Pool Operator (CPO) certification courses.
                </p>
                <p>
                  CPR, First Aid, and recertification classes require even fewer training hours.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading">Ready to Get Started?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Choose from our range of certification courses and begin your journey to becoming a certified lifeguard professional.
            </p>
            <Link href="/courses">
              <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-semibold text-lg transition duration-300 cursor-pointer">
                View All Courses
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;