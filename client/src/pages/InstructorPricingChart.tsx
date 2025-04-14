import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaPhoneAlt, FaClock, FaTimes, FaCheck, FaLightbulb } from "react-icons/fa";
import { PhoneNumberCanvas } from "@/components/ContactCanvas";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import CustomerServiceImage from "@/components/CustomerServiceImage";

export default function InstructorPricingChart() {
  // Get the location to parse query parameters
  const [location] = useLocation();
  
  // State for business hours and popup
  const [isOpen, setIsOpen] = useState(false);
  const [showPopupCta, setShowPopupCta] = useState(false);
  
  // Parse URL parameters to determine which discount options were selected
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  
  // URL parameter values - explicitly consider 'true' strings as true, everything else as false
  const inflationBuster = params.get('inflation') === 'true';
  const lowestPrice = params.get('lowest') === 'true';
  const specialDiscount = params.get('special') === 'true';
  
  // State for tracking which accordion items are open
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);
  
  // Set up the initial open accordion items based on URL parameters
  useEffect(() => {
    const itemsToShow = [];
    if (inflationBuster) itemsToShow.push("inflation-buster");
    if (lowestPrice) itemsToShow.push("lowest-price");
    if (specialDiscount) itemsToShow.push("special-discounts");
    
    // If no specific options were selected, show all by default
    if (itemsToShow.length === 0) {
      itemsToShow.push("inflation-buster", "lowest-price", "special-discounts");
    }
    
    setOpenAccordionItems(itemsToShow);
    
    // Log for debugging
    console.log('URL params:', { inflation: params.get('inflation'), lowest: params.get('lowest'), special: params.get('special') });
    console.log('Parsed options:', { inflationBuster, lowestPrice, specialDiscount });
    console.log('Items to show:', itemsToShow);
    
    // Auto-scroll to the pricing section if parameters exist
    if (queryString && (inflationBuster || lowestPrice || specialDiscount)) {
      setTimeout(() => {
        const pricingSection = document.getElementById("pricing-section");
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [queryString]);
  
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
    const hasShownPopup = sessionStorage.getItem('instructor_pricing_popup_shown');
    
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopupCta(true);
        sessionStorage.setItem('instructor_pricing_popup_shown', 'true');
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Close popup handler
  const handleClosePopup = () => {
    setShowPopupCta(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Instructor Certification Pricing Chart</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Become a certified instructor and slash your training costs by up to 85%
        </p>
      </div>
      
      {/* Back button */}
      <div className="text-center mb-8">
        <Link href="/instructor-pricing">
          <Button variant="outline" className="mb-4">
            &larr; Back to Options Selection
          </Button>
        </Link>
      </div>
      
      {/* Pricing Options Accordion */}
      <div id="pricing-section" className="bg-gray-50 p-8 rounded-lg mb-8 max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Our Pricing Options</h2>
          <p className="text-gray-600 mb-4">
            Here are the pricing options you selected. Click on any option below to learn more.
          </p>
          
          {/* Selected options indicators */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {specialDiscount && (
              <Badge className="bg-purple-500 text-white">Special Discounts</Badge>
            )}
            {lowestPrice && (
              <Badge className="bg-green-500 text-white">Lowest Price Guarantee</Badge>
            )}
            {inflationBuster && (
              <Badge className="bg-blue-500 text-white">Inflation Buster</Badge>
            )}
            {!specialDiscount && !lowestPrice && !inflationBuster && (
              <Badge className="bg-gray-500 text-white">All Options</Badge>
            )}
          </div>
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
                <h4 className="font-semibold mb-3">(Ask your account specialist which unpublished special discounts you qualify for)</h4>
                
                <p className="mb-4">
                  We have many seasonal, temporary, target market, geographic, charitable, and other discounts available to you. Some include our huge off-season promotion up to 50% off, half price instructor trainer, buy 1 get 1 free lifeguard instructor, and more. Only Account Specialists can access these unpublished special discounts which are not published on our website.
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
                    <span className="font-bold">• Target Market Areas</span> (geographic locations)
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
          
          {/* Lowest Price Guarantee - Second */}
          <AccordionItem value="lowest-price" className={lowestPrice ? "bg-blue-50 border-l-4 border-blue-500" : ""}>
            <AccordionTrigger className={`text-xl font-semibold ${lowestPrice ? "text-blue-700" : ""} px-4 py-3 hover:bg-blue-50`}>
              <div className="flex items-center gap-2">
                {lowestPrice && <CheckCircle className="h-5 w-5 text-blue-500" />}
                <span>Lowest Price Guarantee!</span>
                {lowestPrice && <Badge className="ml-2 bg-blue-600">Selected</Badge>}
              </div>
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
                  When you request our Inflation Buster Discount, you will pay only 90% of what you paid last year when you recertify. This allows you to lock in long-term savings.
                </p>
                
                <p className="mb-4">
                  Inflation Buster Discount Pricing is ideal for organizations and instructors who need to maintain certification status year after year.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="max-w-6xl mx-auto mb-12">
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-xl font-bold">Instructor Advantage</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">
              When you or your employee is the instructor, you'll benefit from dramatically reduced training costs. 
              As a Lifeguard Instructor, you'll be able to purchase student access codes at a fraction of regular certification prices.
            </p>
          </CardContent>
        </Card>

        {/* SECTION 1: Lifeguard Certification Courses Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Lifeguard Certification Courses</h2>
          <p className="text-lg text-gray-600 mb-4">
            1 Ticket = 1 Course Participant
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-2 text-left border-b font-semibold">Course Name</th>
                  <th className="py-3 px-2 text-center border-b font-semibold whitespace-nowrap">1-4 Tickets</th>
                  <th className="py-3 px-2 text-center border-b font-semibold whitespace-nowrap">5-9 Tickets</th>
                  <th className="py-3 px-2 text-center border-b font-semibold whitespace-nowrap">10-24 Tickets</th>
                  <th className="py-3 px-2 text-center border-b font-semibold whitespace-nowrap">25-49 Tickets</th>
                  <th className="py-3 px-2 text-center border-b font-semibold whitespace-nowrap">50-99 Tickets</th>
                  <th className="py-3 px-2 text-center border-b font-semibold whitespace-nowrap">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Junior Lifeguard</td>
                  <td className="py-2 px-2 border-b text-center">$62.50</td>
                  <td className="py-2 px-2 border-b text-center">$52.50</td>
                  <td className="py-2 px-2 border-b text-center">$42.50</td>
                  <td className="py-2 px-2 border-b text-center">$32.50</td>
                  <td className="py-2 px-2 border-b text-center">$22.50</td>
                  <td className="py-2 px-2 border-b text-center">$12.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Shallow Pool Lifeguard (max depth 5')</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Shallow Pool + Youth Camp Lifeguard (max depth 5')</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Swimming Pool Lifeguard (max depth 12')</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Swimming Pool + Youth Camp Lifeguard (max depth 12')</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Deep Pool Lifeguard (max depth 20')</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Deep Pool + Youth Camp Lifeguard (max depth 20')</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Waterfront Lifeguard / Beach Lifeguard</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Waterfront + Youth Camp Lifeguard</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Water Park Lifeguard</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Water Park + Youth Camp Lifeguard</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">All Specialties Lifeguard</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">Lifeguard Recertification / Renewal</td>
                  <td className="py-2 px-2 border-b text-center">$129.99</td>
                  <td className="py-2 px-2 border-b text-center">$119.99</td>
                  <td className="py-2 px-2 border-b text-center">$99.99</td>
                  <td className="py-2 px-2 border-b text-center">$89.99</td>
                  <td className="py-2 px-2 border-b text-center">$79.99</td>
                  <td className="py-2 px-2 border-b text-center">$59.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: Water Safety Swim Instructor Courses Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Water Safety Swim Instructor Courses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="py-3 px-3 text-left border-b">Course Name</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">1-4 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">5-9 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">10-24 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">25-49 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">50-99 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Basic Water Safety</td>
                  <td className="py-2 px-3 border-b text-center">$99.00</td>
                  <td className="py-2 px-3 border-b text-center">$89.00</td>
                  <td className="py-2 px-3 border-b text-center">$79.00</td>
                  <td className="py-2 px-3 border-b text-center">$69.00</td>
                  <td className="py-2 px-3 border-b text-center">$59.00</td>
                  <td className="py-2 px-3 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Basic Water Safety Recertification / Renewal</td>
                  <td className="py-2 px-3 border-b text-center">$99.00</td>
                  <td className="py-2 px-3 border-b text-center">$89.00</td>
                  <td className="py-2 px-3 border-b text-center">$79.00</td>
                  <td className="py-2 px-3 border-b text-center">$69.00</td>
                  <td className="py-2 px-3 border-b text-center">$59.00</td>
                  <td className="py-2 px-3 border-b text-center">$49.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Water Safety Swim Instructor</td>
                  <td className="py-2 px-3 border-b text-center">$129.99</td>
                  <td className="py-2 px-3 border-b text-center">$119.99</td>
                  <td className="py-2 px-3 border-b text-center">$99.99</td>
                  <td className="py-2 px-3 border-b text-center">$89.99</td>
                  <td className="py-2 px-3 border-b text-center">$79.99</td>
                  <td className="py-2 px-3 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Water Safety Swim Instructor Recertification / Renewal</td>
                  <td className="py-2 px-3 border-b text-center">$129.99</td>
                  <td className="py-2 px-3 border-b text-center">$119.99</td>
                  <td className="py-2 px-3 border-b text-center">$99.99</td>
                  <td className="py-2 px-3 border-b text-center">$89.99</td>
                  <td className="py-2 px-3 border-b text-center">$79.99</td>
                  <td className="py-2 px-3 border-b text-center">$59.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Water Safety Swim Instructor Trainer</td>
                  <td className="py-2 px-3 border-b text-center">$249.50</td>
                  <td className="py-2 px-3 border-b text-center">$239.50</td>
                  <td className="py-2 px-3 border-b text-center">$229.50</td>
                  <td className="py-2 px-3 border-b text-center">$219.50</td>
                  <td className="py-2 px-3 border-b text-center">$209.50</td>
                  <td className="py-2 px-3 border-b text-center">$199.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Water Safety Swim Instructor Trainer Recertification</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                  <td className="py-2 px-3 border-b text-center">$89.50</td>
                  <td className="py-2 px-3 border-b text-center">$79.50</td>
                  <td className="py-2 px-3 border-b text-center">$69.50</td>
                  <td className="py-2 px-3 border-b text-center">$59.50</td>
                  <td className="py-2 px-3 border-b text-center">$49.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Water Safety Swim Instructor Trainer Director</td>
                  <td className="py-2 px-3 border-b text-center">$249.50</td>
                  <td className="py-2 px-3 border-b text-center">$239.50</td>
                  <td className="py-2 px-3 border-b text-center">$229.50</td>
                  <td className="py-2 px-3 border-b text-center">$219.50</td>
                  <td className="py-2 px-3 border-b text-center">$209.50</td>
                  <td className="py-2 px-3 border-b text-center">$199.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Water Safety Swim Instructor Trainer Director Recertification</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                  <td className="py-2 px-3 border-b text-center">$89.50</td>
                  <td className="py-2 px-3 border-b text-center">$79.50</td>
                  <td className="py-2 px-3 border-b text-center">$69.50</td>
                  <td className="py-2 px-3 border-b text-center">$59.50</td>
                  <td className="py-2 px-3 border-b text-center">$49.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* SECTION 3: Lifeguard Instructor Courses Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Lifeguard Instructor Courses</h2>
          <p className="text-gray-700 mb-4">When you or your employee is the instructor, you may buy hugely discounted certification courses for the candidates you intend to certify.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="py-3 px-3 text-left border-b">Course Name</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">1-4 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">5-9 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">10-24 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">25-49 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">50-99 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Lifeguard Instructor</td>
                  <td className="py-2 px-3 border-b text-center">$249.50</td>
                  <td className="py-2 px-3 border-b text-center">$239.50</td>
                  <td className="py-2 px-3 border-b text-center">$229.50</td>
                  <td className="py-2 px-3 border-b text-center">$219.50</td>
                  <td className="py-2 px-3 border-b text-center">$209.50</td>
                  <td className="py-2 px-3 border-b text-center">$199.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Lifeguard Instructor Recertification</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                  <td className="py-2 px-3 border-b text-center">$89.50</td>
                  <td className="py-2 px-3 border-b text-center">$79.50</td>
                  <td className="py-2 px-3 border-b text-center">$69.50</td>
                  <td className="py-2 px-3 border-b text-center">$59.50</td>
                  <td className="py-2 px-3 border-b text-center">$49.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Lifeguard Instructor Trainer</td>
                  <td className="py-2 px-3 border-b text-center">$249.50</td>
                  <td className="py-2 px-3 border-b text-center">$239.50</td>
                  <td className="py-2 px-3 border-b text-center">$229.50</td>
                  <td className="py-2 px-3 border-b text-center">$219.50</td>
                  <td className="py-2 px-3 border-b text-center">$209.50</td>
                  <td className="py-2 px-3 border-b text-center">$199.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Lifeguard Instructor Trainer Recertification</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                  <td className="py-2 px-3 border-b text-center">$89.50</td>
                  <td className="py-2 px-3 border-b text-center">$79.50</td>
                  <td className="py-2 px-3 border-b text-center">$69.50</td>
                  <td className="py-2 px-3 border-b text-center">$59.50</td>
                  <td className="py-2 px-3 border-b text-center">$49.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* SECTION 4: CPR/First Aid Instructor Courses Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">CPR / First Aid Instructor Courses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="py-3 px-3 text-left border-b">Course Name</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">1-4 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">5-9 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">10-24 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">25-49 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">50-99 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                {/* CPR/First Aid Instructor Courses */}
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR BLS for Healthcare Provider & First Aid Instructor</td>
                  <td className="py-2 px-3 border-b text-center">$149.50</td>
                  <td className="py-2 px-3 border-b text-center">$139.50</td>
                  <td className="py-2 px-3 border-b text-center">$129.50</td>
                  <td className="py-2 px-3 border-b text-center">$119.50</td>
                  <td className="py-2 px-3 border-b text-center">$109.50</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR BLS for Healthcare Provider & First Aid Instructor Recertification</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                  <td className="py-2 px-3 border-b text-center">$89.50</td>
                  <td className="py-2 px-3 border-b text-center">$79.50</td>
                  <td className="py-2 px-3 border-b text-center">$69.50</td>
                  <td className="py-2 px-3 border-b text-center">$59.50</td>
                  <td className="py-2 px-3 border-b text-center">$49.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR BLS for Healthcare Provider & First Aid Instructor Trainer</td>
                  <td className="py-2 px-3 border-b text-center">$149.50</td>
                  <td className="py-2 px-3 border-b text-center">$139.50</td>
                  <td className="py-2 px-3 border-b text-center">$129.50</td>
                  <td className="py-2 px-3 border-b text-center">$119.50</td>
                  <td className="py-2 px-3 border-b text-center">$109.50</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR BLS for Healthcare Provider & First Aid Instructor Trainer Recertification</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                  <td className="py-2 px-3 border-b text-center">$89.50</td>
                  <td className="py-2 px-3 border-b text-center">$79.50</td>
                  <td className="py-2 px-3 border-b text-center">$69.50</td>
                  <td className="py-2 px-3 border-b text-center">$59.50</td>
                  <td className="py-2 px-3 border-b text-center">$49.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Oxygen Administrator Instructor</td>
                  <td className="py-2 px-3 border-b text-center">$149.50</td>
                  <td className="py-2 px-3 border-b text-center">$139.50</td>
                  <td className="py-2 px-3 border-b text-center">$129.50</td>
                  <td className="py-2 px-3 border-b text-center">$119.50</td>
                  <td className="py-2 px-3 border-b text-center">$109.50</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Oxygen Administrator Instructor Recertification</td>
                  <td className="py-2 px-3 border-b text-center">$149.50</td>
                  <td className="py-2 px-3 border-b text-center">$139.50</td>
                  <td className="py-2 px-3 border-b text-center">$129.50</td>
                  <td className="py-2 px-3 border-b text-center">$119.50</td>
                  <td className="py-2 px-3 border-b text-center">$109.50</td>
                  <td className="py-2 px-3 border-b text-center">$99.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* SECTION 5: CPR / First Aid Courses Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">CPR / First Aid Courses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="py-3 px-3 text-left border-b">Course Name</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">1-4 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">5-9 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">10-24 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">25-49 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">50-99 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR BLS for Healthcare Provider (Adult, Child & Infant with AED)</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                  <td className="py-2 px-3 border-b text-center">$19.99</td>
                  <td className="py-2 px-3 border-b text-center">$14.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR Recertification / Renewal</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                  <td className="py-2 px-3 border-b text-center">$19.99</td>
                  <td className="py-2 px-3 border-b text-center">$14.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">First Aid</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                  <td className="py-2 px-3 border-b text-center">$19.99</td>
                  <td className="py-2 px-3 border-b text-center">$14.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">First Aid Recertification / Renewal</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                  <td className="py-2 px-3 border-b text-center">$19.99</td>
                  <td className="py-2 px-3 border-b text-center">$14.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR BLS for Healthcare Provider & First Aid</td>
                  <td className="py-2 px-3 border-b text-center">$49.99</td>
                  <td className="py-2 px-3 border-b text-center">$44.99</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">CPR BLS for Healthcare Provider & First Aid Recertification / Renewal</td>
                  <td className="py-2 px-3 border-b text-center">$49.99</td>
                  <td className="py-2 px-3 border-b text-center">$44.99</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Bloodborne Pathogens</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                  <td className="py-2 px-3 border-b text-center">$19.99</td>
                  <td className="py-2 px-3 border-b text-center">$14.99</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Oxygen Administrator</td>
                  <td className="py-2 px-3 border-b text-center">$39.99</td>
                  <td className="py-2 px-3 border-b text-center">$34.99</td>
                  <td className="py-2 px-3 border-b text-center">$29.99</td>
                  <td className="py-2 px-3 border-b text-center">$24.99</td>
                  <td className="py-2 px-3 border-b text-center">$19.99</td>
                  <td className="py-2 px-3 border-b text-center">$14.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* SECTION 6: Certified Pool Operator Course Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Certified Pool Operator Course</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="py-3 px-3 text-left border-b">Course Name</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">1-4 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">5-9 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">10-24 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">25-49 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">50-99 Tickets</th>
                  <th className="py-3 px-3 text-center border-b whitespace-nowrap">100+ Tickets</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b font-medium">Certified Pool Operator (CPO)</td>
                  <td className="py-2 px-3 border-b text-center">$365.00</td>
                  <td className="py-2 px-3 border-b text-center">$365.00</td>
                  <td className="py-2 px-3 border-b text-center">$365.00</td>
                  <td className="py-2 px-3 border-b text-center">$365.00</td>
                  <td className="py-2 px-3 border-b text-center">$365.00</td>
                  <td className="py-2 px-3 border-b text-center">$365.00</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-600 text-sm italic mt-3">1 Ticket = 1 Course Participant</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-12">
          <div className="md:flex justify-between items-center gap-8">
            <div className="mb-6 md:mb-0 md:flex-1">
              <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <FaCheck className="text-yellow-300 mt-1 flex-shrink-0" />
                  <p>Want to know more about the process of becoming an instructor?</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheck className="text-yellow-300 mt-1 flex-shrink-0" />
                  <p>Not sure which certifications are required in your area?</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheck className="text-yellow-300 mt-1 flex-shrink-0" />
                  <p>Not sure if getting an instructor certification makes sense for your team size?</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheck className="text-yellow-300 mt-1 flex-shrink-0" />
                  <p>Want to check for non-published special discounts?</p>
                </div>
              </div>
            </div>
            
            <div className="md:flex-1 bg-blue-700 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-40 h-40 flex-shrink-0">
                  <CustomerServiceImage />
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="text-xl font-bold mb-3">Get Friendly Expert Advice</h3>
                  <p className="mb-4 text-lg">
                    Our specialists are here to help determine the most cost-effective certification path for your specific needs.
                  </p>
                  <div className="bg-white rounded-md py-3 px-4 mb-4">
                    <p className="text-gray-600 text-sm">Call us at</p>
                    <div className="text-center">
                      <PhoneNumberCanvas className="text-2xl font-bold" color="#1e40af" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-semibold">
                      Call Now
                    </Button>
                    <Link href="/contact-register">
                      <Button className="bg-transparent border-2 border-white hover:bg-blue-600">
                        Schedule Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Questions? Contact Us</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <FaPhoneAlt />
              </div>
              <div className="bg-white px-4 py-2 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Call us at</p>
                <div className="text-center">
                  <PhoneNumberCanvas className="text-xl font-bold" color="#1e40af" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <FaClock />
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Hours</p>
                <p className="text-lg font-semibold">9AM-10PM EST, 7 days/week</p>
                <span className={`text-sm font-medium ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  {isOpen ? '● Open Now!' : '● Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup CTA */}
      {showPopupCta && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={handleClosePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close popup"
            >
              <FaTimes size={24} />
            </button>
            
            <div className="flex md:flex-row flex-col items-center gap-4 mb-4">
              <div className="w-32 h-32 flex-shrink-0">
                <CustomerServiceImage />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Have Questions?</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-blue-600 mt-1 flex-shrink-0" />
                    <p>Want to know how much you could save with your own instructor?</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-blue-600 mt-1 flex-shrink-0" />
                    <p>Not sure which instructor certification is right for your team?</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-blue-600 mt-1 flex-shrink-0" />
                    <p>Want to check for non-published special discounts?</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-5">
              <h3 className="text-xl font-bold mb-3">Get Friendly Expert Advice</h3>
              <p className="mb-4 text-gray-600">
                Our specialists are here to help determine the most cost-effective certification path for your specific needs.
              </p>
              <div className="bg-white rounded-md py-2 px-4 mb-4">
                <p className="text-gray-600 text-sm">Call us at</p>
                <div className="text-center">
                  <PhoneNumberCanvas className="text-xl font-bold" color="#1e40af" />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="font-medium">
                  On average, organizations save 73% on certification costs by having their own in-house instructor.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-semibold px-8 py-2">
                  Call Now
                </Button>
                <Link href="/contact-register">
                  <Button className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}