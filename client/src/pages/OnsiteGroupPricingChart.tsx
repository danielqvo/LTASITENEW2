import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaPhoneAlt, FaClock, FaTimes, FaCheck, FaLightbulb, FaMapMarked, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import { PhoneNumberCanvas } from "@/components/ContactCanvas";
import CustomerServiceImage from "@/components/CustomerServiceImage";

export default function OnsiteGroupPricingChart() {
  // Get the location to parse query parameters
  const [location] = useLocation();
  
  // State for business hours and popup
  const [isOpen, setIsOpen] = useState(false);
  const [showPopupCta, setShowPopupCta] = useState(false);
  
  // Determine if we're in business hours (9AM-10PM EST, 7 days a week)
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      // Convert to EST/EDT
      const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const hours = estTime.getHours();
      // Open between 9AM and 10PM EST
      setIsOpen(hours >= 9 && hours < 22);
    };
    
    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Set up popup timer after 30 seconds
  useEffect(() => {
    // Check if popup has been shown before in this session
    const hasShownPopup = sessionStorage.getItem('onsite_pricing_popup_shown');
    
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopupCta(true);
        sessionStorage.setItem('onsite_pricing_popup_shown', 'true');
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Close popup handler
  const handleClosePopup = () => {
    setShowPopupCta(false);
  };
  
  // Parse URL parameters to determine which discount options were selected
  const queryString = window.location.search;
  console.log('Query string:', queryString);
  
  const params = new URLSearchParams(queryString);
  console.log('URL params:', {
    inflation: params.get('inflation'),
    lowest: params.get('lowest'),
    special: params.get('special')
  });
  
  // Only consider explicitly "false" as false, any other value including null is considered true
  const inflationBuster = params.get('inflation') !== 'false' && params.get('inflation') !== null;
  const lowestPrice = params.get('lowest') !== 'false' && params.get('lowest') !== null;
  const specialDiscount = params.get('special') !== 'false' && params.get('special') !== null;
  
  // State for tracking which accordion items are open - all open by default
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([
    "special-discounts", "lowest-price", "inflation-buster"
  ]);
  
  console.log('Parsed options:', { inflationBuster, lowestPrice, specialDiscount });
  
  // Always show the accordion, but with clear visual indicators of which option is selected
  const showDiscountOptions = true;
  console.log('Should show accordion:', showDiscountOptions);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Onsite Group Training Pricing Chart</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          When you hire a Lifeguard Training Academy Instructor to teach your group at your facility on the date you reserve.
        </p>
        

      </div>
      
      {/* Pricing Options Accordion */}
      {showDiscountOptions && (
        <div className="bg-gray-50 p-8 rounded-lg mb-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-3">Our Pricing Options</h2>
            <p className="text-gray-600">
              Click on any option below to learn more about our special discounts and pricing guarantees.
            </p>
          </div>
          <Accordion 
            type="multiple" 
            value={openAccordionItems}
            onValueChange={setOpenAccordionItems}
            className="mb-4 border border-blue-100 rounded-md overflow-hidden"
          >
            {/* Special Discounts - First */}
            <AccordionItem value="special-discounts" className={specialDiscount ? "bg-blue-50 border-l-4 border-blue-500" : ""}>
              <AccordionTrigger className={`text-xl font-semibold ${specialDiscount ? "text-blue-700" : ""} px-4 py-3 hover:bg-blue-50`}>
                <div className="flex items-center gap-2">
                  {specialDiscount && <CheckCircle className="h-5 w-5 text-blue-500" />}
                  <span>Special Discounts</span>
                  {specialDiscount && <Badge className="ml-2 bg-blue-600">Selected</Badge>}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 bg-white rounded-md">
                  <h3 className="font-bold text-xl mb-3">UNPUBLISHED SPECIAL DISCOUNTS</h3>
                  <h4 className="font-semibold mb-3">(Talk to an Account Specialist for Details)</h4>
                  <p className="mb-4 font-medium">
                    Only an Account Specialist can Get These Discounts for You
                  </p>
                  
                  <p className="mb-4">
                    We have many seasonal, temporary, target market, geographic, charitable, and other discounts available to you. Only Account Specialists can access these unpublished special discounts which are not published on our website. Some of these unpublished special discounts include:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Holiday</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Military</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Schools</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Public Organizations</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• HOAs & Property Management</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Returning Customers</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Large Groups</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Multi-Year Contracts</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Charities</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-bold">• Geographic Location</span>
                    </div>
                  </div>
                  
                  <p className="font-medium text-primary-dark">
                    Talk to an Account Specialist to ensure you get all the unpublished special discounts for which your organization qualifies.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Lowest Price Guarantee - Second */}
            <AccordionItem value="lowest-price" className={lowestPrice ? "bg-blue-50 border-l-4 border-blue-500" : ""}>
              <AccordionTrigger className={`text-xl font-semibold ${lowestPrice ? "text-blue-700" : ""} px-4 py-3 hover:bg-blue-50`}>
                <div className="flex items-center gap-2">
                  {lowestPrice && <CheckCircle className="h-5 w-5 text-blue-500" />}
                  <span>Lowest Price Guarantee</span>
                  {lowestPrice && <Badge className="ml-2 bg-blue-600">Selected</Badge>}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 bg-white rounded-md">
                  <h3 className="font-bold text-xl mb-3">YOU REQUEST OUR LOWEST PRICE GUARANTEE</h3>
                  <h4 className="font-semibold mb-3">(Send Us a Link to a Lower Price, We Cut it by 25% More)</h4>
                  
                  <p className="mb-4">
                    Our Lowest Price Guarantee option ensures that you will always get the lowest price in your area.
                  </p>
                  
                  <p className="mb-4">
                    With our Lowest Price Guarantee, you will only pay 75% of the lowest priced similar safety training course in your local area.
                  </p>
                  
                  <p className="mb-4">
                    Requesting your Lowest Price Guarantee from Lifeguard Training Academy is simple. Just email your request to us with the link to our competitor's publicly advertised course. It's that easy!
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
                    We have no doubt that once you upgrade to Lifeguard Training Academy, you'll discover why so many organizations choose us for their lifeguard certification needs.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Inflation Buster Discount - Third */}
            <AccordionItem value="inflation-buster" className={inflationBuster ? "bg-blue-50 border-l-4 border-blue-500" : ""}>
              <AccordionTrigger className={`text-xl font-semibold ${inflationBuster ? "text-blue-700" : ""} px-4 py-3 hover:bg-blue-50`}>
                <div className="flex items-center gap-2">
                  {inflationBuster && <CheckCircle className="h-5 w-5 text-blue-500" />}
                  <span>Inflation Buster Discount</span>
                  {inflationBuster && <Badge className="ml-2 bg-blue-600">Selected</Badge>}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 bg-white rounded-md">
                  <h3 className="font-bold text-xl mb-3">YOU REQUEST OUR INFLATION BUSTER DISCOUNT PRICING</h3>
                  <h4 className="font-semibold mb-3">(Pay 90% of What You Paid Last Year When You Recertify)</h4>
                  
                  <p className="mb-4">
                    Our Inflation Buster Discount Pricing allows you to save money year after year on recertifications.
                  </p>
                  
                  <p className="mb-4">
                    With our Inflation Buster Discount, you will pay just 90% of what you paid last year when you recertify. This is one of our most popular discount options for organizations that recertify multiple staff members each year.
                  </p>
                  
                  <p className="mb-4">
                    Requesting your Inflation Buster Discount from Lifeguard Training Academy is simple. Just email your request to us with your previous year's invoice number or receipt.
                  </p>
                  
                  <p className="font-medium text-primary-dark">
                    This discount option allows you to lock in long-term savings and protects you against price increases.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      <div className="max-w-6xl mx-auto mb-12">
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-xl font-bold">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">
              We train your group at your facility on the date you reserve. If you don't have your own instructor, we can send a highly-experienced Lifeguard Training Academy instructor to your facility to train your staff on the date you reserve.
            </p>
            <p className="mb-4 font-medium">
              Maximum Convenience. We take all the worries and stress out of certifying your group. You select the training location, date, and time… We do the rest!
            </p>
            
            <div className="bg-yellow-50 p-5 rounded-lg mt-4 mb-6">
              <h3 className="font-bold mb-2">How It Works:</h3>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Select the safety courses you need for your staff training.</li>
                <li>Tell us how many staff you have for each selected course.</li>
                <li>Give us the location, date, and time.</li>
                <li>We'll confirm your reservation.</li>
                <li>Then, we'll send you the usernames and passwords (tickets) for your staff to be able to login and immediately begin their preparatory online Home-Study Courses.</li>
                <li>On the day of your training reservation, our highly-trained Lifeguard Training Academy instructor(s) will arrive at your facility and handle all your training and certification services.</li>
              </ol>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="font-bold mb-2">NOTICE:</p>
              <p className="mb-2">This table displays the per candidate, all-inclusive certification course prices.</p>
              <p className="mb-2">Specifically, these prices include the Home-Study Course, plus the Instructor-Led Training Class, all course required textbooks, videos, exams, forms, and certification cards. Everything you need for certification!</p>
              
              <p className="mt-4"><strong>Pricing Example #1:</strong> If you buy 11 tickets for Swimming Pool Lifeguard (max depth 12′), your price is $329.00 per candidate.</p>
              
              <p className="mt-2"><strong>Pricing Example #2:</strong> If you buy 27 tickets for Waterfront Lifeguard + Youth Camp, your price is $299.00 per candidate.</p>
            </div>
          </CardContent>
        </Card>

        {/* Lifeguard Certification Courses Pricing Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Lifeguard Certification Courses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left border-b font-semibold">Course Name</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">1-4 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">5-9 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">10-24 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">25-49 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">50-99 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Junior Lifeguard</td>
                  <td className="py-2 px-4 border-b text-center">$125.00</td>
                  <td className="py-2 px-4 border-b text-center">$115.00</td>
                  <td className="py-2 px-4 border-b text-center">$105.00</td>
                  <td className="py-2 px-4 border-b text-center">$95.00</td>
                  <td className="py-2 px-4 border-b text-center">$85.00</td>
                  <td className="py-2 px-4 border-b text-center">$75.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Shallow Pool Lifeguard (max depth 5')</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$319.00</td>
                  <td className="py-2 px-4 border-b text-center">$269.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Shallow Pool + Youth Camp Lifeguard (max depth 5')</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$319.00</td>
                  <td className="py-2 px-4 border-b text-center">$269.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Swimming Pool Lifeguard (max depth 12')</td>
                  <td className="py-2 px-4 border-b text-center">$449.00</td>
                  <td className="py-2 px-4 border-b text-center">$379.00</td>
                  <td className="py-2 px-4 border-b text-center">$329.00</td>
                  <td className="py-2 px-4 border-b text-center">$289.00</td>
                  <td className="py-2 px-4 border-b text-center">$239.00</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Swimming Pool + Youth Camp Lifeguard (max depth 12')</td>
                  <td className="py-2 px-4 border-b text-center">$449.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Deep Pool Lifeguard (max depth 20')</td>
                  <td className="py-2 px-4 border-b text-center">$479.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Deep Pool + Youth Camp Lifeguard (max depth 20')</td>
                  <td className="py-2 px-4 border-b text-center">$479.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Waterfront Lifeguard / Beach Lifeguard</td>
                  <td className="py-2 px-4 border-b text-center">$479.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Waterfront + Youth Camp Lifeguard</td>
                  <td className="py-2 px-4 border-b text-center">$479.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Park Lifeguard</td>
                  <td className="py-2 px-4 border-b text-center">$479.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Park + Youth Camp Lifeguard</td>
                  <td className="py-2 px-4 border-b text-center">$479.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">All Specialties Lifeguard</td>
                  <td className="py-2 px-4 border-b text-center">$479.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                  <td className="py-2 px-4 border-b text-center">$209.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Lifeguard Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Lifeguard Instructor</td>
                  <td className="py-2 px-4 border-b text-center">$499.00</td>
                  <td className="py-2 px-4 border-b text-center">$449.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Lifeguard Instructor Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Lifeguard Instructor Trainer (pre-requisite Lifeguard Instructor)</td>
                  <td className="py-2 px-4 border-b text-center">$499.00</td>
                  <td className="py-2 px-4 border-b text-center">$449.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Lifeguard Instructor Trainer Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-gray-700 font-medium">1 Ticket = 1 Course Participant</p>
        </div>
        
        {/* Water Safety Swim Instructor Courses Pricing Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Water Safety Swim Instructor Courses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left border-b font-semibold">Course Name</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">1-4 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">5-9 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">10-24 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">25-49 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">50-99 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Basic Water Safety</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Basic Water Safety Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Safety Swim Instructor</td>
                  <td className="py-2 px-4 border-b text-center">$499.00</td>
                  <td className="py-2 px-4 border-b text-center">$449.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Safety Swim Instructor Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Safety Swim Instructor Trainer (pre-requisite Swim Instructor)</td>
                  <td className="py-2 px-4 border-b text-center">$499.00</td>
                  <td className="py-2 px-4 border-b text-center">$449.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Safety Swim Instructor Trainer Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Safety Swim Instructor Trainer Director (pre-requisite Water Safety Swim Instructor Trainer)</td>
                  <td className="py-2 px-4 border-b text-center">$499.00</td>
                  <td className="py-2 px-4 border-b text-center">$449.00</td>
                  <td className="py-2 px-4 border-b text-center">$399.00</td>
                  <td className="py-2 px-4 border-b text-center">$349.00</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Water Safety Swim Instructor Trainer Director Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* CPR & First Aid Courses Pricing Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">CPR & First Aid Courses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left border-b font-semibold">Course Name</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">1-4 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">5-9 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">10-24 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">25-49 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">50-99 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR BLS for Healthcare Provider (Adult, Child & Infant with AED)</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                  <td className="py-2 px-4 border-b text-center">$59.00</td>
                  <td className="py-2 px-4 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                  <td className="py-2 px-4 border-b text-center">$59.00</td>
                  <td className="py-2 px-4 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">First Aid</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                  <td className="py-2 px-4 border-b text-center">$59.00</td>
                  <td className="py-2 px-4 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">First Aid Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                  <td className="py-2 px-4 border-b text-center">$59.00</td>
                  <td className="py-2 px-4 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR BLS for Healthcare Provider & First Aid</td>
                  <td className="py-2 px-4 border-b text-center">$119.00</td>
                  <td className="py-2 px-4 border-b text-center">$109.00</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR BLS for Healthcare Provider & First Aid Recertification</td>
                  <td className="py-2 px-4 border-b text-center">$119.00</td>
                  <td className="py-2 px-4 border-b text-center">$109.00</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR BLS for Healthcare Provider & First Aid Instructor</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$289.00</td>
                  <td className="py-2 px-4 border-b text-center">$279.00</td>
                  <td className="py-2 px-4 border-b text-center">$269.00</td>
                  <td className="py-2 px-4 border-b text-center">$259.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR BLS for Healthcare Provider & First Aid Instructor Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR BLS for Healthcare Provider & First Aid Instructor Trainer (pre-requisite CPR & First Aid Instructor)</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$289.00</td>
                  <td className="py-2 px-4 border-b text-center">$279.00</td>
                  <td className="py-2 px-4 border-b text-center">$269.00</td>
                  <td className="py-2 px-4 border-b text-center">$259.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">CPR BLS for Healthcare Provider & First Aid Instructor Trainer Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$199.00</td>
                  <td className="py-2 px-4 border-b text-center">$189.00</td>
                  <td className="py-2 px-4 border-b text-center">$179.00</td>
                  <td className="py-2 px-4 border-b text-center">$169.00</td>
                  <td className="py-2 px-4 border-b text-center">$159.00</td>
                  <td className="py-2 px-4 border-b text-center">$149.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Bloodborne Pathogens</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                  <td className="py-2 px-4 border-b text-center">$59.00</td>
                  <td className="py-2 px-4 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Oxygen Administrator</td>
                  <td className="py-2 px-4 border-b text-center">$99.00</td>
                  <td className="py-2 px-4 border-b text-center">$89.00</td>
                  <td className="py-2 px-4 border-b text-center">$79.00</td>
                  <td className="py-2 px-4 border-b text-center">$69.00</td>
                  <td className="py-2 px-4 border-b text-center">$59.00</td>
                  <td className="py-2 px-4 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Oxygen Administrator Instructor</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$289.00</td>
                  <td className="py-2 px-4 border-b text-center">$279.00</td>
                  <td className="py-2 px-4 border-b text-center">$269.00</td>
                  <td className="py-2 px-4 border-b text-center">$259.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Oxygen Administrator Instructor Recertification / Renewal</td>
                  <td className="py-2 px-4 border-b text-center">$299.00</td>
                  <td className="py-2 px-4 border-b text-center">$289.00</td>
                  <td className="py-2 px-4 border-b text-center">$279.00</td>
                  <td className="py-2 px-4 border-b text-center">$269.00</td>
                  <td className="py-2 px-4 border-b text-center">$259.00</td>
                  <td className="py-2 px-4 border-b text-center">$249.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Certified Pool Operator Course Pricing Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Certified Pool Operator Course</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left border-b font-semibold">Course Name</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">1-4 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">5-9 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">10-24 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">25-49 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">50-99 Tickets</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Certified Pool Operator (CPO)</td>
                  <td className="py-2 px-4 border-b text-center">$365.00</td>
                  <td className="py-2 px-4 border-b text-center">$365.00</td>
                  <td className="py-2 px-4 border-b text-center">$365.00</td>
                  <td className="py-2 px-4 border-b text-center">$365.00</td>
                  <td className="py-2 px-4 border-b text-center">$365.00</td>
                  <td className="py-2 px-4 border-b text-center">$365.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-gray-700 font-medium">1 Ticket = 1 Course Participant</p>
        </div>

        <div className="text-center mb-8">
          <Link href="/onsite-group-pricing">
            <Button variant="outline" className="mx-2">Back to Options</Button>
          </Link>
        </div>

        {/* Question-based CTA Section */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-6 mb-12 shadow-lg border-2 border-blue-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2 bg-blue-600 text-white p-3 rounded-md shadow-md">
                <FaLightbulb className="text-yellow-300 text-xl" />
                <h2 className="text-2xl font-bold">Check Availability for Onsite Training</h2>
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-md mb-2 border-l-4 border-red-500">
                <p className="text-red-600 font-semibold">We sell out every year - there is a national shortage of instructors!</p>
              </div>
              
              <div className="space-y-3 bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-start gap-2">
                  <FaCalendarAlt className="text-blue-600 mt-1 flex-shrink-0 text-lg" />
                  <p className="text-left font-medium">Check availability of dates and times for your team training</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaMapMarked className="text-blue-600 mt-1 flex-shrink-0 text-lg" />
                  <p className="text-left">Secure an instructor for your location before they're booked</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheck className="text-green-600 mt-1 flex-shrink-0 text-lg" />
                  <p className="text-left">Want to check for non-published special discounts?</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaBuilding className="text-blue-600 mt-1 flex-shrink-0 text-lg" />
                  <p className="text-left text-blue-800">Youth Camp, Swim School, Childcare, School & Geographic discounts available</p>
                </div>
              </div>
            </div>
            
            <div className="text-center flex flex-col items-center space-y-4 bg-white p-5 rounded-lg shadow-md border border-blue-300">
              <CustomerServiceImage size="medium" className="mb-2" />
              
              <div className="flex items-center bg-blue-50 p-2 rounded-full w-full justify-center">
                <FaClock className="text-blue-600 mr-2" />
                <span className="text-sm font-medium">9AM-10PM EST, 7 days/week</span>
                {isOpen && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheck className="mr-1 text-xs" /> Open Now!
                  </span>
                )}
              </div>
              
              <Link href="tel:+18885559999" className="w-full">
                <Button className="w-full space-x-2 bg-blue-600 hover:bg-blue-700 py-6">
                  <FaPhoneAlt />
                  <span className="font-bold">Call for Availability</span>
                </Button>
              </Link>
              
              <Link href="/contact-register" className="w-full">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  Schedule a Consultation
                </Button>
              </Link>
              
              <div className="text-sm text-blue-800 mt-1 font-medium">
                <PhoneNumberCanvas className="inline-block" /> · Priority Booking
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup CTA */}
      {showPopupCta && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 max-w-md w-full shadow-2xl relative border-2 border-blue-500">
            <button 
              onClick={handleClosePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="bg-blue-600 text-white p-3 rounded-md shadow-md mb-4 text-center">
              <h3 className="text-xl font-bold mb-1">Limited Availability!</h3>
              <div className="flex items-center justify-center gap-2">
                <FaCalendarAlt className="text-yellow-300" />
                <p className="font-medium">Check instructor availability now</p>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-md shadow-md mb-4 border-l-4 border-red-500">
              <p className="text-red-600 font-semibold text-center">National instructor shortage - don't miss out!</p>
            </div>
            
            <div className="space-y-3 mb-6 bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-start gap-2">
                <FaCalendarAlt className="text-blue-600 mt-1 flex-shrink-0 text-lg" />
                <p className="text-left text-sm font-medium">Check availability of dates for your team's certification needs</p>
              </div>
              <div className="flex items-start gap-2">
                <FaBuilding className="text-blue-600 mt-1 flex-shrink-0 text-lg" />
                <p className="text-left text-sm text-blue-800">Youth Camp, Swim School, Childcare & School discounts available</p>
              </div>
              <div className="flex items-start gap-2">
                <FaMapMarked className="text-blue-600 mt-1 flex-shrink-0 text-lg" />
                <p className="text-left text-sm">Special geographic location discounts may apply to your area</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-center">
                <CustomerServiceImage size="small" className="mb-3" />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-gray-700 mb-1 font-medium text-center">Call us now at:</p>
                <div className="flex justify-center mb-1">
                  <PhoneNumberCanvas className="h-7" color="#1d4ed8" />
                </div>
              </div>

              <Link href="tel:+18885559999" className="w-full block">
                <Button className="w-full space-x-2 bg-blue-600 hover:bg-blue-700">
                  <FaPhoneAlt />
                  <span>Call Now</span>
                </Button>
              </Link>
              
              <Link href="/contact-register" className="w-full block">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  Schedule a Consultation
                </Button>
              </Link>
              
              <div className="flex items-center justify-center text-xs text-center text-gray-600 mt-2 bg-blue-50 p-2 rounded-full">
                <FaClock className="mr-1" />
                <span>Available from 9AM-10PM EST, 7 days/week</span>
                {isOpen && (
                  <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Open Now!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}