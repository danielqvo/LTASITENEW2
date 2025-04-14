import React from "react";
import { Link } from "wouter";
import { courseCategories } from "@shared/courseData";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CourseSelection() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-dark mb-4 font-heading">Select Your Course</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our comprehensive selection of certification courses designed to meet your professional lifeguarding needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courseCategories.map((category) => (
            <div key={category.id} className="group cursor-pointer" onClick={(e) => {
              // If the category has courses, link to the first course
              if (category.courses && category.courses.length > 0) {
                window.location.href = `/course/${category.id}/${category.courses[0].id}`;
              } else {
                window.location.href = `/category/${category.id}`;
              }
            }}>
              <CourseCard category={category} />
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-lg p-8 mb-16 shadow-md">
          <h2 className="text-3xl font-bold text-primary-dark mb-4 font-heading text-center">
            Not Sure Which Course You Need?
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            We understand that choosing the right certification can be challenging. Our account representatives are here to help guide you toward the perfect course for your needs and career goals.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-full md:w-auto">
              <Phone className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-3 text-center">Speak directly with an account representative</p>
              <a href="tel:+19548005068" className="text-primary font-bold text-lg hover:underline">
                +1-954-800-5068
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Schedule an Appointment</h3>
              <p className="text-gray-600 mb-4 text-center">
                Book a consultation and mention "I'm not sure what course I need" in the notes.
              </p>
              <Link href="/contact-register">
                <Button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded transition duration-300">
                  Schedule Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}