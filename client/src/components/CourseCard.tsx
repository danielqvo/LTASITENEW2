import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CourseCategory } from "@shared/courseData";

interface CourseCardProps {
  category: CourseCategory;
}

const CourseCard: React.FC<CourseCardProps> = ({ category }) => {
  const { id, title, icon, iconBgColor, courses } = category;
  
  // Set a minimum height for the courses list to ensure button alignment
  const minListHeight = 230; // Adjust this value as needed
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className={`h-32 ${iconBgColor} relative overflow-hidden`}>
        {icon.startsWith('http') || icon.startsWith('/src/assets') ? (
          <img src={icon} alt={title} className="w-full h-full object-cover absolute inset-0" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <i className={`fas ${icon} text-white text-5xl`}></i>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-1 text-primary-dark font-heading">
            {title.replace(' Certification Courses', '')}
          </h3>
          <h3 className="text-xl font-bold mb-4 text-primary-dark font-heading">Certification Courses</h3>
        </div>
        
        <ul className="space-y-2" style={{ minHeight: `${minListHeight}px` }}>
          {courses.map((course) => (
            <li key={course.id} className="flex items-start mb-3">
              <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
              <div>
                <Link href={`/course/${id}/${course.id}`}>
                  <span className="text-primary hover:text-primary-dark hover:underline cursor-pointer font-medium">
                    {course.title}
                  </span>
                </Link>
                {course.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description.split('.')[0]}.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto pt-4">
          <Link href={`/category/${id}`}>
            <Button className="block text-center bg-primary hover:bg-primary-dark text-white py-2 rounded transition duration-300 w-full">
              View {title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
