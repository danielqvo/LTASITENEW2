import React, { useState, useEffect, useRef } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneNumberCanvas } from "@/components/ContactCanvas";
import CustomerServiceImage from "@/components/CustomerServiceImage";
import { FaPhoneAlt, FaUserFriends, FaTag, FaClock, FaTimes } from "react-icons/fa";

export default function IndividualPricing() {
  const [options, setOptions] = useState({
    lowestPriceGuarantee: false,
    specialDiscounts: false
  });
  
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);
  const [showPricing, setShowPricing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopupCta, setShowPopupCta] = useState(false);
  const popupTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if we're currently in business hours (9am to 10pm EST, 7 days a week)
  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      // Convert to EST (UTC-5)
      const estOffset = -5;
      const utcOffset = now.getTimezoneOffset() / 60;
      const estHour = (now.getHours() + utcOffset + estOffset + 24) % 24;
      
      // Open between 9am and 10pm EST
      setIsOpen(estHour >= 9 && estHour < 22);
    };
    
    checkIfOpen();
    // Update every minute
    const interval = setInterval(checkIfOpen, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Setup popup timer - appears after 30 seconds of inactivity
  useEffect(() => {
    // Check if already shown in this session
    const hasShownPopup = sessionStorage.getItem('hasShownPopupCta') === 'true';
    
    // Don't setup timer if already shown
    if (hasShownPopup) {
      return;
    }
    
    // Setup popup timer function
    const setupTimer = () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      
      popupTimerRef.current = setTimeout(() => {
        setShowPopupCta(true);
        sessionStorage.setItem('hasShownPopupCta', 'true');
      }, 30000); // 30 seconds
    };
    
    // Initial timer setup
    setupTimer();
    
    // User activity handler
    const handleUserActivity = () => {
      // Only reset if popup hasn't been shown yet
      if (!hasShownPopup) {
        setupTimer();
      }
    };
    
    // Add event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    
    // Cleanup
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    };
  }, []);
  
  // Handle checkbox option changes
  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };
  
  // Handle view pricing button click
  const handleViewPricing = () => {
    const accordionsToExpand = [];
    if (options.lowestPriceGuarantee) accordionsToExpand.push("lowest-price");
    if (options.specialDiscounts) accordionsToExpand.push("special-discounts");
    
    setExpandedAccordions(accordionsToExpand);
    setShowPricing(true);
    
    // Scroll to the pricing section
    setTimeout(() => {
      const pricingSection = document.getElementById("pricing-section");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  
  // Close popup handler
  const handleClosePopup = () => {
    setShowPopupCta(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Individual Pricing</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select your preferences below to view our certification course pricing
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto mb-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Pricing Options</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="special-discounts" 
                  checked={options.specialDiscounts}
                  onCheckedChange={() => handleOptionChange('specialDiscounts')}
                />
                <div>
                  <label 
                    htmlFor="special-discounts" 
                    className="font-medium text-lg cursor-pointer"
                  >
                    Special Discounts
                  </label>
                  <p className="text-gray-500 text-sm">
                    Ask your account specialist which unpublished special discounts you qualify for e.g., Our huge off-season promotion up to 50% off, half price instructor trainer, buy 1 get 1 free lifeguard instructor.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="lowest-price" 
                  checked={options.lowestPriceGuarantee}
                  onCheckedChange={() => handleOptionChange('lowestPriceGuarantee')}
                />
                <div>
                  <label 
                    htmlFor="lowest-price" 
                    className="font-medium text-lg cursor-pointer"
                  >
                    Lowest Price Guarantee!
                  </label>
                  <p className="text-gray-500 text-sm">
                    Found a lower price elsewhere? Send us the link, and we'll beat it by 25%! We're committed to offering the most affordable and high-quality certifications.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                onClick={handleViewPricing}
                size="lg" 
                className="w-full md:w-auto"
              >
                View Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {showPricing && (
        <div id="pricing-section" className="mb-16">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <Accordion 
              type="multiple" 
              value={expandedAccordions}
              onValueChange={setExpandedAccordions}
              className="mb-8"
            >
              <AccordionItem value="lowest-price">
                <AccordionTrigger className="text-xl font-semibold">
                  Lowest Price Guarantee!
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 bg-white rounded-md">
                    <h3 className="font-bold text-xl mb-3">YOU REQUEST OUR LOWEST PRICE GUARANTEE</h3>
                    <h4 className="font-semibold mb-3">(Found a lower price elsewhere? Send us the link, and we'll beat it by 25%!)</h4>
                    
                    <p className="mb-4">
                      Our Lowest Price Guarantee option ensures that you will always get the lowest price in your area.
                    </p>
                    
                    <p className="mb-4">
                      With our Lowest Price Guarantee, you will only pay 75% of the lowest priced similar safety training course in your local area.
                    </p>
                    
                    <p className="mb-4">
                      Requesting your Lowest Price Guarantee from Lifeguard Training Academy is simple. Just email your request to us with the link to our competitor's publicly advertised course. It's that easy!
                    </p>
                    
                    <p className="mb-4">
                      Lifeguard Training Academy promises the highest quality safety training at the Lowest Price Guaranteed.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-md mb-4">
                      <h4 className="font-bold mb-2">Our competitor's course that you are requesting us to price-match must be:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>In compliance with nationally recognized certification training standards.</li>
                        <li>The same exact course as the Lifeguard Training Academy course; and,</li>
                        <li>Available to the general public.</li>
                      </ul>
                    </div>
                    
                    <p className="font-medium text-primary-dark">
                      We have no doubt that once you upgrade to Lifeguard Training Academy, you'll discover why so many of your peers happily choose Lifeguard Training Academy.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="special-discounts">
                <AccordionTrigger className="text-xl font-semibold">
                  Special Discounts
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 bg-white rounded-md">
                    <h3 className="font-bold text-xl mb-3">UNPUBLISHED SPECIAL DISCOUNTS</h3>
                    <h4 className="font-semibold mb-3">(Ask your account specialist which unpublished special discounts you qualify for)</h4>
                    <p className="mb-4 font-medium">
                      Only an Account Specialist can Get These Discounts for You
                    </p>
                    
                    <p className="mb-4">
                      We have many seasonal, temporary, target market, geographic, charitable, and other discounts available to you. Some include our huge off-season promotion up to 50% off, half price instructor trainer, buy 1 get 1 free lifeguard instructor, and more. Only Account Specialists can access these unpublished special discounts which are not published on our website. Some of these unpublished special discounts include:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Holiday</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Military</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Educators</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Public Schools</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Healthcare Workers</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• First Responders / Emergency Workers</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Family</span> (multiple candidates from the same family with the same last name who purchase at the same time)
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Police & Firefighters</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Charities</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Target Market Areas</span> (geographic locations)
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Target Market Industries</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• Economic Hardship</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <span className="font-bold">• More</span>
                      </div>
                    </div>
                    
                    <p className="font-medium text-primary-dark">
                      Talk to an Account Specialist to ensure you get all the unpublished special discounts for which you qualify.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Certification Course Pricing</h2>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 bg-blue-700 text-white py-3 px-4 rounded-t-lg">
                LIFEGUARD CERTIFICATION COURSES
              </h3>
              <p className="bg-blue-50 p-4 text-center mb-6">
                These prices are for individuals seeking a certification course for themselves.
                <a href="/employer-instructor-pricing" className="text-blue-600 hover:underline ml-2">
                  Employers & Instructors seeking group pricing should click here: GROUP PRICES
                </a>
              </p>
              
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Junior Lifeguard</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$125.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Shallow Pool Lifeguard (max depth 5 ft.)</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$399.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Shallow Pool Lifeguard (max depth 5 ft.)+ Youth Camp</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$399.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Swimming Pool Lifeguard (max depth 12 ft.)</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$449.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Swimming Pool Lifeguard (max depth 12 ft.) + Youth Camp</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$449.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Deep Pool Lifeguard (max depth 20 ft.)</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$479.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Deep Pool Lifeguard (max depth 20 ft.) + Youth Camp</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$479.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Waterfront Lifeguard</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$479.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Waterfront Lifeguard + Youth Camp</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$479.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Park Lifeguard</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$479.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Park Lifeguard + Youth Camp</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$479.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Lifeguard with All Specialities</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$479.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Lifeguard Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard, BLS CPR with AED, and First Aid.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Lifeguard Instructor</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$499.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard Instructor, and BLS CPR with AED & First Aid Instructor.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Lifeguard Instructor Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard Instructor, and BLS CPR with AED & First Aid Instructor.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Lifeguard Instructor Trainer</h4>
                      <p className="text-sm text-gray-600">(pre-requisite Lifeguard Instructor)</p>
                      <p className="text-2xl font-bold text-blue-700 my-2">$499.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard Instructor Trainer, and BLS CPR with AED & First Aid Instructor Trainer.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Lifeguard Instructor Trainer Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>All-Inclusive course. Includes online Home-Study Course, Instructor-Led Training, all course required textbooks, videos, exams, forms, and certifications for Lifeguard Instructor Trainer, and BLS CPR with AED & First Aid Instructor Trainer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 bg-blue-700 text-white py-3 px-4 rounded-t-lg">
                WATER SAFETY SWIM INSTRUCTOR CERTIFICATION COURSES
              </h3>
              <p className="bg-blue-50 p-4 text-center mb-6">
                These prices are for individuals seeking a certification course for themselves.
                <a href="/employer-instructor-pricing" className="text-blue-600 hover:underline ml-2">
                  Employers & Instructors seeking group pricing should click here: GROUP PRICES
                </a>
              </p>
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Basic Water Safety</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This certification course often chosen by adults who do not intend to work as a professional rescuer, but desire or need basic water safety training to protect the children or individuals whom they are supervising. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required materials, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Basic Water Safety Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This certification course often chosen by adults who do not intend to work as a professional rescuer, but desire or need basic water safety training to protect the children or individuals whom they are supervising. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required materials, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Safety Swim Instructor</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$499.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This course is chosen by individuals seeking to become a certified swim instructor. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Safety Swim Instructor Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This course is chosen by individuals seeking to renew their certified swim instructor certification. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Safety Swim Instructor Trainer</h4>
                      <p className="text-sm text-gray-600">(pre-requisite Water Safety Swim Instructor)</p>
                      <p className="text-2xl font-bold text-blue-700 my-2">$499.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This course is chosen by individuals seeking to become a certified swim instructor trainer authorized to certify Water Safety Swim Instructors. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Safety Swim Instructor Trainer Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This course is chosen by individuals seeking to renew their Water Safety Swim Instructor Trainer certification. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Safety Swim Instructor Trainer Director</h4>
                      <p className="text-sm text-gray-600">(pre-requisite Water Safety Swim Instructor Trainer)</p>
                      <p className="text-2xl font-bold text-blue-700 my-2">$499.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This course is chosen by individuals seeking to become a certified swim instructor trainer director authorized to certify Water Safety Swim Instructor Trainers. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Water Safety Swim Instructor Trainer Director Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This course is chosen by individuals seeking to renew their Water Safety Swim Instructor Trainer Director certification. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 bg-blue-700 text-white py-3 px-4 rounded-t-lg">
                CPR & FIRST AID CERTIFICATION COURSES
              </h3>
              <p className="bg-blue-50 p-4 text-center mb-6">
                These prices are for individuals seeking a certification course for themselves.
                <a href="/employer-instructor-pricing" className="text-blue-600 hover:underline ml-2">
                  Employers & Instructors seeking group pricing should click here: GROUP PRICES
                </a>
              </p>
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">BLS CPR for Healthcare Provider</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$99.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This CPR certification course is usually chosen by healthcare professionals (i.e., doctors, nurses, paramedics, EMT, lifeguards, and first responders. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">CPR Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$99.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This CPR certification course is usually chosen by healthcare professionals (i.e., doctors, nurses, paramedics, EMT, lifeguards, and first responders seeking to renew their CPR certification. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">First Aid</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$99.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive First Aid course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">First Aid Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$99.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive First Aid recertification / renewal course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">BLS CPR for Healthcare Provider & First Aid</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$119.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This CPR & First Aid certification course is usually chosen by healthcare professionals (i.e., doctors, nurses, paramedics, EMT, lifeguards, and first responders. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">BLS CPR for Healthcare Provider & First Aid Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$119.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive CPR & First Aid Recertification / Renewal course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">BLS CPR for Healthcare Provider & First Aid Instructor</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$299.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This CPR & First Aid Instructor course authorizes an individual to certify candidates in CPR and First Aid. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">BLS CPR for Healthcare Provider & First Aid Instructor Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive CPR & First Aid Instructor Recertification / Renewal course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">BLS CPR for Healthcare Provider & First Aid Instructor Trainer</h4>
                      <p className="text-sm text-gray-600">(pre-requisite BLS CPR & First Aid Instructor)</p>
                      <p className="text-2xl font-bold text-blue-700 my-2">$299.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This CPR & First Aid Instructor Trainer course authorizes an individual to certify candidates as CPR and First Aid Instructors. This all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">BLS CPR for Healthcare Provider & First Aid Instructor Trainer Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive CPR & First Aid Instructor Trainer Recertification / Renewal course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Bloodborne Pathogens</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$99.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive Bloodborne Pathogens certification course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Oxygen Administer</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$99.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive Oxygen Administer certification course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Oxygen Administer Instructor</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$299.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive Oxygen Administer Instructor certification course authorizes individuals to certify Oxygen Administers. this all-inclusive course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Oxygen Administrator Instructor Recertification / Renewal</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$199.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This all-inclusive Oxygen Administer Instructor Recertification / Renewal course includes online Home-Study Course, Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification card.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 bg-blue-700 text-white py-3 px-4 rounded-t-lg">
                CERTIFIED POOL OPERATOR (CPO) CERTIFICATION COURSE
              </h3>
              <p className="bg-blue-50 p-4 text-center mb-6">
                These prices are for individuals seeking a certification course for themselves.
                <a href="/employer-instructor-pricing" className="text-blue-600 hover:underline ml-2">
                  Employers & Instructors seeking group pricing should click here: GROUP PRICES
                </a>
              </p>
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-6 md:w-1/2">
                      <h4 className="text-xl font-bold">Certified Pool Operator (CPO)</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">$365.00</p>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <p>This is an entirely online certification course for individuals seeking to earn the nationally recognized Certified Pool Operator (CPO) certification. This all-inclusive course includes all course required materials for certification.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CTA Section */}
      <div className="max-w-5xl mx-auto mt-16 mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-16 -translate-y-16 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 transform -translate-x-16 translate-y-16 bg-blue-300 rounded-full opacity-20"></div>
        
        <div className="relative p-8 md:p-12">
          {/* Mobile-optimized layout for open indicator */}
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div className="inline-block bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-md transform -rotate-2">
              <FaTag className="inline-block mr-2" /> New Customer Special Offer!
            </div>
            
            {isOpen && (
              <div className="bg-green-500 text-white px-4 py-2 rounded-full animate-pulse flex items-center mt-2 md:mt-0">
                <FaClock className="mr-2" /> Open Now!
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                You May Qualify for $100 OR MORE OFF Your First Certification!
              </h2>
              
              <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-6 backdrop-blur-sm">
                <p className="text-white text-lg">
                  First-time customers in select areas are eligible for special regional pricing. 
                  Call now to see if you qualify for up to $100 or more off your certification!
                </p>
              </div>
              
              <div className="space-y-4 text-white">
                <div className="flex items-center">
                  <div className="bg-yellow-400 text-blue-900 rounded-full p-2 mr-3">
                    <FaTag className="text-xl" />
                  </div>
                  <span className="text-lg">Special regional discounts available right now</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-400 text-blue-900 rounded-full p-2 mr-3">
                    <FaUserFriends className="text-xl" />
                  </div>
                  <span className="text-lg">Personalized guidance from our certification experts</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-400 text-blue-900 rounded-full p-2 mr-3">
                    <FaClock className="text-xl" />
                  </div>
                  <span className="text-lg">Extended hours: 9AM-10PM EST, 7 days a week</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg px-8 py-6 transition-transform transform hover:scale-105">
                  Call Now To Get Your Discount!
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-xs transform transition-transform hover:scale-105">
                <div className="bg-blue-700 text-white py-3 px-4 rounded-t-lg -mt-6 -mx-6 mb-4">
                  <h3 className="text-xl font-bold">Call Us Now</h3>
                  {isOpen && <p className="text-green-300 text-sm font-semibold">We're Open!</p>}
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute -top-12 -right-12 bg-yellow-400 text-blue-900 w-28 h-28 rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
                    <div className="transform -rotate-12">
                      <p className="font-bold text-lg leading-tight">Save</p>
                      <p className="font-bold text-xl">$100+</p>
                      <p className="text-xs font-semibold">OR MORE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-3">
                    <CustomerServiceImage size="medium" />
                  </div>
                  
                  <p className="text-gray-700 mb-2 font-medium">Call us directly at:</p>
                  <div className="flex justify-center mb-2">
                    <PhoneNumberCanvas className="h-8" color="#1d4ed8" />
                  </div>
                </div>
                
                <div className="bg-blue-50 py-2 px-3 rounded-md">
                  <p className="text-blue-800 font-medium">
                    Open 7 Days a Week <br/>
                    9AM - 10PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup CTA - Displays after 30 seconds of inactivity */}
      {showPopupCta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-up">
            <button 
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors z-10"
              aria-label="Close"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="bg-blue-700 text-white p-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 transform translate-x-16 -translate-y-8 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute left-0 bottom-0 w-24 h-24 transform -translate-x-8 translate-y-8 bg-blue-500 rounded-full opacity-20"></div>
              
              <div className="relative z-10">
                <div className="inline-block bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded-md mb-2 transform -rotate-2">
                  <FaTag className="inline-block mr-1" /> Limited Time Offer!
                </div>
                <h2 className="text-2xl font-bold mb-2">Save $100 OR MORE On Your Certification!</h2>
                <p className="text-sm opacity-90">
                  First-time customers in select areas get special regional pricing. Call now to check your eligibility!
                </p>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-center mb-4">
                <CustomerServiceImage size="small" />
              </div>
                
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-gray-700 mb-1 font-medium text-center">Call us now at:</p>
                <div className="flex justify-center mb-1">
                  <PhoneNumberCanvas className="h-7" color="#1d4ed8" />
                </div>
                {isOpen && (
                  <p className="text-green-600 text-sm font-semibold mt-1 flex items-center justify-center">
                    <FaClock className="mr-1" /> We're Open Now!
                  </p>
                )}
              </div>
              
              <div className="mt-4">
                <Button 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3"
                  onClick={handleClosePopup}
                >
                  Call Now For Your Discount
                </Button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Limited time offer. Restrictions may apply. Call for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}