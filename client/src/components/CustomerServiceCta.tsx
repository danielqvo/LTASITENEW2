import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { FaPhone, FaComments, FaCalendarAlt } from 'react-icons/fa';
import CustomerServiceImage from '@/components/CustomerServiceImage';
import { PhoneNumberCanvas } from '@/components/ContactCanvas';

const CustomerServiceCta: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <CustomerServiceImage size="large" />
            </div>
            
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Chat with a Friendly Customer Service Representative
              </h2>
              
              <p className="text-gray-600 mb-6">
                Have questions about our courses or need help finding the right certification? 
                Our friendly team is here to help you every step of the way.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact-register" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <FaComments className="mr-2" />
                      <span>Live Chat</span>
                    </Button>
                  </Link>
                  
                  <Link href="tel:+19548005068" className="flex-1">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      <FaPhone className="mr-2" />
                      <span>Call Us</span>
                    </Button>
                  </Link>
                  
                  <Link href="/contact-register" className="flex-1">
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      <FaCalendarAlt className="mr-2" />
                      <span>Book Consultation</span>
                    </Button>
                  </Link>
                </div>
                
                <div className="flex justify-center items-center text-sm text-gray-500 pt-2">
                  <span className="mr-2">Call us directly:</span>
                  <PhoneNumberCanvas className="h-7" color="#0f172a" fontSize={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerServiceCta;