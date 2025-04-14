import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Main Banner */}
        <section className="bg-primary-dark text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">About Us</h1>
              <p className="text-xl opacity-90">
                Learn about our mission, history, and our commitment to water safety
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="rounded-lg shadow-xl overflow-hidden">
                  <img 
                    src="https://i.imgur.com/RW8q7Tw.jpg" 
                    alt="Lifeguards training" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading">Our Mission</h2>
                <p className="text-lg leading-relaxed mb-6">
                  <span className="font-semibold text-red-700">Mission to Reduce Deaths by Drowning.</span> The United States has suffered a critical shortage of certified lifeguards and swim instructors for decades. As a result, many aquatic facilities go unsupervised by lifeguards and a frightening percentage of our population doesn't even learn to swim well enough to save their own life in an aquatic emergency. As a result, we suffer nearly 5,000 drowning deaths per year nationwide.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Lifeguard Training Academy is the world's largest provider of lifeguard certifications, proudly issuing over 250,000 certifications annually. With a long-standing reputation for excellence and reliability, we are the trusted partner of some of the most respected organizations across a wide range of industries. Our commitment to quality, safety, and education sets us apart in the lifeguarding field.
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
              </div>
            </div>
            
            {/* Organizations We Service */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading text-center">Organizations We Service</h2>
              <p className="text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-center">
                We are proud to serve organizations across the country and around the world, establishing ourselves as leaders in aquatic safety training and certification.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">U.S. Military & U.S. Space Force</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">United Nations Peacekeeping Forces</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">Boy Scouts of America (now known as "Scouting America")</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">Girl Scouts</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">Easter Seals</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">USA Swimming</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">YMCA Facilities and Youth Camps</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">Nation's Largest Swim Schools</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center text-center h-32">
                  <span className="font-medium text-lg">World Famous Resorts and Hotels</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg max-w-4xl mx-auto">
                <p className="text-lg leading-relaxed mb-6">
                  Our work with these prestigious organizations reflects our commitment to providing iron-clad liability protection and top-tier training. We collaborate closely with these leaders to ensure their teams are certified with the highest standards in lifeguard safety, allowing them to create safe and secure environments for their guests and staff.
                </p>
                
                <p className="text-lg leading-relaxed">
                  At Lifeguard Training Academy, we believe in the power of prevention. Through rigorous training and innovative solutions, we ensure that our clients receive the most comprehensive lifeguard certifications available. Whether you are part of a national organization, a local camp, or a major hotel chain, our certifications guarantee that your team is equipped to handle any water safety challenge.
                </p>
              </div>
            </div>
            
            {/* Employer Benefits */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading text-center">Benefits for Employers</h2>
              <p className="text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-center">
                We offer significant advantages and cost savings to organizations looking to certify their staff.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-tag text-primary text-2xl mr-3"></i>
                    <h3 className="font-semibold text-lg">Lowest Price Guarantee</h3>
                  </div>
                  <p className="text-lg">We offer the most competitive pricing on all our certifications, ensuring you get the best value for your investment.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-percentage text-primary text-2xl mr-3"></i>
                    <h3 className="font-semibold text-lg">Reduce Costs by Up to 85%</h3>
                  </div>
                  <p className="text-lg">We can make one of your staff an instructor, significantly reducing your certification costs by up to 85%.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-shield-alt text-primary text-2xl mr-3"></i>
                    <h3 className="font-semibold text-lg">Instructor Protection Guarantee</h3>
                  </div>
                  <p className="text-lg">Worried about investing in instructor training and then having them leave? If your instructor leaves the following year after certification, we'll make one of your staff members an instructor for free!</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-infinity text-primary text-2xl mr-3"></i>
                    <h3 className="font-semibold text-lg">Course Tickets Never Expire</h3>
                  </div>
                  <p className="text-lg">Our course tickets never expire, giving you flexibility in planning and scheduling training for your staff.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-redo text-primary text-2xl mr-3"></i>
                    <h3 className="font-semibold text-lg">No Penalty for Failed Courses</h3>
                  </div>
                  <p className="text-lg">If your candidate fails their course, you do not use up a ticket. We're committed to ensuring everyone succeeds.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-headset text-primary text-2xl mr-3"></i>
                    <h3 className="font-semibold text-lg">Extended Customer Support</h3>
                  </div>
                  <p className="text-lg">Customer service is available from 9am - 10pm EST, 7 days a week to answer any questions you may have.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading">Ready to Get Certified?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Join the thousands of professionals who trust Lifeguard Training Academy for their certification needs.
            </p>
            <Link href="/courses">
              <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-semibold text-lg transition duration-300 cursor-pointer">
                Explore Our Courses
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;