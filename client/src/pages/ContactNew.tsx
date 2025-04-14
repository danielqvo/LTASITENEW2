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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { courseCategories } from '../../../shared/courseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Types
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

// Form schemas
const individualFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  name: z.string().optional(), // honeypot field
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  cellPhone: z.string().min(1, "Cell phone is required"),
  workPhone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  courseInterest: z.string().min(1, "Please select a course"),
  certificationDate: z.string().min(1, "Please select a date"),
  employerName: z.string().optional(),
  employerContact: z.string().optional(),
  employerPhone: z.string().optional(),
  employerEmail: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
});

const employerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  name: z.string().optional(), // honeypot field
  companyName: z.string().min(1, "Company name is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  cellPhone: z.string().min(1, "Cell phone is required"),
  workPhone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  // Multiple courses will be handled differently in the UI
  courseCounts: z.record(z.string()),
  certificationDate: z.string().min(1, "Please select a date"),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
});

const otherFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  name: z.string().optional(), // honeypot field
  companyName: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  cellPhone: z.string().min(1, "Cell phone is required"),
  workPhone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Please provide a message"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
});

// Define types for the form values
type IndividualFormValues = z.infer<typeof individualFormSchema>;
type EmployerFormValues = z.infer<typeof employerFormSchema>;
type OtherFormValues = z.infer<typeof otherFormSchema>;

export default function ContactNew() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("individual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Individual form
  const individualForm = useForm<IndividualFormValues>({
    resolver: zodResolver(individualFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      name: '', // honeypot field
      city: '',
      state: '',
      country: '',
      cellPhone: '',
      workPhone: '',
      whatsapp: '',
      email: '',
      courseInterest: '',
      certificationDate: '',
      employerName: '',
      employerContact: '',
      employerPhone: '',
      employerEmail: '',
      message: '',
      consent: false,
    },
  });
  
  // Initialize empty courseCounts object with all courses
  const initialCourseCounts: Record<string, string> = {};
  allCourses.forEach(course => {
    initialCourseCounts[course.id] = '';
  });
  
  // Employer form
  const employerForm = useForm<EmployerFormValues>({
    resolver: zodResolver(employerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      name: '', // honeypot field
      companyName: '',
      city: '',
      state: '',
      country: '',
      cellPhone: '',
      workPhone: '',
      whatsapp: '',
      email: '',
      courseCounts: initialCourseCounts,
      certificationDate: '',
      message: '',
      consent: false,
    },
  });
  
  // Other form
  const otherForm = useForm<OtherFormValues>({
    resolver: zodResolver(otherFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      name: '', // honeypot field
      companyName: '',
      city: '',
      state: '',
      country: '',
      cellPhone: '',
      workPhone: '',
      whatsapp: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
    },
  });

  // Handle honeypot submission for botts
  const handleBotSubmission = () => {
    console.log('Honeypot triggered - bot submission blocked');
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll contact you shortly.",
      });
      setIsSubmitting(false);
    }, 1000); // Simulate network delay
  };

  async function onSubmitIndividual(data: IndividualFormValues) {
    setIsSubmitting(true);
    
    // Check if honeypot field is filled
    if (data.name && data.name.trim() !== '') {
      return handleBotSubmission();
    }
    
    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType: 'individual', ...data }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll contact you shortly.",
        });
        individualForm.reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmitEmployer(data: EmployerFormValues) {
    setIsSubmitting(true);
    
    // Check if honeypot field is filled
    if (data.name && data.name.trim() !== '') {
      return handleBotSubmission();
    }
    
    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType: 'employer', ...data }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll contact you shortly.",
        });
        employerForm.reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmitOther(data: OtherFormValues) {
    setIsSubmitting(true);
    
    // Check if honeypot field is filled
    if (data.name && data.name.trim() !== '') {
      return handleBotSubmission();
    }
    
    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType: 'other', ...data }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll contact you shortly.",
        });
        otherForm.reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
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
              <p className="text-center text-lg mb-6">Please select the option that best describes your inquiry:</p>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                  <TabsTrigger value="individual" className="text-sm md:text-base">
                    Individual Registration
                  </TabsTrigger>
                  <TabsTrigger value="employer" className="text-sm md:text-base">
                    Employer/Group Registration
                  </TabsTrigger>
                  <TabsTrigger value="other" className="text-sm md:text-base">
                    Other Inquiries
                  </TabsTrigger>
                </TabsList>
                
                {/* Individual Registration Form */}
                <TabsContent value="individual">
                  <Card>
                    <CardHeader>
                      <CardTitle>Individual Registration Form</CardTitle>
                      <CardDescription>
                        Use this form if you're registering for a course for yourself or a family member
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...individualForm}>
                        <form onSubmit={individualForm.handleSubmit(onSubmitIndividual)} className="space-y-6">
                          <div className="mb-4 text-sm text-gray-600">
                            <p>Fields marked with <span className="text-red-500">*</span> are required</p>
                          </div>
                          
                          {/* Honeypot field - hidden from users but bots will likely fill it */}
                          <div style={{ display: 'none' }}>
                            <FormField
                              control={individualForm.control}
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
                              control={individualForm.control}
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
                              control={individualForm.control}
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={individualForm.control}
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
                              control={individualForm.control}
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
                              control={individualForm.control}
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={individualForm.control}
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
                            
                            <FormField
                              control={individualForm.control}
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
                              control={individualForm.control}
                              name="whatsapp"
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
                          
                          <FormField
                            control={individualForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel><span className="text-red-500">*</span> Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email address" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={individualForm.control}
                            name="courseInterest"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel><span className="text-red-500">*</span> Select Your Course</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {allCourses.map((course: CourseOption) => (
                                      <SelectItem key={course.id} value={course.id}>
                                        {course.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={individualForm.control}
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
                          
                          <h3 className="text-lg font-semibold mt-6 mb-3">Additional Employer Information</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={individualForm.control}
                              name="employerName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Your Employer's Business Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Employer's business name (optional)" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={individualForm.control}
                              name="employerContact"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Your Employer's Contact Person/Manager's Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Manager's name (optional)" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={individualForm.control}
                              name="employerPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Your Employer's Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Employer's phone (optional)" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={individualForm.control}
                              name="employerEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Your Employer's Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Employer's email (optional)" type="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={individualForm.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Information</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please provide any additional details (optional)"
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={individualForm.control}
                            name="consent"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    <span className="text-red-500">*</span> Required. You must check this box to authorize Lifeguard Training Academy and its agents to be able to contact you via email, phone, voice mail, text message, and other means to provide you with service, support, and marketing info. To stop receiving communications from us, simply email or text "STOP" to us.
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Book Your Appointment</h3>
                            <p>After submitting this form, you can book your appointment on our calendar:</p>
                            <div className="mt-4 flex justify-center">
                              <Button
                                type="button"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => window.open('https://calendly.com/lifeguardpro', '_blank')}
                              >
                                Open Calendly Booking
                              </Button>
                            </div>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Submit Registration"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Employer Registration Form */}
                <TabsContent value="employer">
                  <Card>
                    <CardHeader>
                      <CardTitle>Employer/Group Registration Form</CardTitle>
                      <CardDescription>
                        Use this form if you're an employer or instructor looking to train your staff
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...employerForm}>
                        <form onSubmit={employerForm.handleSubmit(onSubmitEmployer)} className="space-y-6">
                          <div className="mb-4 text-sm text-gray-600">
                            <p>Fields marked with <span className="text-red-500">*</span> are required</p>
                          </div>
                          
                          {/* Honeypot field - hidden from users but bots will likely fill it */}
                          <div style={{ display: 'none' }}>
                            <FormField
                              control={employerForm.control}
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
                              control={employerForm.control}
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
                              control={employerForm.control}
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
                          
                          <FormField
                            control={employerForm.control}
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={employerForm.control}
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
                              control={employerForm.control}
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
                              control={employerForm.control}
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={employerForm.control}
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
                            
                            <FormField
                              control={employerForm.control}
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
                              control={employerForm.control}
                              name="whatsapp"
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
                          
                          <FormField
                            control={employerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel><span className="text-red-500">*</span> Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email address" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="border p-4 rounded-md bg-gray-50">
                            <h3 className="font-semibold text-lg mb-4">Course Requirements</h3>
                            <p className="mb-4">Please indicate how many participants you need for each course:</p>
                            
                            <div className="space-y-4">
                              {courseCategories.map((category) => (
                                <div key={category.id} className="mb-4">
                                  <h4 className="font-medium mb-2">{category.title}</h4>
                                  <div className="grid grid-cols-1 gap-3">
                                    {category.courses.map((course) => {
                                      const courseId = `${category.id}/${course.id}`;
                                      return (
                                        <div key={courseId} className="flex items-center">
                                          <span className="flex-1">{course.title}</span>
                                          <FormField
                                            control={employerForm.control}
                                            name={`courseCounts.${courseId}` as any}
                                            render={({ field }) => (
                                              <FormItem className="w-20">
                                                <FormControl>
                                                  <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder="0"
                                                    {...field}
                                                  />
                                                </FormControl>
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <FormField
                            control={employerForm.control}
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
                          
                          <FormField
                            control={employerForm.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Requirements</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please provide any additional details about your training needs (optional)"
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={employerForm.control}
                            name="consent"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    <span className="text-red-500">*</span> Required. You must check this box to authorize Lifeguard Training Academy and its agents to be able to contact you via email, phone, voice mail, text message, and other means to provide you with service, support, and marketing info. To stop receiving communications from us, simply email or text "STOP" to us.
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Submit Group Registration"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Other Inquiries Form */}
                <TabsContent value="other">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Contact Form</CardTitle>
                      <CardDescription>
                        Use this form for general inquiries or if you don't fit into the other categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...otherForm}>
                        <form onSubmit={otherForm.handleSubmit(onSubmitOther)} className="space-y-6">
                          <div className="mb-4 text-sm text-gray-600">
                            <p>Fields marked with <span className="text-red-500">*</span> are required</p>
                          </div>
                          
                          {/* Honeypot field - hidden from users but bots will likely fill it */}
                          <div style={{ display: 'none' }}>
                            <FormField
                              control={otherForm.control}
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
                              control={otherForm.control}
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
                              control={otherForm.control}
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
                          
                          <FormField
                            control={otherForm.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Company name (if applicable)" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={otherForm.control}
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
                              control={otherForm.control}
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
                              control={otherForm.control}
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={otherForm.control}
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
                            
                            <FormField
                              control={otherForm.control}
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
                              control={otherForm.control}
                              name="whatsapp"
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
                          
                          <FormField
                            control={otherForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel><span className="text-red-500">*</span> Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email address" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={otherForm.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel><span className="text-red-500">*</span> Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="Subject of your inquiry" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={otherForm.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel><span className="text-red-500">*</span> Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please provide details about your inquiry"
                                    className="min-h-[150px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={otherForm.control}
                            name="consent"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    <span className="text-red-500">*</span> Required. You must check this box to authorize Lifeguard Training Academy and its agents to be able to contact you via email, phone, voice mail, text message, and other means to provide you with service, support, and marketing info. To stop receiving communications from us, simply email or text "STOP" to us.
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}