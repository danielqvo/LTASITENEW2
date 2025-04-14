import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import { courseCategories } from "@shared/courseData";

const CoursesSection: React.FC = () => {
  return (
    <section id="courses" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark font-heading mb-4">Explore Our Courses</h2>
          <p className="text-lg max-w-3xl mx-auto">Find the perfect certification program to advance your lifeguarding career and help create safer aquatic environments</p>
        </div>
        
        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courseCategories.map((category) => (
            <CourseCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/courses">
            <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-2 rounded-md font-semibold transition duration-300 hover:scale-105">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
