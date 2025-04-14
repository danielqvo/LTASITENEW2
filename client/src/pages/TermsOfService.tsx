import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { PhoneNumberCanvas, EmailAddressCanvas } from '../components/ContactCanvas';

export function TermsOfServicePage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Effective Date: 04-01-2025</p>
        
        <p>Welcome to Lifeguard Training Academy ("Company", "we", "us", or "our"). These Terms and Conditions govern your use of our services, including lifeguard certification programs, training courses, and related services (collectively, the "Services").</p>
        <p>By enrolling in our programs or accessing our Services, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Participants must meet the minimum age, physical, and skill prerequisites for each certification course.</li>
          <li>Proof of age and/or prior certifications may be required.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Registration and Payment</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Full payment is required at the time of registration unless otherwise agreed upon in writing.</li>
          <li>Payments are non-refundable unless a course is cancelled by the Company.</li>
          <li>Group bookings may be eligible for discounts or require a deposit.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. Cancellations, Refunds, and Rescheduling</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Refunds are available only if requested within 7 days of purchase. After 7 days, no refunds will be issued for any reason.</li>
          <li>No refunds will be issued for no-shows or failure to complete the course.</li>
          <li>The Company reserves the right to cancel or reschedule a course due to low enrollment, weather, facility issues, or instructor availability. In such cases, participants will be offered a full refund or rescheduling option.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Course Completion and Certification</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Certifications are awarded upon successful completion of all course requirements, including attendance, written exams, and practical skills.</li>
          <li>Failure to meet the requirements will result in no certification and no refund.</li>
          <li>Certifications may be issued through third-party providers and are subject to their terms.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Code of Conduct</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Participants are expected to behave professionally and respectfully.</li>
          <li>The Company reserves the right to remove participants for disruptive, unsafe, or inappropriate behavior with no refund.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Assumption of Risk and Liability Waiver</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Participation in aquatic training carries inherent risks.</li>
          <li>By enrolling, participants assume all risk of injury or death and agree to hold harmless Lifeguard Training Academy, its employees, contractors, and affiliates.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. Medical Disclosure</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Participants must disclose any medical conditions or limitations that may impact their ability to safely participate.</li>
          <li>The Company may request a physician's clearance if deemed necessary.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Intellectual Property</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>All course materials, manuals, videos, and content are the intellectual property of Lifeguard Training Academy and/or its licensors.</li>
          <li>Unauthorized reproduction or distribution is prohibited.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">9. Privacy Policy</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>We collect personal information for the purpose of registration, certification, and communication.</li>
          <li>We will not sell or share your information with third parties except as required by certifying agencies or law.</li>
          <li>For more information, please see our <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link>.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">10. Dispute Resolution</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Any disputes arising from these Terms shall be governed by the laws of the state of Florida.</li>
          <li>Parties agree to attempt informal resolution before pursuing mediation, arbitration, or legal action.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">11. Modifications</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>The Company reserves the right to modify these Terms at any time.</li>
          <li>Continued use of our Services after changes constitutes acceptance of the new Terms.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Information</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us:</p>
        <p className="font-medium mt-2">Lifeguard Training Academy<br />
        Email: <EmailAddressCanvas color="black" fontSize={16} /><br />
        Phone: <PhoneNumberCanvas color="black" fontSize={16} /></p>
      </div>
    </div>
  );
}

export default TermsOfServicePage;