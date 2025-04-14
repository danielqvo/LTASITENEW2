import React from "react";
import { Link } from "wouter";
import { PhoneNumberCanvas, EmailAddressCanvas } from "@/components/ContactCanvas";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:pr-12">
            <h3 className="text-xl font-bold mb-4 font-heading">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-blue-300"></i>
                <a href="tel:+19548005068">
                  <PhoneNumberCanvas />
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-blue-300"></i>
                <a href="mailto:Contact@LifeguardTrainingAcademy.org">
                  <EmailAddressCanvas />
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-3 text-blue-300"></i>
                <span>Serving all 50 States</span>
              </li>
            </ul>

          </div>
          
          {/* Quick Links */}
          <div className="md:ml-8">
            <h3 className="text-xl font-bold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-300 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-300 transition">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-300 transition">How It Works</Link></li>
              <li><Link href="/courses" className="hover:text-blue-300 transition">Courses</Link></li>
              <li><Link href="/faq" className="hover:text-blue-300 transition">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-blue-300 transition">Blog</Link></li>
              <li><Link href="/contact-register" className="hover:text-blue-300 transition">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Courses */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Popular Courses</h3>
            <ul className="space-y-2">
              <li><Link href="/course/lifeguard/lifeguard-swimming-pool" className="hover:text-blue-300 transition">Lifeguard</Link></li>
              <li><Link href="/course/lifeguard-instructor/lifeguard-instructor" className="hover:text-blue-300 transition">Lifeguard Instructor</Link></li>
              <li><Link href="/course/swim-instructor/water-safety-swim-instructor" className="hover:text-blue-300 transition">Water Safety Swim Instructor</Link></li>
              <li><Link href="/course/swim-instructor/water-safety-swim-instructor-trainer" className="hover:text-blue-300 transition">Water Safety Swim Instructor Trainer</Link></li>
              <li><Link href="/course/cpr/cpr-first-aid" className="hover:text-blue-300 transition">CPR & First Aid</Link></li>
              <li><Link href="/course/cpr/cpr-first-aid-instructor" className="hover:text-blue-300 transition">CPR & First Aid Instructor</Link></li>
              <li><Link href="/course/pool-operator/certified-pool-operator" className="hover:text-blue-300 transition">Certified Pool Operator</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Lifeguard Training Academy. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm hover:text-blue-300 transition mr-4">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm hover:text-blue-300 transition mr-4">Terms of Service</Link>
            <Link href="/sitemap" className="text-sm hover:text-blue-300 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
