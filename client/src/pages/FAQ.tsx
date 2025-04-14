import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Frequently Asked Questions</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Find answers to common questions about our certification programs and services
            </p>
          </div>
        </section>
        
        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-6">
                
                {/* Question 1 */}
                <AccordionItem value="q1" className="border rounded-lg p-2 shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold text-primary-dark px-4 hover:no-underline">
                    Is Lifeguard Training Academy nationally & internationally recognized?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-base">
                    <p className="mb-4">Yes! Lifeguard Training Academy is nationally & internationally recognized.</p>
                    <p className="mb-4">Not only our Lifeguard courses more available than ever before, they are also nationally and internationally recognized!</p>
                    <p className="font-semibold mb-2">Lifeguard Training Academy Certifications are:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Accepted in all 50 U.S. States</li>
                      <li>Accepted in all U.S. Territories</li>
                      <li>Approved by USA Swimming for National Use</li>
                      <li>Approved by the U.S. Navy for Worldwide Use</li>
                      <li>Accepted by the U.S. Military for Use at U.S. Military Bases around the World</li>
                      <li>Accepted by United Nations Multi-National Peace-Keeping Forces for Use at Military Bases around the World</li>
                      <li>Used by Governments of States, Counties, Cities, and Towns</li>
                      <li>Used by State Parks, County Facilities, City Parks & Recreation Departments, Water Parks, and Amusement Parks</li>
                      <li>Used by Police Departments, Fire Departments, and Professional Rescuers across the Country</li>
                      <li>Used by Public Schools, Private Schools, Colleges, and Universities around the World</li>
                      <li>Used by Members of Prominent Youth Camp Organizations such as YMCA, Boy Scouts of America, Girl Scouts of America, American Camp Association (ACA), Easterseals, American Diabetes Foundation, Christian Camps Association, Jewish Camps Association, State Youth Camp Associations, and many more!</li>
                      <li>Used by Prominent Swimming Organizations for Swim Schools, Learn to Swim Programs, Swim Leagues, Swim Teams, Swim Coaches</li>
                      <li>Used by Public and Private Beaches, Swimming Pools, Aquatic Centers, and many more!</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Question 2 */}
                <AccordionItem value="q2" className="border rounded-lg p-2 shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold text-primary-dark px-4 hover:no-underline">
                    What benefits does Lifeguard Training Academy have for employers?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-base">
                    <p className="mb-4">Employers worldwide consistently select Lifeguard Training Academy for our internationally acclaimed certification training program, recognized across all 50 U.S. states, every U.S. territory, and in 46 countries globally.</p>
                    <p className="mb-4">Lifeguard Training Academy makes Water Safety Swim Instructor certification training for your staff ultra-convenient and super easy. Choose your desired courses and dates, and we'll bring professional instructors directly to your facility for on-site, flexible training that starts when you're ready. Our instructor-led Water Safety Swim Instructor sessions culminate with immediate certification card issuance, simplifying the process to make your staff instructors without the hassle of bureaucracy.</p>
                    <p className="mb-4">Our Lifeguard Certification Training model is designed to significantly reduce accidents through comprehensive, advanced, and specialized courses led only by experienced professionals. This on-site approach not only enhances protection but ensures better preparation and offers iron-clad legal liability protection.</p>
                    <p className="mb-4">We're committed to quality assurance, meticulous training documentation, and providing the best legal liability protection, all backed by our lowest price guarantee. With Lifeguard Training Academy, you'll save time and money, benefit from free remedial training, cancellations credit, and upgrades to Lifeguard-Youth Camp Certification, all free from bureaucratic and administrative fees.</p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Question 3 */}
                <AccordionItem value="q3" className="border rounded-lg p-2 shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold text-primary-dark px-4 hover:no-underline">
                    What are the steps to becoming a licensed lifeguard?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-base">
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        <strong>Register</strong> by submitting the form on our registration page.
                      </li>
                      <li>
                        <strong>Purchase our home-study course.</strong>
                        <p>After registering for your course online or over the phone, you will automatically receive payment instructions at your registered email address (check both your inbox and spam folder). Simply follow the payment instructions in that email to purchase your online Home-Study Course.</p>
                      </li>
                      <li>
                        <strong>Login & begin your course.</strong>
                        <p>Upon receipt of your online Home-Study course payment, we will promptly email to you an authorized username and password in an email entitled 'Start Your Course'.</p>
                      </li>
                      <li>
                        <strong>Complete the home-study course.</strong>
                        <p>You may work in the comfort and convenience of your own home, and progress at your own pace. You may stop and start the Home-Study Course as often as you like (except while you are taking a timed exam).</p>
                      </li>
                      <li>
                        <strong>Schedule your instructor-led training class.</strong>
                        <p>You must complete all online Home-Study course requirements before requesting an Instructor-Led Training Class.</p>
                        <p>Once you have successfully completed all your online Home-Study Course requirements, you should contact your Instructor or Lifeguard Training Academy.</p>
                      </li>
                      <li>
                        <strong>Pay for your instructor-led training class.</strong>
                        <p>Pay your local instructor directly for your Instructor-Led Training Class. Acceptable payment methods often include:</p>
                        <ul className="list-disc pl-6">
                          <li>Cash</li>
                          <li>Personal, Certified or business check</li>
                          <li>Money order</li>
                          <li>Bank wire transfer</li>
                          <li>Electronic payment methods (Zelle, Venmo, Remitly, Revolut, Wise, Western Union, Apple Pay, and Google Wallet).</li>
                        </ul>
                        <p>Ask your Instructor or Lifeguard Training Academy for detailed payment instructions.</p>
                      </li>
                      <li>
                        <strong>Attend instructor-led training class.</strong>
                        <p>At Instructor-Led Training Class, you must successfully complete:</p>
                        <ol className="list-decimal pl-6">
                          <li>All course required physical skills no less than 3 times under the direct supervision of your Instructor; and,</li>
                          <li>Lifeguard, CPR and First Aid closed-book, instructor proctored, written Final Exam with a correct score of 90% or higher.</li>
                        </ol>
                      </li>
                      <li>
                        <strong>Complete instructor-led training class.</strong>
                        <p>At the conclusion of your Instructor-Led Training Class, you and your Instructor will fill-out and sign your Certification Request Form (CRF). If you are under the age of 18, your parent or legal guardian must sign the form for you. This form verifies that you successfully completed all course requirements for certification.</p>
                      </li>
                      <li>
                        <strong>Request your certification card.</strong>
                        <p>Upload your completed and signed CRF to your Lifeguard Training Academy Profile in the section titled 'Upload Certification Forms'.</p>
                        <p>Lastly, from within your Profile, check the box titled 'Issue my certification' or notify your Instructor that you have completed all course requirements.</p>
                      </li>
                      <li>
                        <strong>Receive your certification card.</strong>
                        <p>Upon satisfying all the course requirements detailed in the steps above, we will promptly email to you a hi-resolution digital image of your certification card – usually within 3 days. However, if you are in a hurry, just give us a call and we'll try to expedite the process for you.</p>
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Question 4 */}
                <AccordionItem value="q4" className="border rounded-lg p-2 shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold text-primary-dark px-4 hover:no-underline">
                    What is the minimum age to become a Lifeguard?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-base">
                    <p>U.S. Department of Labor permits Lifeguard certification candidates to enroll in a Lifeguard certification course at 14.5 years old, and a Lifeguard certification can be issued to the candidate when the candidate is 15 years or older. It should be noted that all 15 year old Lifeguards must work with another person who is at least 16 years old. A 15 year old Lifeguard cannot work alone.</p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Question 5 */}
                <AccordionItem value="q5" className="border rounded-lg p-2 shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold text-primary-dark px-4 hover:no-underline">
                    When I purchase a course, what does it include?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-base">
                    <p className="font-semibold mb-2">Included in your purchase:</p>
                    <p>Your purchase includes all course required materials for certification, which include textbooks, instructional videos, exams, forms, and certification card. If the course description specifically states it, then your purchase will also include the course required Instructor-Led Training Class.</p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Question 6 */}
                <AccordionItem value="q6" className="border rounded-lg p-2 shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold text-primary-dark px-4 hover:no-underline">
                    Where can I find technical support?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-base">
                    <p className="mb-4">After purchasing your course, are you having one of these technical problems with our website:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The purchased login Username & Password that we provided to you, do not enable you to login to Lifeguard Training Academy or access your online course materials; or</li>
                      <li>Once logged in to Lifeguard Training Academy, a Lifeguard Training Academy website feature or function is not working properly?</li>
                    </ul>
                    <p className="mt-4">If yes, go to our contact web page and email us a request for assistance. Be sure to include your contact information, so we can promptly get in touch with you.</p>
                    <p className="mt-4 italic">Please, keep in mind that our Technical Support team is not capable of answering any sales or customer service questions.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary-dark font-heading">Still Have Questions?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Our team is ready to help you with any additional questions you may have about our certification programs.
            </p>
            <Link href="/contact-register">
              <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-semibold text-lg transition duration-300 cursor-pointer">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;