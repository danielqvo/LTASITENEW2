import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { PhoneNumberCanvas, EmailAddressCanvas } from '../components/ContactCanvas';

export function PrivacyPolicyPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Effective Date: 04-01-2025</p>
        
        <p>Lifeguard Training Academy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or participate in our training programs.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p>We collect information that you provide directly to us, including:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Contact information (name, email address, phone number, mailing address)</li>
          <li>Date of birth and age verification</li>
          <li>Emergency contact information</li>
          <li>Medical information relevant to participation in our courses</li>
          <li>Payment information (processed through secure payment processors)</li>
          <li>Course preferences and registration details</li>
          <li>Certifications and qualifications</li>
        </ul>

        <p>We may also automatically collect certain information when you visit our website, including:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>IP address and device information</li>
          <li>Browser type and settings</li>
          <li>Date and time of visits</li>
          <li>Pages viewed and features used</li>
          <li>Referral sources</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Process registrations and payments</li>
          <li>Verify eligibility for courses</li>
          <li>Create and maintain certification records</li>
          <li>Communicate with you about courses, schedule changes, and updates</li>
          <li>Verify your identity</li>
          <li>Improve our services and website</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Send promotional materials and newsletters (with opt-out options)</li>
          <li>Comply with legal obligations</li>
          <li>Protect against fraud and unauthorized transactions</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Information Sharing and Disclosure</h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Certification issuing bodies (to verify your certification)</li>
          <li>Service providers (payment processors, hosting providers, email services)</li>
          <li>Professional advisors (legal, accounting, insurance)</li>
          <li>Law enforcement or government agencies when required by law</li>
          <li>Course instructors and facility staff (limited to necessary information)</li>
        </ul>

        <p>We will not sell, rent, or lease your personal information to third parties for marketing purposes without your explicit consent.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Data Security</h2>
        <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights and Choices</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access, correct, or update your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request deletion of your information (subject to legal obligations and legitimate business purposes)</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Children's Privacy</h2>
        <p>Our website and services are not directed to children under 13. For participants under 18, we require parental/guardian consent. We do not knowingly collect personal information from children under 13 without parental consent.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Effective Date" at the top of this Privacy Policy. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
        <p className="font-medium mt-2">Lifeguard Training Academy<br />
        Email: <EmailAddressCanvas color="black" fontSize={16} /><br />
        Phone: <PhoneNumberCanvas color="black" fontSize={16} /></p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;