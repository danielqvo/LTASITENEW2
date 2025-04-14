import React from "react";
import { useParams, useLocation, Link } from "wouter";
import { courseCategories } from "@shared/courseData";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone } from "lucide-react";

const CategoryDetail: React.FC = () => {
  const params = useParams<{ category: string }>();
  const [_, setLocation] = useLocation();
  
  // Find the category
  const category = courseCategories.find(cat => cat.id === params.category);
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-primary-dark mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The course category you are looking for doesn't exist.</p>
            <Button onClick={() => setLocation("/courses")} className="w-full">
              View All Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-6 py-4">
          <nav className="flex text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-primary">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/courses" className="text-gray-600 hover:text-primary">
                    <span>Courses</span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-primary">{category.title.replace(' Certification Courses', '')}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Hero Section */}
        {category.id === 'cpr' || category.id === 'cpr-instructor' ? (
          // Special layout for CPR categories with SVG icons
          <div className={`${category.iconBgColor} py-20 text-white`}>
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-10 md:mb-0 flex justify-center">
                  <div className="bg-white p-0 rounded-full shadow-lg overflow-hidden w-52 h-52 relative">
                    <img src={category.icon} alt={category.title} className="w-full h-full object-cover absolute inset-0" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h1 className="text-4xl font-bold mb-4 font-heading text-white">
                    {category.title}
                  </h1>
                  <p className="text-xl mb-6 text-white">
                    Professional training programs to advance your career and help create safer environments.
                  </p>
                  <p className="text-lg mb-6 text-white">
                    Each of our {category.title.toLowerCase()} is designed to meet industry standards and provide comprehensive preparation for real-world situations.
                  </p>
                  <Button 
                    onClick={() => setLocation("/courses")}
                    className="bg-white text-primary hover:bg-gray-100 font-semibold py-2 px-6 rounded-md transition duration-300"
                  >
                    View All Categories
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Standard layout for categories with image backgrounds
          <div className="relative py-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              {category.icon.startsWith('http') ? (
                <div 
                  className="w-full h-full bg-center bg-cover"
                  style={{ 
                    backgroundImage: `url(${category.icon})`,
                    filter: 'brightness(0.6)',
                    backgroundPosition: 'center 30%'
                  }}
                />
              ) : category.icon.startsWith('/src/assets') ? (
                <div className={`w-full h-full ${category.iconBgColor} flex items-center justify-center`}>
                  <img src={category.icon} alt={category.title} className="w-32 h-32 object-contain opacity-50" />
                </div>
              ) : (
                <div className={`w-full h-full ${category.iconBgColor} flex items-center justify-center`}>
                  <i className={`fas ${category.icon} text-white text-8xl opacity-50`}></i>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
              <div className="md:w-2/3 mx-auto text-white text-center">
                <h1 className="text-4xl font-bold mb-4 font-heading text-shadow">
                  {category.title}
                </h1>
                <p className="text-xl mb-6 text-shadow">
                  Professional training programs to advance your lifeguarding career and help create safer aquatic environments.
                </p>
                <p className="text-lg mb-8 text-shadow">
                  Each of our {category.title.toLowerCase()} is designed to meet industry standards and provide comprehensive preparation for real-world situations.
                </p>
                <Button 
                  onClick={() => setLocation("/courses")}
                  className="bg-white text-primary hover:bg-gray-100 font-semibold py-2 px-6 rounded-md transition duration-300"
                >
                  View All Categories
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Course Listings */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-primary-dark mb-8 font-heading">Available Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.courses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className={`${category.iconBgColor} h-4 flex items-center justify-center`}>
                  <div className="h-1 bg-white w-16 opacity-30 rounded-full"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className={`p-3 rounded-full ${category.iconBgColor} mr-4 flex-shrink-0 w-12 h-12 relative overflow-hidden`}>
                      {category.icon.startsWith('http') || category.icon.startsWith('/src/assets') ? (
                        <img src={category.icon} alt={category.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <i className={`fas ${category.icon} text-white text-xl`}></i>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-primary-dark">{course.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 min-h-[80px]">
                    {course.description || 
                      `Our ${course.title} program provides comprehensive training designed to equip participants with the necessary skills and knowledge to ensure water safety in various environments.`}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <span className="text-sm font-medium bg-gray-100 text-gray-800 py-1 px-3 rounded-full">Professional Certification</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.id.includes('recert') ? 'Renewal Course' : 'Full Certification'}
                    </div>
                  </div>
                  
                  <Link href={`/course/${category.id}/${course.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded transition duration-300">
                      View Course Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional Information Section */}
        {category.id !== 'cpr' && category.id !== 'cpr-instructor' && category.id !== 'swim-instructor' && (
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold text-primary-dark mb-6 font-heading">Why Choose Our {category.title.replace(' Certification Courses', '')} Programs?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <p className="text-gray-700"><span className="font-semibold">Nationally Recognized:</span> Our certifications are accepted across all 50 states</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <p className="text-gray-700"><span className="font-semibold">Experienced Instructors:</span> Learn from professionals with extensive field experience</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <p className="text-gray-700"><span className="font-semibold">Comprehensive Training:</span> Covers all required skills with hands-on practice</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <p className="text-gray-700"><span className="font-semibold">Flexible Scheduling:</span> Multiple course dates to fit your availability</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <p className="text-gray-700"><span className="font-semibold">Post-Course Support:</span> Ongoing resources and job placement assistance</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-primary-dark mb-6 font-heading">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">How long are these certifications valid?</h3>
                    <p className="text-gray-600">Most of our {category.title.toLowerCase()} are valid for 2 years from the date of completion. After this period, you'll need to take a renewal/recertification course to maintain your credentials.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What are the prerequisites for these courses?</h3>
                    <p className="text-gray-600">Prerequisites vary by course. Basic requirements often include minimum age requirements and passing a swimming skills assessment for water-based certifications. Specific prerequisites are listed on individual course pages.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you offer group discounts?</h3>
                    <p className="text-gray-600">Yes, we offer special rates for groups of 5 or more participants. Contact our team at +1-954-800-5068 for more information about group registrations and pricing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Help Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-3xl font-bold text-primary-dark mb-4 font-heading text-center">
                Need Help Choosing?
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-center">
                Our team is here to help you select the perfect course for your career goals and requirements.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center w-full md:w-auto">
                  <Phone className="h-10 w-10 text-primary mb-2" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-3 text-center">Speak directly with an account representative</p>
                  <a href="tel:+19548005068" className="text-primary font-bold text-lg hover:underline">
                    +1-954-800-5068
                  </a>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full md:w-auto">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Schedule an Appointment</h3>
                  <p className="text-gray-600 mb-4 text-center">
                    Book a consultation and mention "I'm interested in {category.title}" in the notes.
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;