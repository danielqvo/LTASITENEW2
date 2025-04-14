import React from "react";
import { Link } from "wouter";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { 
  Button 
} from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get Pricing</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          To provide you with the most accurate pricing information, please select one of the options below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Individual Pricing</h2>
            <p className="mb-6 text-gray-600">
              I'm an individual seeking a course for myself or a family member
            </p>
            <Link href="/individual-pricing">
              <Button className="w-full">View Individual Pricing</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Employer/Instructor Pricing</h2>
            <p className="mb-6 text-gray-600">
              I'm an employer or instructor seeking courses for my group
            </p>
            <Link href="/employer-instructor-pricing">
              <Button className="w-full">View Employer/Instructor Pricing</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-lg max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Why Are We Asking?</h3>
        <p className="text-gray-600">
          We want to provide you with the most accurate pricing information based on your specific needs. 
          Individual and group certification courses have different pricing structures, discounts, and options available. 
          By understanding your requirements, we can ensure you receive the most appropriate pricing information.
        </p>
      </div>
    </div>
  );
}