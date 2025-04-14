import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Main Banner */}
        <section className="bg-primary-dark text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Blog</h1>
              <p className="text-xl opacity-90">
                Stay updated with the latest in water safety and lifeguard training
              </p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-primary">Coming Soon!</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our blog is currently under construction. We're working on bringing you valuable content
              about water safety, lifeguard training, and certification information.
            </p>
            <p className="text-md text-gray-600">
              Please check back soon for updates and educational articles.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;