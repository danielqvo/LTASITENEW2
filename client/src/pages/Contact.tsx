import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PhoneNumberCanvas } from '../components/ContactCanvas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { courseCategories } from '../../../shared/courseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { InlineWidget } from 'react-calendly';
import { useRecaptcha } from '../hooks/use-recaptcha';
import { isRecaptchaEnabled } from '../lib/env';

type CourseCategory = {
  id: string;
  title: string;
  icon: string;
  iconBgColor: string;
  courses: Course[];
};

type Course = {
  id: string;
  title: string;
  description?: string;
};

interface CourseOption {
  id: string;
  title: string;
  categoryTitle: string;
}

// Flatten all courses into a single array for the dropdown
const allCourses: CourseOption[] = courseCategories.flatMap((category: CourseCategory) => 
  category.courses.map((course: Course) => ({
    id: `${category.id}/${course.id}`,
    title: course.title,
    categoryTitle: category.title
  }))
);

// Define base schema with common fields
const baseFormSchema = {
  name: z.string().optional(), // honeypot field
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  cellPhone: z.string().min(1, "Cell phone number is required"),
  workPhone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
};

// Option A: Individual schema (adds course interest and certification date)
const optionASchema = z.object({
  ...baseFormSchema,
  courseInterest: z.string().min(1, "Please select a course"),
  certificationDate: z.string().min(1, "Certification date is required"),
  employerBusinessName: z.string().optional(),
  employerContactName: z.string().optional(),
  employerPhone: z.string().optional(),
  employerEmail: z.string().optional().or(z.string().email("Invalid email address")),
  formType: z.literal('individual'),
});

// Option B: Employer schema (adds company and specialized fields)
const optionBSchema = z.object({
  ...baseFormSchema,
  companyName: z.string().min(1, "Company name is required"),
  courseQuantities: z.record(z.string(), z.string()).optional(),
  trainingMethod: z.string().min(1, "Please select a training method"),
  certificationDate: z.string().min(1, "Certification date is required"),
  pricingMethod: z.string().min(1, "Please select a pricing method"),
  formType: z.literal('employer'),
});

// Option C: General contact schema
const optionCSchema = z.object({
  ...baseFormSchema,
  employerBusinessName: z.string().optional(),
  employerContactName: z.string().optional(),
  employerPhone: z.string().optional(),
  employerEmail: z.string().optional().or(z.string().email("Invalid email address")),
  formType: z.literal('contact'),
});

// Combined schema that can validate any of the three options
const formSchema = z.discriminatedUnion('formType', [
  optionASchema,
  optionBSchema,
  optionCSchema,
]);

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formType, setFormType] = useState<'individual' | 'employer' | 'contact'>('individual');
  const [showCalendly, setShowCalendly] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const { verifyRecaptcha, isVerifying, recaptchaError } = useRecaptcha();
  
  // Initialize the form with the appropriate defaults based on form type
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      name: '', // honeypot field
      email: '',
      cellPhone: '',
      workPhone: '',
      whatsappNumber: '',
      city: '',
      state: '',
      country: '',
      message: '',
      consent: false,
      formType: 'individual',
      ...(formType === 'individual' && {
        courseInterest: '',
        certificationDate: '',
        employerBusinessName: '',
        employerContactName: '',
        employerPhone: '',
        employerEmail: '',
      }),
      ...(formType === 'employer' && {
        companyName: '',
        trainingMethod: '',
        certificationDate: '',
        pricingMethod: '',
        courseQuantities: {},
      }),
      ...(formType === 'contact' && {
        employerBusinessName: '',
        employerContactName: '',
        employerPhone: '',
        employerEmail: '',
      }),
    },
  });
  
  // Update form values when form type changes
  const handleFormTypeChange = (newType: 'individual' | 'employer' | 'contact') => {
    setFormType(newType);
    form.setValue('formType', newType);
  };

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Check if honeypot field is filled
    if (data.name && data.name.trim() !== '') {
      console.log('Honeypot triggered - bot submission blocked');
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll contact you shortly.",
        });
        form.reset();
        setIsSubmitting(false);
      }, 1000); // Simulate network delay
      return;
    }
    
    try {
      // If reCAPTCHA is enabled, verify first
      let recaptchaToken = null;
      
      if (isRecaptchaEnabled) {
        console.log('Attempting reCAPTCHA verification...');
        try {
          recaptchaToken = await verifyRecaptcha('contact_form_submit');
          
          if (!recaptchaToken) {
            console.warn('reCAPTCHA verification failed but continuing for development purposes');
            // In production, uncomment the following code to block form submission
            /*
            toast({
              title: "Error",
              description: recaptchaError || "Failed to verify you are human. Please try again.",
              variant: "destructive",
            });
            setIsSubmitting(false);
            return;
            */
          } else {
            console.log('reCAPTCHA verification successful');
          }
        } catch (recaptchaErr) {
          console.error('reCAPTCHA error:', recaptchaErr);
          // We'll allow the form to submit for development purposes
        }
      } else {
        console.log('reCAPTCHA is disabled, proceeding without verification');
      }
      
      // Additional logging for the selected form data
      console.log(`Form submission for ${formType} route`, data);
      
      // Prepare course information for webhook if applicable
      let courseInfo = {};
      
      // Type guard to check if formType is individual and data has courseInterest
      if (formType === 'individual' && 'courseInterest' in data && data.courseInterest) {
        // Get the course title from our custom courses list
        const customCourses = [
          { id: 'lifeguard', title: 'Lifeguard' },
          { id: 'lifeguard_renewal', title: 'Lifeguard Renewal / Recertification' },
          { id: 'lifeguard_instructor', title: 'Lifeguard Instructor' },
          { id: 'lifeguard_instructor_renewal', title: 'Lifeguard Instructor Renewal / Recertification' },
          { id: 'lifeguard_instructor_trainer', title: 'Lifeguard Instructor Trainer' },
          { id: 'lifeguard_instructor_trainer_renewal', title: 'Lifeguard Instructor Trainer Renewal / Recertification' },
          { id: 'basic_water_safety', title: 'Basic Water Safety' },
          { id: 'basic_water_safety_renewal', title: 'Basic Water Safety Renewal / Recertification' },
          { id: 'water_safety_swim_instructor', title: 'Water Safety Swim Instructor' },
          { id: 'water_safety_swim_instructor_renewal', title: 'Water Safety Swim Instructor Renewal / Recertification' },
          { id: 'water_safety_swim_instructor_trainer', title: 'Water Safety Swim Instructor Trainer' },
          { id: 'water_safety_swim_instructor_trainer_renewal', title: 'Water Safety Swim Instructor Trainer Renewal / Recertification' },
          { id: 'water_safety_swim_instructor_trainer_director', title: 'Water Safety Swim Instructor Trainer Director' },
          { id: 'water_safety_swim_instructor_trainer_director_renewal', title: 'Water Safety Swim Instructor Trainer Director Recertification / Renewal' },
          { id: 'cpr_first_aid', title: 'CPR & First Aid' },
          { id: 'cpr_first_aid_renewal', title: 'CPR & First Aid Renewal / Recertification' },
          { id: 'bloodborne_pathogens', title: 'Bloodborne Pathogens' },
          { id: 'oxygen_administrator', title: 'Oxygen Administrator' },
          { id: 'cpr_first_aid_instructor', title: 'CPR & First Aid Instructor' },
          { id: 'cpr_first_aid_instructor_renewal', title: 'CPR & First Aid Instructor Renewal / Recertification' },
          { id: 'oxygen_administrator_instructor', title: 'Oxygen Administrator Instructor' },
          { id: 'oxygen_administrator_instructor_renewal', title: 'Oxygen Administrator Instructor Recertification' },
          { id: 'certified_pool_operator', title: 'Certified Pool Operator' }
        ];
        
        const selectedCourse = customCourses.find(course => course.id === data.courseInterest);
        if (selectedCourse) {
          courseInfo = {
            courseId: selectedCourse.id,
            courseTitle: selectedCourse.title
          };
        }
      }
      
      // Prepare employer course quantities if applicable
      // Type guard to check if formType is employer and data has courseQuantities
      const employerCoursesData = formType === 'employer' && 'courseQuantities' in data && data.courseQuantities
        ? Object.entries(data.courseQuantities)
            .filter(([, quantity]) => parseInt(quantity as string, 10) > 0)
            .map(([courseId, quantity]) => {
              // Get the course title from our custom courses list
              const customCourses = [
                { id: 'lifeguard', title: 'Lifeguard' },
                { id: 'lifeguard_renewal', title: 'Lifeguard Renewal / Recertification' },
                { id: 'lifeguard_instructor', title: 'Lifeguard Instructor' },
                { id: 'lifeguard_instructor_renewal', title: 'Lifeguard Instructor Renewal / Recertification' },
                { id: 'lifeguard_instructor_trainer', title: 'Lifeguard Instructor Trainer' },
                { id: 'lifeguard_instructor_trainer_renewal', title: 'Lifeguard Instructor Trainer Renewal / Recertification' },
                { id: 'basic_water_safety', title: 'Basic Water Safety' },
                { id: 'basic_water_safety_renewal', title: 'Basic Water Safety Renewal / Recertification' },
                { id: 'water_safety_swim_instructor', title: 'Water Safety Swim Instructor' },
                { id: 'water_safety_swim_instructor_renewal', title: 'Water Safety Swim Instructor Renewal / Recertification' },
                { id: 'water_safety_swim_instructor_trainer', title: 'Water Safety Swim Instructor Trainer' },
                { id: 'water_safety_swim_instructor_trainer_renewal', title: 'Water Safety Swim Instructor Trainer Renewal / Recertification' },
                { id: 'water_safety_swim_instructor_trainer_director', title: 'Water Safety Swim Instructor Trainer Director' },
                { id: 'water_safety_swim_instructor_trainer_director_renewal', title: 'Water Safety Swim Instructor Trainer Director Recertification / Renewal' },
                { id: 'cpr_first_aid', title: 'CPR & First Aid' },
                { id: 'cpr_first_aid_renewal', title: 'CPR & First Aid Renewal / Recertification' },
                { id: 'bloodborne_pathogens', title: 'Bloodborne Pathogens' },
                { id: 'oxygen_administrator', title: 'Oxygen Administrator' },
                { id: 'cpr_first_aid_instructor', title: 'CPR & First Aid Instructor' },
                { id: 'cpr_first_aid_instructor_renewal', title: 'CPR & First Aid Instructor Renewal / Recertification' },
                { id: 'oxygen_administrator_instructor', title: 'Oxygen Administrator Instructor' },
                { id: 'oxygen_administrator_instructor_renewal', title: 'Oxygen Administrator Instructor Recertification' },
                { id: 'certified_pool_operator', title: 'Certified Pool Operator' }
              ];
              
              const course = customCourses.find(c => c.id === courseId);
              
              return {
                courseId,
                courseTitle: course?.title || 'Unknown Course',
                quantity: parseInt(quantity as string, 10)
              };
            }) 
        : [];
      
      // Create a formatted summary of the form submission
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const formattedTime = currentDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
      
      // Determine which route was selected based on formType
      let routeDescription = "";
      if (formType === 'individual') {
        routeDescription = "I'm an individual and I want to register for a course for myself or family member";
      } else if (formType === 'employer') {
        routeDescription = "I'm an employer or instructor looking to train my staff";
      } else if (formType === 'contact') {
        routeDescription = "I do not fit these categories and I would like to contact you about something else";
      }
      
      // Build the summary with all form fields
      let formSummary = `Contact us/register form submitted ${formattedDate} at ${formattedTime}.\n\n`;
      formSummary += `User selected: ${routeDescription}\n\n`;
      formSummary += `Contact Information:\n`;
      formSummary += `- Name: ${data.firstName} ${data.lastName}\n`;
      formSummary += `- Email: ${data.email}\n`;
      formSummary += `- Cell Phone: ${data.cellPhone}\n`;
      
      if (data.workPhone) {
        formSummary += `- Work Phone: ${data.workPhone}\n`;
      }
      
      if (data.whatsappNumber) {
        formSummary += `- WhatsApp Number: ${data.whatsappNumber}\n`;
      }
      
      formSummary += `- Location: ${data.city}, ${data.state}, ${data.country}\n\n`;
      
      // Add form-type specific information
      // Define our custom courses list once to avoid duplication
      const customCourses = [
        { id: 'lifeguard', title: 'Lifeguard' },
        { id: 'lifeguard_renewal', title: 'Lifeguard Renewal / Recertification' },
        { id: 'lifeguard_instructor', title: 'Lifeguard Instructor' },
        { id: 'lifeguard_instructor_renewal', title: 'Lifeguard Instructor Renewal / Recertification' },
        { id: 'lifeguard_instructor_trainer', title: 'Lifeguard Instructor Trainer' },
        { id: 'lifeguard_instructor_trainer_renewal', title: 'Lifeguard Instructor Trainer Renewal / Recertification' },
        { id: 'basic_water_safety', title: 'Basic Water Safety' },
        { id: 'basic_water_safety_renewal', title: 'Basic Water Safety Renewal / Recertification' },
        { id: 'water_safety_swim_instructor', title: 'Water Safety Swim Instructor' },
        { id: 'water_safety_swim_instructor_renewal', title: 'Water Safety Swim Instructor Renewal / Recertification' },
        { id: 'water_safety_swim_instructor_trainer', title: 'Water Safety Swim Instructor Trainer' },
        { id: 'water_safety_swim_instructor_trainer_renewal', title: 'Water Safety Swim Instructor Trainer Renewal / Recertification' },
        { id: 'water_safety_swim_instructor_trainer_director', title: 'Water Safety Swim Instructor Trainer Director' },
        { id: 'water_safety_swim_instructor_trainer_director_renewal', title: 'Water Safety Swim Instructor Trainer Director Recertification / Renewal' },
        { id: 'cpr_first_aid', title: 'CPR & First Aid' },
        { id: 'cpr_first_aid_renewal', title: 'CPR & First Aid Renewal / Recertification' },
        { id: 'bloodborne_pathogens', title: 'Bloodborne Pathogens' },
        { id: 'oxygen_administrator', title: 'Oxygen Administrator' },
        { id: 'cpr_first_aid_instructor', title: 'CPR & First Aid Instructor' },
        { id: 'cpr_first_aid_instructor_renewal', title: 'CPR & First Aid Instructor Renewal / Recertification' },
        { id: 'oxygen_administrator_instructor', title: 'Oxygen Administrator Instructor' },
        { id: 'oxygen_administrator_instructor_renewal', title: 'Oxygen Administrator Instructor Recertification' },
        { id: 'certified_pool_operator', title: 'Certified Pool Operator' }
      ];
      
      // Type guard for individual form
      if (formType === 'individual' && 'courseInterest' in data && 'certificationDate' in data) {
        const courseTitle = customCourses.find(c => c.id === data.courseInterest)?.title || data.courseInterest;
        
        formSummary += `Course Information:\n`;
        formSummary += `- Course of Interest: ${courseTitle}\n`;
        formSummary += `- Need Certification by: ${data.certificationDate}\n\n`;
      } 
      // Type guard for employer form
      else if (formType === 'employer' && 
               'companyName' in data && 
               'trainingMethod' in data && 
               'pricingMethod' in data && 
               'certificationDate' in data) {
        
        // Use type assertion to tell TypeScript that we have checked these properties exist
        const employerData = data as {
          companyName: string;
          trainingMethod: string;
          pricingMethod: string;
          certificationDate: string;
          courseQuantities?: Record<string, string>;
        };
        
        formSummary += `Company Information:\n`;
        formSummary += `- Company Name: ${employerData.companyName}\n\n`;
        
        // Training and pricing preferences
        let trainingMethod = "";
        if (employerData.trainingMethod === 'instructor_to_you') {
          trainingMethod = "Our instructors go to you";
        } else if (employerData.trainingMethod === 'staff_instructor') {
          trainingMethod = "We make one of your staff an instructor";
        } else if (employerData.trainingMethod === 'online_hybrid') {
          trainingMethod = "Online home-study plus live training";
        }
        
        let pricingMethod = "";
        if (employerData.pricingMethod === 'lowest_price') {
          pricingMethod = "Lowest Price Guarantee";
        } else if (employerData.pricingMethod === 'unpublished_discount') {
          pricingMethod = "Unpublished Special Discounts";
        } else if (employerData.pricingMethod === 'inflation_buster') {
          pricingMethod = "Inflation Buster";
        } else if (employerData.pricingMethod === 'published_instructor_to_you') {
          pricingMethod = "Published Prices - Our instructors go to you";
        } else if (employerData.pricingMethod === 'published_staff_instructor') {
          pricingMethod = "Published Prices - We make one of your staff an instructor";
        }
        
        formSummary += `Training and Pricing Preferences:\n`;
        formSummary += `- Preferred Training Method: ${trainingMethod}\n`;
        formSummary += `- Preferred Pricing Method: ${pricingMethod}\n`;
        formSummary += `- Need Certification by: ${employerData.certificationDate}\n\n`;
        
        // Course quantities - make sure it exists and has content
        if (employerData.courseQuantities) {
          const quantities = Object.entries(employerData.courseQuantities)
            .filter(([, quantity]) => parseInt(quantity as string, 10) > 0)
            .map(([courseId, quantity]) => {
              const courseTitle = customCourses.find(c => c.id === courseId)?.title || courseId;
              return `- ${courseTitle}: ${quantity}`;
            });
          
          if (quantities.length > 0) {
            formSummary += `Requested Courses:\n`;
            formSummary += quantities.join('\n');
            formSummary += '\n\n';
          }
        }
      }
      
      // Add additional information if provided
      if ('employerBusinessName' in data && data.employerBusinessName) {
        formSummary += `Employer Information:\n`;
        formSummary += `- Employer's Business Name: ${data.employerBusinessName}\n`;
        
        if ('employerContactName' in data && data.employerContactName) {
          formSummary += `- Employer's Contact Person/Manager: ${data.employerContactName}\n`;
        }
        
        if ('employerPhone' in data && data.employerPhone) {
          formSummary += `- Employer's Phone: ${data.employerPhone}\n`;
        }
        
        if ('employerEmail' in data && data.employerEmail) {
          formSummary += `- Employer's Email: ${data.employerEmail}\n`;
        }
        
        formSummary += '\n';
      }
      
      // Add message/comments if provided
      if (data.message) {
        formSummary += `Additional Information:\n${data.message}\n\n`;
      }
      
      // Add consent statement
      formSummary += `User has agreed to the terms and conditions.\n`;
      
      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          formType,
          courseInfo,
          employerCoursesData: employerCoursesData.length > 0 ? employerCoursesData : undefined,
          formSummary,
          recaptchaToken
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Store form data for Calendly
        setFormData(data);
        
        // Show Calendly after successful form submission
        setShowCalendly(true);
        
        toast({
          title: "Success!",
          description: "Form submitted. Please schedule your appointment.",
        });
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      // For development purposes, we'll simulate a successful submission
      // Remove this in production and use the actual API response
      console.log('Development mode: Proceeding to Calendly scheduling');
      setFormData(data);
      setShowCalendly(true);
      
      console.error('Contact form error:', error);
      toast({
        title: "Form Submitted",
        description: "Please schedule your appointment now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-primary text-white p-8">
              <h1 className="text-3xl font-bold text-center">CONTACT US/REGISTER</h1>
              <h2 className="text-xl font-semibold text-center mt-4">BEST CUSTOMER SERVICE IN THE INDUSTRY</h2>
              
              <div className="mt-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-bold sm:w-1/4">CHAT TEAM:</span>
                  <span className="sm:w-3/4">Immediate answers. No waiting. Use chat module now. 24 hours/day, 7-days/week.</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-bold sm:w-1/4">PHONE TEAM:</span>
                  <span className="sm:w-3/4 flex items-center">
                    <PhoneNumberCanvas /> (USA) – 9:00 am – 10:00 pm ET, 7-Days a Week.
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {showCalendly ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Schedule Your Appointment</h2>
                  <p className="mb-6">Please select a time that works for you. Your information has been pre-filled.</p>
                  
                  <InlineWidget
                    url="https://calendly.com/lifeguardtrainingacademy/30min"
                    prefill={{
                      name: formData ? `${formData.firstName} ${formData.lastName}` : '',
                      email: formData ? formData.email : '',
                      customAnswers: {
                        a1: formData ? formData.cellPhone : '',
                      }
                    }}
                    styles={{
                      height: '700px'
                    }}
                  />
                  
                  <div className="mt-6">
                    <Button 
                      onClick={() => {
                        setShowCalendly(false);
                        form.reset();
                      }}
                      variant="outline"
                      className="mr-4"
                    >
                      Back to Form
                    </Button>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Please select one option:</h3>
                      <RadioGroup 
                        defaultValue="individual"
                        onValueChange={(value) => handleFormTypeChange(value as 'individual' | 'employer' | 'contact')}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                          <RadioGroupItem value="individual" id="individual" />
                          <label htmlFor="individual" className="text-sm font-medium leading-none cursor-pointer">
                            I'm an individual and I want to register for a course for myself or family member
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                          <RadioGroupItem value="employer" id="employer" />
                          <label htmlFor="employer" className="text-sm font-medium leading-none cursor-pointer">
                            I'm an employer or instructor looking to train my staff
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                          <RadioGroupItem value="contact" id="contact" />
                          <label htmlFor="contact" className="text-sm font-medium leading-none cursor-pointer">
                            I do not fit these categories and I would like to contact you about something else
                          </label>
                        </div>
                      </RadioGroup>
                    </div>
                  
                    <div className="mb-4 text-sm text-gray-600">
                      <p>Fields marked with <span className="text-red-500">*</span> are required</p>
                    </div>
                    
                    {/* Honeypot field - hidden from users but bots will likely fill it */}
                    <div style={{ display: 'none' }}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-red-500">*</span> First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-red-500">*</span> Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-red-500">*</span> Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cellPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-red-500">*</span> Cell Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Cell phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="workPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Work phone number (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="whatsappNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number</FormLabel>
                            <FormControl>
                              <Input placeholder="WhatsApp number (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-red-500">*</span> City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-red-500">*</span> State</FormLabel>
                            <FormControl>
                              <Input placeholder="State/Province" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-red-500">*</span> Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Fields for Option A (Individual) */}
                    {formType === 'individual' && (
                      <>
                        <FormField
                          control={form.control}
                          name="courseInterest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><span className="text-red-500">*</span> Course of Interest</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a course" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-w-[350px] md:max-w-none">
                                  <SelectItem value="lifeguard" className="whitespace-normal py-2 pr-2">Lifeguard</SelectItem>
                                  <SelectItem value="lifeguard_renewal" className="whitespace-normal py-2 pr-2">Lifeguard Renewal / Recertification</SelectItem>
                                  <SelectItem value="lifeguard_instructor" className="whitespace-normal py-2 pr-2">Lifeguard Instructor</SelectItem>
                                  <SelectItem value="lifeguard_instructor_renewal" className="whitespace-normal py-2 pr-2">Lifeguard Instructor Renewal / Recertification</SelectItem>
                                  <SelectItem value="lifeguard_instructor_trainer" className="whitespace-normal py-2 pr-2">Lifeguard Instructor Trainer</SelectItem>
                                  <SelectItem value="lifeguard_instructor_trainer_renewal" className="whitespace-normal py-2 pr-2">Lifeguard Instructor Trainer Renewal / Recertification</SelectItem>
                                  <SelectItem value="basic_water_safety" className="whitespace-normal py-2 pr-2">Basic Water Safety</SelectItem>
                                  <SelectItem value="basic_water_safety_renewal" className="whitespace-normal py-2 pr-2">Basic Water Safety Renewal / Recertification</SelectItem>
                                  <SelectItem value="water_safety_swim_instructor" className="whitespace-normal py-2 pr-2">Water Safety Swim Instructor</SelectItem>
                                  <SelectItem value="water_safety_swim_instructor_renewal" className="whitespace-normal py-2 pr-2">Water Safety Swim Instructor Renewal / Recertification</SelectItem>
                                  <SelectItem value="water_safety_swim_instructor_trainer" className="whitespace-normal py-2 pr-2">Water Safety Swim Instructor Trainer</SelectItem>
                                  <SelectItem value="water_safety_swim_instructor_trainer_renewal" className="whitespace-normal py-2 pr-2">Water Safety Swim Instructor Trainer Renewal / Recertification</SelectItem>
                                  <SelectItem value="water_safety_swim_instructor_trainer_director" className="whitespace-normal py-2 pr-2">Water Safety Swim Instructor Trainer Director</SelectItem>
                                  <SelectItem value="water_safety_swim_instructor_trainer_director_renewal" className="whitespace-normal py-2 pr-2">Water Safety Swim Instructor Trainer Director Recertification / Renewal</SelectItem>
                                  <SelectItem value="cpr_first_aid" className="whitespace-normal py-2 pr-2">CPR & First Aid</SelectItem>
                                  <SelectItem value="cpr_first_aid_renewal" className="whitespace-normal py-2 pr-2">CPR & First Aid Renewal / Recertification</SelectItem>
                                  <SelectItem value="bloodborne_pathogens" className="whitespace-normal py-2 pr-2">Bloodborne Pathogens</SelectItem>
                                  <SelectItem value="oxygen_administrator" className="whitespace-normal py-2 pr-2">Oxygen Administrator</SelectItem>
                                  <SelectItem value="cpr_first_aid_instructor" className="whitespace-normal py-2 pr-2">CPR & First Aid Instructor</SelectItem>
                                  <SelectItem value="cpr_first_aid_instructor_renewal" className="whitespace-normal py-2 pr-2">CPR & First Aid Instructor Renewal / Recertification</SelectItem>
                                  <SelectItem value="oxygen_administrator_instructor" className="whitespace-normal py-2 pr-2">Oxygen Administrator Instructor</SelectItem>
                                  <SelectItem value="oxygen_administrator_instructor_renewal" className="whitespace-normal py-2 pr-2">Oxygen Administrator Instructor Recertification</SelectItem>
                                  <SelectItem value="certified_pool_operator" className="whitespace-normal py-2 pr-2">Certified Pool Operator</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="certificationDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><span className="text-red-500">*</span> Need Certification by this Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    {/* Fields for Option B (Employer) */}
                    {formType === 'employer' && (
                      <>
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><span className="text-red-500">*</span> Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      
                        <div className="border-t border-gray-200 pt-6 pb-2 mt-4">
                          <h3 className="text-lg font-bold mb-4">What Courses are you Interested In?</h3>
                          <p className="text-sm text-gray-500 mb-4">Please indicate how many of each course you need by entering a number.</p>
                          
                          <div className="grid grid-cols-1 gap-4">
                            {[
                              { id: 'lifeguard', title: 'Lifeguard' },
                              { id: 'lifeguard_renewal', title: 'Lifeguard Renewal / Recertification' },
                              { id: 'lifeguard_instructor', title: 'Lifeguard Instructor' },
                              { id: 'lifeguard_instructor_renewal', title: 'Lifeguard Instructor Renewal / Recertification' },
                              { id: 'lifeguard_instructor_trainer', title: 'Lifeguard Instructor Trainer' },
                              { id: 'lifeguard_instructor_trainer_renewal', title: 'Lifeguard Instructor Trainer Renewal / Recertification' },
                              { id: 'basic_water_safety', title: 'Basic Water Safety' },
                              { id: 'basic_water_safety_renewal', title: 'Basic Water Safety Renewal / Recertification' },
                              { id: 'water_safety_swim_instructor', title: 'Water Safety Swim Instructor' },
                              { id: 'water_safety_swim_instructor_renewal', title: 'Water Safety Swim Instructor Renewal / Recertification' },
                              { id: 'water_safety_swim_instructor_trainer', title: 'Water Safety Swim Instructor Trainer' },
                              { id: 'water_safety_swim_instructor_trainer_renewal', title: 'Water Safety Swim Instructor Trainer Renewal / Recertification' },
                              { id: 'water_safety_swim_instructor_trainer_director', title: 'Water Safety Swim Instructor Trainer Director' },
                              { id: 'water_safety_swim_instructor_trainer_director_renewal', title: 'Water Safety Swim Instructor Trainer Director Recertification / Renewal' },
                              { id: 'cpr_first_aid', title: 'CPR & First Aid' },
                              { id: 'cpr_first_aid_renewal', title: 'CPR & First Aid Renewal / Recertification' },
                              { id: 'bloodborne_pathogens', title: 'Bloodborne Pathogens' },
                              { id: 'oxygen_administrator', title: 'Oxygen Administrator' },
                              { id: 'cpr_first_aid_instructor', title: 'CPR & First Aid Instructor' },
                              { id: 'cpr_first_aid_instructor_renewal', title: 'CPR & First Aid Instructor Renewal / Recertification' },
                              { id: 'oxygen_administrator_instructor', title: 'Oxygen Administrator Instructor' },
                              { id: 'oxygen_administrator_instructor_renewal', title: 'Oxygen Administrator Instructor Recertification' },
                              { id: 'certified_pool_operator', title: 'Certified Pool Operator' }
                            ].map((course) => (
                              <div key={course.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3">
                                <div className="mb-2 sm:mb-0 sm:w-2/3">
                                  <label className="font-medium">{course.title}</label>
                                </div>
                                <div className="flex items-center">
                                  <span className="mr-2 text-sm">Quantity:</span>
                                  <Input 
                                    type="number" 
                                    min="0"
                                    placeholder="0"
                                    className="w-20 text-right"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const courseQuantities = form.getValues('courseQuantities') || {};
                                      form.setValue('courseQuantities', {
                                        ...courseQuantities,
                                        [course.id]: value
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="trainingMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><span className="text-red-500">*</span> Which training method do you prefer?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a training method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-w-[350px] md:max-w-none">
                                  <SelectItem value="instructor_to_you" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">1. Our instructors go to you</span>
                                      <p className="font-normal mt-1">Train your group on the date you reserve<br />(Most convenient, but most expensive)</p>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="staff_instructor" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">2. We make one of your staff an instructor</span>
                                      <p className="font-normal mt-1">You conduct the training<br />(slash your price by up to 85% - MOST POPULAR)</p>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="online_hybrid" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">3. Online home-study plus live training</span>
                                      <p className="font-normal mt-1">Instructor-led training in online classroom<br />(available in some areas)</p>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="certificationDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><span className="text-red-500">*</span> Date by which you need your certification(s):</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pricingMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><span className="text-red-500">*</span> Which pricing method do you prefer?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a pricing method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-w-[350px] md:max-w-none">
                                  <SelectItem value="lowest_price" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">1. Lowest Price Guarantee</span>
                                      <p className="font-normal mt-1">Price match the lowest price in your area less an additional 25%</p>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="unpublished_discount" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">2. Unpublished Special Discounts</span>
                                      <p className="font-normal mt-1">Ask your account specialist which unpublished special discounts you qualify for</p>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="inflation_buster" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">3. Inflation Buster</span>
                                      <p className="font-normal mt-1">Pay 90% of what you paid last year when you recertify</p>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="published_instructor_to_you" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">4. Published Prices - Our instructors go to you</span>
                                      <p className="font-normal mt-1">Train your group on the date you reserve<br />(Most convenient, but most expensive)</p>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="published_staff_instructor" className="whitespace-normal py-2 pr-2">
                                    <div className="text-sm">
                                      <span className="font-bold">5. Published Prices - We make one of your staff an instructor</span>
                                      <p className="font-normal mt-1">You conduct the training<br />(slash your price by up to 85% - MOST POPULAR)</p>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please share any additional information or questions you have"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Additional Employer Information for individual registrants or general contact */}
                    {(formType === 'individual' || formType === 'contact') && (
                      <div className="border-t border-gray-200 pt-6 pb-2">
                        <h3 className="text-lg font-medium mb-4">Additional Employer Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="employerBusinessName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Employer's Business Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Business name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="employerContactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Employer's Contact Person/Manager's Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Contact name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <FormField
                            control={form.control}
                            name="employerPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Employer's Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Employer phone" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="employerEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Employer's Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Employer email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              <span className="text-red-500">*</span> Required. You must check this box to authorize Lifeguard Training Academy and its agents to be able to contact you via email, phone, voice mail, text message, and other means to provide you with service, support, and marketing info. To stop receiving communications from us, simply email or text "STOP" to us. By checking this box, you agree to our <a href="/terms-of-service" className="text-primary underline" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy-policy" className="text-primary underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto" 
                      disabled={isSubmitting || isVerifying}
                    >
                      {isVerifying ? "Verifying..." : isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}