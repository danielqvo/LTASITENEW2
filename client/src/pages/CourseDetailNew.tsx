import React from "react";
import { useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courseCategories } from "@shared/courseData";
import { courseDescriptions } from "@shared/courseDescriptions";

const CourseDetailNew: React.FC = () => {
  const params = useParams<{ category: string; id: string }>();
  const [_, setLocation] = useLocation();
  
  // Find the category
  const categoryData = courseCategories.find(cat => cat.id === params.category);
  
  // If category exists, find the course
  const courseData = categoryData?.courses.find(course => course.id === params.id);
  
  // Find the course description details
  const courseDescriptionData = courseData ? courseDescriptions[courseData.id] : undefined;
  
  if (!categoryData || !courseData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Course Not Found</CardTitle>
              <CardDescription>The course you are looking for doesn't exist.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setLocation("/")} className="w-full">
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <nav className="flex text-sm" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <button onClick={() => setLocation("/")} className="text-gray-600 hover:text-primary">
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <button onClick={() => setLocation("/courses")} className="text-gray-600 hover:text-primary">
                      <span>Courses</span>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <button onClick={() => setLocation(`/category/${categoryData.id}`)} className="text-gray-600 hover:text-primary">
                      <span>{categoryData.title.replace(' Certification Courses', '')}</span>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-primary">{courseData.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className={`${categoryData.iconBgColor} p-8 text-white`}>
              <h1 className="text-3xl font-bold mb-2">
                {courseData.title}
              </h1>
              <p className="text-xl mb-0">
                {categoryData.title}
              </p>
            </div>
            
            <div className="p-8">
              {/* Hero Section - THIS SECTION STAYS THE SAME ACROSS ALL COURSE PAGES */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary-dark mb-4">
                  Certification in Your Hand in 2 Days
                </h2>
                <p className="text-xl font-medium text-gray-700 mb-6">
                  1-Day Online Home-Study & 1-Day Instructor-Led Training
                </p>
                <p className="text-gray-600">
                  The {courseData.title} Course, just like all our offerings, follows this straightforward two-part training format. This includes every Lifeguard, Lifeguard Instructor, Water Safety Swim Instructor, Water Safety Swim Instructor Trainer, CPR & First Aid Instructor, and Certified Pool Operator (CPO) certification course we offer. For CPR, First Aid, Oxygen Administrator, and recertification classes, even fewer training hours are needed.
                </p>
              </div>
              
              {/* Course Description - THIS SECTION CHANGES BASED ON THE SPECIFIC COURSE */}
              <div className="bg-gray-50 p-6 rounded-lg mb-12">
                <div className="prose max-w-none">
                  {courseDescriptionData && (
                    <>
                      <p>{courseDescriptionData.description}</p>
                      
                      <h3>Course Includes</h3>
                      <p>This is a comprehensive Lifeguard certification course (approximately 24.0 hours), which includes all of the following certification components:</p>
                      <ul>
                        {courseDescriptionData.details.includes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      <h3>Course Prerequisites</h3>
                      <p>Before enrolling in this course, certification candidates must meet these requirements:</p>
                      <ul>
                        {courseDescriptionData.details.prerequisites.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      <h3>Course Objectives</h3>
                      <p>Upon completion of this course, certification candidates will be able to:</p>
                      <ul>
                        {courseDescriptionData.details.objectives.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      <h3>Certification Requirements</h3>
                      <p>Certification candidates must:</p>
                      <ul>
                        {courseDescriptionData.details.certificationRequirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      <h3>Your Purchase Includes</h3>
                      <p>All the required Home-Study Course materials for the following courses:</p>
                      <ul>
                        {courseDescriptionData.details.purchase.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              
              {/* Two-part Course Section - THIS SECTION STAYS THE SAME ACROSS ALL COURSE PAGES */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary-dark text-center mb-8">
                  The {courseData.title.split(' ').slice(0, 3).join(' ')} Course<br />
                  consists of two parts
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-primary-dark mb-4">Part 1</h3>
                    <h4 className="text-lg font-semibold mb-3">Home-Study Course</h4>
                    <p className="text-gray-700 mb-4">
                      Complete your comprehensive, online Home-Study Course (textbooks, videos, and exams) in the comfort and convenience of your own home, while working at your own pace. Stop and start as often as you like.
                    </p>
                    <p className="font-medium text-primary-dark">Ultra-convenient!</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-primary-dark mb-4">Part 2</h3>
                    <h4 className="text-lg font-semibold mb-3">Instructor-Led Training</h4>
                    <p className="text-gray-700 mb-4">
                      After completing your Home-Study Course, participate in an instructor-led, physical skills training class near you. You can either use your own instructor or we'll connect you with a local instructor.
                    </p>
                    <p className="font-medium text-primary-dark">Super-easy!</p>
                  </div>
                </div>
              </div>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded text-lg">
                  Get Pricing
                </Button>
                <Button className="bg-primary-dark hover:bg-primary text-white py-3 px-8 rounded text-lg">
                  Register Now
                </Button>
              </div>
              
              {/* How It Works Section - THIS SECTION STAYS THE SAME ACROSS ALL COURSE PAGES */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary-dark mb-6">How it works in detail</h2>
                <p className="mb-6">
                  You can have your certification in your hand in as little as two days – one day online training, and one day instructor-led training.
                </p>
                <p className="mb-6">
                  All our certification courses follow this same convenient two-part training format. Please note: CPR, First Aid, and recertification classes require even fewer training hours.
                </p>
                
                {/* Accordion for Steps */}
                <Accordion type="single" collapsible className="w-full">
                  {/* Step 1 */}
                  <AccordionItem value="step1">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 1: Select Your Course
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Review the course definition to make certain that you are selecting the correct course for you. If after reading the course definitions, you are still not sure which is the best course for you, don't worry. Just give us a call, and we'll answer all your questions and help you select the course that is best for you.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 2 */}
                  <AccordionItem value="step2">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 2: Register
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 mb-2">
                        To register for your certification course:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Select your course from the top menu bar to read course descriptions</li>
                        <li>Select Register now from the top menu bar to register for your course</li>
                        <li>Fill out the Register now form and click submit</li>
                        <li>Follow the payment instructions to purchase your certification course</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 3 */}
                  <AccordionItem value="step3">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 3: Login to Begin Your Course
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 mb-2">
                        To register for your Lifeguard Training Academy certification course:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Select your course from the top menu bar to read course descriptions</li>
                        <li>Select Register now from the top menu bar to register for your course</li>
                        <li>Fill out the Register now form and click submit</li>
                        <li>Follow the payment instructions to purchase your certification course</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 4 */}
                  <AccordionItem value="step4">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 4: Complete Home-Study Course
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        With your authorized username and password, you can login to LifeguardTrainingAcademy.org and start your online home-study course at anytime from anywhere. You may work in the comfort and convenience of your own home, and progress at your own pace. You may stop and start the home-study course as often as you like (except while you are taking a timed exam).
                      </p>
                      <p className="text-gray-700 mt-2">
                        All home-study courses can be completed in less than 12.0 hours. However, you have up to 180 days to complete your home-study course. So, work at a pace that is comfortable for you.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 5 */}
                  <AccordionItem value="step5">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 5: Schedule Your Instructor-Led Training Class
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        To reduce the incidence of no-call no-show, cancellation, and rescheduling, you must complete all online home-study course requirements before requesting an instructor-led training class.
                      </p>
                      <p className="text-gray-700 mt-2">
                        Once you have successfully completed all your online home-study course requirements, and you arrived at the step in your online home-study course titled Schedule & Attend Instructor-Led Training Class, you should contact your Instructor or LifeguardTrainingAcademy.org.
                      </p>
                      <p className="text-gray-700 mt-2">
                        Your Instructor or Lifeguard Training Academy will help you conveniently schedule your instructor-led training class. Simply, tell them your desired training dates, times, and location. Your Instructor or LifeguardTrainingAcademy.org will approve the most convenient dates, times and location for your class.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 6 */}
                  <AccordionItem value="step6">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 6: Pay For Your Instructor-Led Training Class
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        If Lifeguard Training Academy will be the instructor conducting your instructor-led training class, you must pay Lifeguard Training Academy for that training class prior to attending your instructor-led training class. Lifeguard Training Academy accepts credit cards, debit cards, ACH bank transfers (eChecks), domestic bank wire transfer, international back wire transfer, CashApp, Venmo, personal checks via postal mail, business check via postal mail, money orders via postal mail, and other methods upon request.
                      </p>
                      <p className="text-gray-700 mt-2">
                        If a local instructor or your employer will be conducting your instructor-led training class, you must pay that instructor directly for that class prior to attending your instructor-led training class. The methods of payment that your instructor will accept can vary, so consult with your instructor about acceptable payment options before attending your training class.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 7 */}
                  <AccordionItem value="step7">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 7: Attend Instructor-Led Training Class
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        At the instructor-led training class, you must successfully complete:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                        <li>All course required physical skills no less than 3 times under the direct supervision of your Instructor; and,</li>
                        <li>Lifeguard, CPR and First Aid closed-book, instructor proctored, written final exam with a correct score of 90% or higher.</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 8 */}
                  <AccordionItem value="step8">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 8: Complete Instructor-Led Training Class
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        At the conclusion of your instructor-led training class, you and your instructor will fill-out and sign your Certification Request Form (CRF). If you are under the age of 18, your parent or legal guardian must sign the form for you. This form verifies that you successfully completed all course requirements for certification.
                      </p>
                      <p className="text-gray-700 mt-2">
                        Lifeguard Training Academy certification courses are task-based courses and not hourly-based courses, so class duration may vary between candidates.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 9 */}
                  <AccordionItem value="step9">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 9: Request Your Certification Card
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Upload your completed and signed CRF to your LifeguardTrainingAcademy.org profile in the section titled 'Upload certification forms'. Then, click SAVE.
                      </p>
                      <p className="text-gray-700 mt-2">
                        Lastly, from within your Profile, check the box titled 'Issue my certification' or notify your Instructor that you have completed all course requirements, and you are requesting your certification card.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Step 10 */}
                  <AccordionItem value="step10">
                    <AccordionTrigger className="text-lg font-semibold">
                      Step 10: Receive Your Certification Card
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Upon satisfying all the course requirements detailed above, you can immediately download a hi-resolution digital image of your certification card.
                      </p>
                      <p className="text-gray-700 mt-2">
                        Congratulations, you're now a certified life guard!
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              {/* Final CTA */}
              <div className="text-center">
                <Button className="bg-primary-dark hover:bg-primary text-white py-3 px-8 rounded text-lg">
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailNew;