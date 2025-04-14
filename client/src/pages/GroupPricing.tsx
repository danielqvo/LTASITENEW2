import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function GroupPricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Employer/Instructor Training</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Special rates for employers, organizations, and instructors
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Training Option</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Option 1 - Become an Instructor */}
          <Card className="shadow-lg border-2 border-blue-500 h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="bg-blue-500 text-white font-bold text-lg py-2 px-4 rounded-md inline-block mb-4 self-start">
                OPTION 1
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                Become an Instructor
              </h3>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="font-bold text-blue-800 text-lg mb-2">
                  SAVE UP TO 85% ON CERTIFICATION COSTS
                </p>
                <p className="mb-2">
                  For a lifeguard certification, costs can be reduced to <span className="font-bold text-blue-700">below $60 per person</span>
                </p>
                <p>
                  For CPR and First Aid, costs can be reduced to <span className="font-bold text-blue-700">below $25 per person</span>
                </p>
              </div>
              
              <div className="flex-grow">
                <h4 className="text-lg font-semibold mb-3">Are you an instructor or would you like us to make you an instructor?</h4>
                
                <p className="mb-4">
                  This option provides the most cost-effective solution for organizations that need to certify multiple staff members regularly.
                </p>
                
                <p className="mb-4 font-medium text-blue-700">
                  As a Lifeguard Instructor, Water Safety Swim Instructor Trainer, or CPR & First Aid Instructor, you can purchase hugely discounted certification courses for the candidates you intend to certify.
                </p>
                
                <div className="mb-6">
                  <h5 className="font-semibold mb-2">PRICES FOR EMPLOYERS & INSTRUCTORS</h5>
                  <p className="mb-2 italic text-sm">When You or Your Employee is The Instructor</p>
                  
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Train once to become an instructor, then certify your own staff</li>
                    <li>Save significantly on per-person certification costs</li>
                    <li>Purchase Home-Study Course Tickets for each candidate</li>
                    <li>Tickets are freely transferable and reusable if candidates quit, fail, or cancel</li>
                    <li>Save between 65-85% per ticket</li>
                    <li>Your tickets never expire!</li>
                    <li>Gain flexibility to conduct training on your own schedule</li>
                    <li>Receive ongoing support from our certification experts</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 italic mb-2">
                  Note: Pricing is for Home-Study Course tickets per candidate. You must provide the Instructor-Led Training as the instructor.
                </p>
                
                <p className="text-sm text-gray-600 italic">
                  Example: If you buy 6 Junior Lifeguard tickets, your price is $52.50 per ticket. For 11 Shallow Pool Lifeguard tickets, your price is $99.99 per ticket.
                </p>
              </div>
              
              <div className="mt-6">
                <Link href="/pricing">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Instructor Pricing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Option 2 - Onsite Training */}
          <Card className="shadow-lg h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="bg-gray-700 text-white font-bold text-lg py-2 px-4 rounded-md inline-block mb-4 self-start">
                OPTION 2
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                Onsite Group Training
              </h3>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="font-bold text-yellow-800 text-lg">
                  We train your staff at your facility on the date you reserve.
                </p>
                <p className="italic mt-2">
                  Super convenient. Our most premium option. Book early - we sell out every year!
                </p>
              </div>
              
              <div className="flex-grow">
                <p className="mb-4">
                  Perfect for organizations that need professional training at their own location without the commitment of maintaining an in-house instructor.
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Convenient on-site training at your facility</li>
                  <li>Custom scheduled dates that work with your calendar</li>
                  <li>Professional instructors come to you</li>
                  <li>All necessary equipment and materials provided</li>
                  <li>Group volume discounts available</li>
                  <li>Customized training plans for your specific requirements</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <Link href="/pricing">
                  <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white">
                    View Onsite Group Training Pricing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}