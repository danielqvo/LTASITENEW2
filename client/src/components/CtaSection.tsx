import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section id="register" className="py-16 bg-primary text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 font-heading">Ready to Get Certified?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Join thousands of trained professionals who are making a difference in water safety and reducing heart attack deaths outside of hospitals across the nation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/course/lifeguard/lifeguard-swimming-pool">
            <Button variant="outline" className="bg-white text-primary-dark hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300">
              What Classes Are in My Area?
            </Button>
          </Link>
          <Link href="/contact-register">
            <Button className="bg-secondary hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
