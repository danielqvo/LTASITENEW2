import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function OnsiteGroupPricing() {
  const [inflationBuster, setInflationBuster] = useState(false);
  const [lowestPrice, setLowestPrice] = useState(false);
  const [specialDiscount, setSpecialDiscount] = useState(false);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Onsite Group Training Pricing Options</h1>
        <p className="text-xl mt-2 text-gray-600">
          When you hire a Lifeguard Training Academy instructor to teach at your facility
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Maximum Convenience For Group Training</CardTitle>
            <CardDescription>
              We train your group at your facility on the date you reserve. If you don't have your own instructor, 
              we can send a highly-experienced professional instructor to your facility to train your staff.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              We take all the worries and stress out of certifying your group. You select the training location, date, and time… We do the rest!
            </p>

            <h3 className="text-lg font-semibold mb-4">Select Your Preferred Pricing Options:</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-3 p-4 rounded-md bg-purple-50">
                <Checkbox 
                  id="special-discount" 
                  checked={specialDiscount}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') setSpecialDiscount(checked);
                  }}
                />
                <div>
                  <Label 
                    htmlFor="special-discount" 
                    className="text-base font-semibold cursor-pointer"
                  >
                    Special Discounts
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Ask your account specialist which unpublished special discounts you qualify for e.g., Our huge off-season promotion up to 50% off, half price instructor trainer, buy 1 get 1 free lifeguard instructor.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-md bg-green-50">
                <Checkbox 
                  id="lowest-price" 
                  checked={lowestPrice}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') setLowestPrice(checked);
                  }}
                />
                <div>
                  <Label 
                    htmlFor="lowest-price" 
                    className="text-base font-semibold cursor-pointer"
                  >
                    Lowest Price Guarantee!
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Found a lower price elsewhere? Send us the link, and we'll beat it by 25%! We're committed to offering the most affordable and high-quality certifications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-md bg-blue-50">
                <Checkbox 
                  id="inflation-buster" 
                  checked={inflationBuster}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') setInflationBuster(checked);
                  }}
                />
                <div>
                  <Label 
                    htmlFor="inflation-buster" 
                    className="text-base font-semibold cursor-pointer"
                  >
                    Inflation Buster Discount Pricing
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Pay 90% of what you paid last year when you recertify. This option allows you to lock in long-term savings.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <div className="mb-6 text-gray-700">
                <p className="text-lg font-medium">Ready to see our detailed pricing chart?</p>
                <p className="text-sm mt-1">View our comprehensive pricing based on group size and course type.</p>
              </div>
              <Link href={`/onsite-group-pricing-chart?inflation=${String(inflationBuster)}&lowest=${String(lowestPrice)}&special=${String(specialDiscount)}`}>
                <Button size="lg" className="mx-auto px-8" onClick={() => {
                  console.log('Selected options:', { inflationBuster, lowestPrice, specialDiscount });
                }}>
                  View Pricing Chart
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/employer-instructor-pricing">
            <Button variant="outline">Back to Options</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}