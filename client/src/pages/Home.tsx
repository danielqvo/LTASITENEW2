import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import CtaSection from "@/components/CtaSection";
import CustomerServiceCta from "@/components/CustomerServiceCta";
import TestimonialsSection from "@/components/TestimonialsSection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <CtaSection />
        <CustomerServiceCta />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
