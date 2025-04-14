import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";

export default function EmployerInstructorTraining() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Employer & Instructor Pricing Options</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          Slash your training costs by up to 85% with our instructor certification or onsite group training options
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Become an Instructor Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center bg-blue-50">
            <div className="mx-auto bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center text-blue-600 mb-4">
              <FaChalkboardTeacher size={36} />
            </div>
            <CardTitle className="text-2xl">You Are An Instructor or We Can Make You An Instructor In As Little As 2 Days</CardTitle>
            <CardDescription>
              Train Your Own Staff and Save 65-85% on Training Costs
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Slash your training costs by up to 85%</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Train on your own schedule at your facility</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Purchase access codes for just $60 per lifeguard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>CPR & First Aid certification for only $25 per person</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-4 pb-6 flex justify-center">
            <Link href="/instructor-pricing">
              <Button size="lg">View Instructor Training & Pricing</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Onsite Group Training Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center bg-green-50">
            <div className="mx-auto bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center text-green-600 mb-4">
              <FaUsers size={36} />
            </div>
            <CardTitle className="text-2xl">Onsite Group Training</CardTitle>
            <CardDescription>
              We'll send an instructor to your facility to train your entire staff
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Maximum convenience - we handle everything</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>You select the location, date, and time</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Volume discounts available for larger groups</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Professional instructor brings all needed equipment</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-4 pb-6 flex justify-center">
            <Link href="/onsite-group-pricing">
              <Button size="lg">View Onsite Group Pricing</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Not Sure Which Option Is Right For You?</h3>
        <p className="mb-6 text-gray-600">
          Contact our team for personalized guidance on the most cost-effective training solution for your organization.
        </p>
        <Link href="/contact-register">
          <Button variant="outline" size="lg">Contact Us For Guidance</Button>
        </Link>
      </div>
    </div>
  );
}