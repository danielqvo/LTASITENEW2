import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import fs from 'fs/promises';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('reCAPTCHA secret key is missing');
      
      // In development environment, we'll simulate success
      const isDevelopment = process.env.NODE_ENV !== 'production';
      if (isDevelopment) {
        console.log('Development mode: Simulating successful reCAPTCHA verification');
        return true;
      }
      
      return false;
    }

    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      });

      const data = await response.json() as { success: boolean; score?: number };
      
      // For v3, we also check the score (0.0 to 1.0)
      if (data.success && data.score && data.score >= 0.5) {
        console.log('reCAPTCHA verification successful with score:', data.score);
        return true;
      } else {
        console.log('reCAPTCHA verification failed:', data);
        
        // In development environment, we'll simulate success even on failure
        const isDevelopment = process.env.NODE_ENV !== 'production';
        if (isDevelopment) {
          console.log('Development mode: Allowing despite reCAPTCHA verification failure');
          return true;
        }
        
        return false;
      }
    } catch (fetchError) {
      console.error('Network error verifying reCAPTCHA:', fetchError);
      
      // In development environment, we'll simulate success
      const isDevelopment = process.env.NODE_ENV !== 'production';
      if (isDevelopment) {
        console.log('Development mode: Simulating successful reCAPTCHA verification due to network error');
        return true;
      }
      
      return false;
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    
    // In development environment, we'll simulate success
    const isDevelopment = process.env.NODE_ENV !== 'production';
    if (isDevelopment) {
      console.log('Development mode: Simulating successful reCAPTCHA verification due to error');
      return true;
    }
    
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Default webhook URL if none is set
  const DEFAULT_WEBHOOK_URL = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY5MDYzZjA0MzE1MjZlNTUzNTUxMzAi_pc';
  
  // File path to store the webhook URL
  const webhookConfigPath = path.join(__dirname, '..', 'webhook-config.json');
  
  // Function to get the current webhook URL
  async function getWebhookUrl(): Promise<string> {
    try {
      // Check if the config file exists
      try {
        const configData = await fs.readFile(webhookConfigPath, 'utf-8');
        const config = JSON.parse(configData);
        return config.webhookUrl || DEFAULT_WEBHOOK_URL;
      } catch (err) {
        // If file doesn't exist or has invalid content, return default
        console.log('Using default webhook URL');
        return DEFAULT_WEBHOOK_URL;
      }
    } catch (error) {
      console.error('Error getting webhook URL:', error);
      return DEFAULT_WEBHOOK_URL;
    }
  }
  
  // Function to update the webhook URL
  async function updateWebhookUrl(url: string): Promise<void> {
    try {
      await fs.writeFile(
        webhookConfigPath, 
        JSON.stringify({ webhookUrl: url, updatedAt: new Date().toISOString() }, null, 2)
      );
      console.log('Webhook URL updated successfully');
    } catch (error) {
      console.error('Error updating webhook URL:', error);
      throw error;
    }
  }
  
  // API route to get the current webhook URL
  app.get('/api/webhook-url', async (req, res) => {
    try {
      const url = await getWebhookUrl();
      return res.json({ success: true, url });
    } catch (error) {
      console.error('Error in get-webhook-url endpoint:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to get webhook URL' 
      });
    }
  });
  
  // API route to update the webhook URL
  app.post('/api/webhook-url', async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: 'Valid webhook URL is required' 
        });
      }
      
      await updateWebhookUrl(url);
      
      return res.json({ 
        success: true, 
        message: 'Webhook URL updated successfully' 
      });
    } catch (error) {
      console.error('Error in update-webhook-url endpoint:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update webhook URL' 
      });
    }
  });
  
  // API route to check reCAPTCHA status
  app.get('/api/recaptcha/status', (req, res) => {
    const hasRecaptchaKey = !!process.env.RECAPTCHA_SECRET_KEY;
    return res.json({ 
      enabled: hasRecaptchaKey 
    });
  });
  
  // Test route for sending data to Pabbly webhook
  app.get('/api/test-webhook', async (req, res) => {
    try {
      // Check if a specific route was requested in the query parameters
      const { route } = req.query;
      
      // Create test data for each form type
      const routeAData = {
        // Route information
        route: 'Route A',
        formType: 'individual',
        
        // Personal information - consistent across all routes
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        cellPhone: '555-123-4567',
        workPhone: '555-987-6543',
        whatsappNumber: '555-123-4567',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        
        // Course selection for individual
        courseId: 'lifeguard/lifeguard',
        courseTitle: 'Lifeguard',
        courseCategory: 'Lifeguard Certification Courses',
        
        // Appointment info
        certificationDate: '2025-05-15',
        
        // Message field
        message: 'I would like to register for the Lifeguard course.',
        consent: true,
        
        // Metadata
        submittedAt: new Date().toISOString(),
        formSource: 'Test Data - Route A'
      };
      
      const routeBData = {
        // Route information
        route: 'Route B',
        formType: 'employer',
        
        // Personal information - consistent across all routes
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@poolcompany.com',
        cellPhone: '555-222-3333',
        workPhone: '555-333-4444',
        whatsappNumber: '555-222-3333',
        city: 'Orlando',
        state: 'Florida',
        country: 'USA',
        
        // Employer information
        companyName: 'Sunshine Pools & Recreation',
        businessWebsite: 'www.sunshinepools.com',
        companyType: 'Pool Management Company',
        employerBusinessName: 'Sunshine Pools & Recreation',
        employerContactName: 'Sarah Johnson',
        employerPhone: '555-222-3333',
        employerEmail: 'sarah.johnson@poolcompany.com',
        
        // Course quantities with sequential numbering
        'course_lifeguard/lifeguard_quantity': 1,
        'course_lifeguard/lifeguard-renewal_quantity': 2, 
        'course_lifeguard-instructor/lifeguard-instructor_quantity': 3,
        'course_lifeguard-instructor/lifeguard-instructor-recert_quantity': 4,
        'course_lifeguard-instructor/lifeguard-instructor-trainer_quantity': 5,
        'course_lifeguard-instructor/lifeguard-instructor-trainer-recert_quantity': 6,
        'course_swim-instructor/basic-water-safety_quantity': 7,
        'course_swim-instructor/basic-water-safety-recert_quantity': 8,
        'course_swim-instructor/water-safety-swim-instructor_quantity': 9,
        'course_swim-instructor/water-safety-swim-instructor-recert_quantity': 10,
        'course_swim-instructor-trainer/water-safety-swim-instructor-trainer_quantity': 11,
        'course_swim-instructor-trainer/water-safety-swim-instructor-trainer-recert_quantity': 12,
        'course_swim-instructor-trainer/water-safety-swim-instructor-trainer-director_quantity': 13,
        'course_cpr/cpr-first-aid_quantity': 14,
        'course_cpr/cpr-first-aid-recert_quantity': 15,
        'course_cpr/bloodborne-pathogens_quantity': 16,
        'course_cpr/oxygen-administrator_quantity': 17,
        'course_cpr-instructor/cpr-first-aid-instructor_quantity': 18,
        'course_cpr-instructor/cpr-first-aid-instructor-recert_quantity': 19,
        'course_cpr-instructor/oxygen-administrator-instructor_quantity': 20,
        'course_cpr-instructor/oxygen-administrator-instructor-recert_quantity': 21,
        'course_pool-operator/certified-pool-operator_quantity': 22,
        
        // Training options
        trainingMethod: 'instructor_to_you',
        pricingMethod: 'lowest_price',
        certificationDate: '2025-06-01',
        
        // Additional info
        additionalInfo: 'We need to train our staff before summer season begins.',
        consent: true,
        
        // Metadata
        submittedAt: new Date().toISOString(),
        formSource: 'Test Data - Route B'
      };
      
      const routeCData = {
        // Route information
        route: 'Route C',
        formType: 'contact',
        
        // Personal information - consistent across all routes
        firstName: 'Michael',
        lastName: 'Williams',
        email: 'michael.williams@example.com',
        cellPhone: '555-444-5555',
        workPhone: '555-444-6666',
        whatsappNumber: '555-444-5555',
        city: 'Tampa',
        state: 'Florida',
        country: 'USA',
        
        // Employer information (used in Route C)
        employerBusinessName: 'City Parks & Recreation',
        employerContactName: 'Michael Williams',
        employerPhone: '555-444-5555',
        employerEmail: 'michael.williams@example.com',
        
        // Message field
        message: 'I would like information about becoming a Lifeguard Instructor.',
        consent: true,
        
        // Metadata
        submittedAt: new Date().toISOString(),
        formSource: 'Test Data - Route C'
      };
      
      // Select which data to send based on the route query parameter
      let dataToSend;
      let routeLabel;
      
      if (route === 'a' || route === 'A') {
        dataToSend = routeAData;
        routeLabel = 'Route A (Individual Registration)';
      } else if (route === 'b' || route === 'B') {
        dataToSend = routeBData;
        routeLabel = 'Route B (Employer Registration)';
      } else if (route === 'c' || route === 'C') {
        dataToSend = routeCData;
        routeLabel = 'Route C (General Contact)';
      } else if (route === 'all' || route === 'ALL') {
        // Special case: send all possible variables in one request
        routeLabel = 'Complete All-Variables Test';
        
        // Create comprehensive form summary
        const formSummary = `Contact us/register form submitted ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}.

COMPREHENSIVE WEBHOOK TEST - ALL VARIABLES

Contact Information:
- Name: ${routeAData.firstName} ${routeAData.lastName}
- Email: ${routeAData.email}
- Cell Phone: ${routeAData.cellPhone}
- Work Phone: ${routeAData.workPhone}
- WhatsApp Number: ${routeAData.whatsappNumber}
- Location: ${routeAData.city}, ${routeAData.state}, ${routeAData.country}

Course Information (Individual):
- Course of Interest: ${routeAData.courseTitle}
- Course Category: ${routeAData.courseCategory}
- Need Certification by: ${routeAData.certificationDate}

Company Information (Employer):
- Company Name: ${routeBData.companyName}
- Company Website: ${routeBData.businessWebsite}
- Company Type: ${routeBData.companyType}

Employer Information:
- Employer's Business Name: ${routeBData.employerBusinessName}
- Employer's Contact Person/Manager: ${routeBData.employerContactName}
- Employer's Phone: ${routeBData.employerPhone}
- Employer's Email: ${routeBData.employerEmail}

Training and Pricing Preferences:
- Training Method: Our instructors go to you
- Pricing Method: Lowest Price Guarantee

Requested Courses:
- Lifeguard: 5
- Lifeguard Renewal: 3
- Shallow Pool Lifeguard: 2
- Shallow Pool Lifeguard Renewal: 1
- Junior Lifeguard: 4
- Lifeguard Instructor: 3
- Lifeguard Instructor Renewal: 2
- Lifeguard Instructor Trainer: 1
- Lifeguard Instructor Trainer Renewal: 1
- Basic Water Safety: 10
- Basic Water Safety Renewal: 5
- Water Safety Swim Instructor: 4
- Water Safety Swim Instructor Renewal: 2
- Water Safety Swim Instructor Trainer: 3
- Water Safety Swim Instructor Trainer Renewal: 1
- Water Safety Swim Instructor Trainer Director: 1
- Water Safety Swim Instructor Trainer Director Renewal: 1
- CPR & First Aid: 15
- CPR & First Aid Renewal: 8
- CPR & First Aid Instructor: 3
- CPR & First Aid Instructor Renewal: 2
- Bloodborne Pathogens: 20
- Oxygen Administrator: 12
- Oxygen Administrator Instructor: 5
- Certified Pool Operator: 7

Additional Information:
This is a comprehensive webhook test with all possible variables populated.

User has agreed to the terms and conditions.`;
        
        // Create a single comprehensive payload with all variables
        const allVariablesPayload = {
          // Route information
          route: 'Route All',
          formType: 'all',
          
          // Personal information
          firstName: routeAData.firstName,
          lastName: routeAData.lastName,
          email: routeAData.email,
          cellPhone: routeAData.cellPhone,
          workPhone: routeAData.workPhone,
          whatsappNumber: routeAData.whatsappNumber,
          city: routeAData.city,
          state: routeAData.state,
          country: routeAData.country,
          
          // Individual route variables
          courseInterest: 'lifeguard',
          certificationDate: routeAData.certificationDate,
          courseId: routeAData.courseId,
          courseTitle: routeAData.courseTitle,
          courseCategory: routeAData.courseCategory,
          courseInfo: {
            courseId: 'lifeguard',
            courseTitle: 'Lifeguard',
            courseCategoryTitle: 'Lifeguard Certification'
          },
          
          // Employer route variables
          companyName: routeBData.companyName,
          businessWebsite: routeBData.businessWebsite,
          companyType: routeBData.companyType,
          trainingMethod: 'instructor_to_you',
          pricingMethod: 'lowest_price',
          
          // Course quantities - All possible courses
          // Lifeguard courses
          'course_lifeguard/lifeguard_quantity': 5,
          'course_lifeguard/lifeguard-renewal_quantity': 3,
          'course_lifeguard/shallow-pool-lifeguard_quantity': 2,
          'course_lifeguard/shallow-pool-lifeguard-renewal_quantity': 1,
          'course_lifeguard/junior-lifeguard_quantity': 4,
          
          // Lifeguard instructor courses
          'course_lifeguard-instructor/lifeguard-instructor_quantity': 3,
          'course_lifeguard-instructor/lifeguard-instructor-recert_quantity': 2,
          'course_lifeguard-instructor/lifeguard-instructor-trainer_quantity': 1,
          'course_lifeguard-instructor/lifeguard-instructor-trainer-recert_quantity': 1,
          
          // Water safety and swim instructor courses
          'course_swim-instructor/basic-water-safety_quantity': 10,
          'course_swim-instructor/basic-water-safety-recert_quantity': 5,
          'course_swim-instructor/water-safety-swim-instructor_quantity': 4,
          'course_swim-instructor/water-safety-swim-instructor-recert_quantity': 2,
          
          // Swim instructor trainer courses
          'course_swim-instructor-trainer/water-safety-swim-instructor-trainer_quantity': 3,
          'course_swim-instructor-trainer/water-safety-swim-instructor-trainer-recert_quantity': 1,
          'course_swim-instructor-trainer/water-safety-swim-instructor-trainer-director_quantity': 1,
          'course_swim-instructor-trainer/water-safety-swim-instructor-trainer-director-recert_quantity': 1,
          
          // CPR and first aid courses
          'course_cpr/cpr-first-aid_quantity': 15,
          'course_cpr/cpr-first-aid-renewal_quantity': 8,
          'course_cpr/cpr-first-aid-instructor_quantity': 3,
          'course_cpr/cpr-first-aid-instructor-recert_quantity': 2,
          
          // Specialized safety courses
          'course_safety/bloodborne-pathogens_quantity': 20,
          'course_safety/oxygen-administrator_quantity': 12,
          'course_safety/oxygen-administrator-instructor_quantity': 5,
          'course_safety/certified-pool-operator_quantity': 7,
          
          // Employer course data (all course types)
          employerCoursesData: [
            // Lifeguard courses
            { courseId: 'lifeguard', courseTitle: 'Lifeguard', quantity: 5 },
            { courseId: 'lifeguard_renewal', courseTitle: 'Lifeguard Renewal', quantity: 3 },
            { courseId: 'shallow_pool_lifeguard', courseTitle: 'Shallow Pool Lifeguard', quantity: 2 },
            { courseId: 'shallow_pool_lifeguard_renewal', courseTitle: 'Shallow Pool Lifeguard Renewal', quantity: 1 },
            { courseId: 'junior_lifeguard', courseTitle: 'Junior Lifeguard', quantity: 4 },
            
            // Lifeguard instructor courses
            { courseId: 'lifeguard_instructor', courseTitle: 'Lifeguard Instructor', quantity: 3 },
            { courseId: 'lifeguard_instructor_recert', courseTitle: 'Lifeguard Instructor Renewal', quantity: 2 },
            { courseId: 'lifeguard_instructor_trainer', courseTitle: 'Lifeguard Instructor Trainer', quantity: 1 },
            { courseId: 'lifeguard_instructor_trainer_recert', courseTitle: 'Lifeguard Instructor Trainer Renewal', quantity: 1 },
            
            // Water safety and swim instructor courses
            { courseId: 'basic_water_safety', courseTitle: 'Basic Water Safety', quantity: 10 },
            { courseId: 'basic_water_safety_recert', courseTitle: 'Basic Water Safety Renewal', quantity: 5 },
            { courseId: 'water_safety_swim_instructor', courseTitle: 'Water Safety Swim Instructor', quantity: 4 },
            { courseId: 'water_safety_swim_instructor_recert', courseTitle: 'Water Safety Swim Instructor Renewal', quantity: 2 },
            
            // Swim instructor trainer courses
            { courseId: 'water_safety_swim_instructor_trainer', courseTitle: 'Water Safety Swim Instructor Trainer', quantity: 3 },
            { courseId: 'water_safety_swim_instructor_trainer_recert', courseTitle: 'Water Safety Swim Instructor Trainer Renewal', quantity: 1 },
            { courseId: 'water_safety_swim_instructor_trainer_director', courseTitle: 'Water Safety Swim Instructor Trainer Director', quantity: 1 },
            { courseId: 'water_safety_swim_instructor_trainer_director_recert', courseTitle: 'Water Safety Swim Instructor Trainer Director Renewal', quantity: 1 },
            
            // CPR and first aid courses
            { courseId: 'cpr_first_aid', courseTitle: 'CPR & First Aid', quantity: 15 },
            { courseId: 'cpr_first_aid_renewal', courseTitle: 'CPR & First Aid Renewal', quantity: 8 },
            { courseId: 'cpr_first_aid_instructor', courseTitle: 'CPR & First Aid Instructor', quantity: 3 },
            { courseId: 'cpr_first_aid_instructor_recert', courseTitle: 'CPR & First Aid Instructor Renewal', quantity: 2 },
            
            // Specialized safety courses
            { courseId: 'bloodborne_pathogens', courseTitle: 'Bloodborne Pathogens', quantity: 20 },
            { courseId: 'oxygen_administrator', courseTitle: 'Oxygen Administrator', quantity: 12 },
            { courseId: 'oxygen_administrator_instructor', courseTitle: 'Oxygen Administrator Instructor', quantity: 5 },
            { courseId: 'certified_pool_operator', courseTitle: 'Certified Pool Operator', quantity: 7 }
          ],
          
          // Course quantities in new format (all courses)
          courseQuantities: {
            // Lifeguard courses
            'lifeguard': '5',
            'lifeguard_renewal': '3',
            'shallow_pool_lifeguard': '2',
            'shallow_pool_lifeguard_renewal': '1',
            'junior_lifeguard': '4',
            
            // Lifeguard instructor courses
            'lifeguard_instructor': '3',
            'lifeguard_instructor_recert': '2',
            'lifeguard_instructor_trainer': '1',
            'lifeguard_instructor_trainer_recert': '1',
            
            // Water safety and swim instructor courses
            'basic_water_safety': '10',
            'basic_water_safety_recert': '5',
            'water_safety_swim_instructor': '4',
            'water_safety_swim_instructor_recert': '2',
            
            // Swim instructor trainer courses
            'water_safety_swim_instructor_trainer': '3',
            'water_safety_swim_instructor_trainer_recert': '1',
            'water_safety_swim_instructor_trainer_director': '1',
            'water_safety_swim_instructor_trainer_director_recert': '1',
            
            // CPR and first aid courses
            'cpr_first_aid': '15',
            'cpr_first_aid_renewal': '8',
            'cpr_first_aid_instructor': '3',
            'cpr_first_aid_instructor_recert': '2',
            
            // Specialized safety courses
            'bloodborne_pathogens': '20',
            'oxygen_administrator': '12',
            'oxygen_administrator_instructor': '5',
            'certified_pool_operator': '7'
          },
          
          // Contact route variables
          employerBusinessName: routeCData.employerBusinessName,
          employerContactName: routeCData.employerContactName, 
          employerPhone: routeCData.employerPhone,
          employerEmail: routeCData.employerEmail,
          
          // Message and consent
          message: 'This is a comprehensive webhook test with all possible variables populated.',
          consent: true,
          
          // Form summary
          formSummary: formSummary,
          
          // Metadata
          submittedAt: new Date().toISOString(),
          formSource: 'Complete Webhook Test - All Variables'
        };
        
        // Get the webhook URL
        const webhookUrl = await getWebhookUrl();
        
        // Send the comprehensive data to the webhook
        console.log('Sending ALL VARIABLES in a single webhook request...');
        
        try {
          const webhookResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allVariablesPayload)
          });
          
          const responseText = await webhookResponse.text();
          
          return res.json({
            success: webhookResponse.ok,
            status: webhookResponse.status,
            message: 'All variables sent in a single webhook request',
            note: 'All possible form variables were included in a single request with "Route All" designation',
            response: responseText,
            data: allVariablesPayload
          });
        } catch (err) {
          console.error('Error sending webhook:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to send webhook',
            error: err instanceof Error ? err.message : String(err)
          });
        }
      } else {
        // If no valid route specified, show options
        return res.json({
          message: 'Please specify which route to test by adding ?route=X to the URL',
          examples: [
            '/api/test-webhook?route=A - Test individual registration',
            '/api/test-webhook?route=B - Test employer registration',
            '/api/test-webhook?route=C - Test general contact form',
            '/api/test-webhook?route=ALL - Test ALL routes with complete data (comprehensive test)'
          ]
        });
      }
      
      // Get the configured webhook URL
      const webhookUrl = await getWebhookUrl();
      
      // Send the data to webhook
      console.log(`Sending test data for ${routeLabel} to Pabbly webhook...`);
      
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
        
        const responseText = await webhookResponse.text();
        
        return res.json({
          success: webhookResponse.ok,
          status: webhookResponse.status,
          response: responseText,
          message: `Test webhook sent for ${routeLabel}`,
          data: dataToSend
        });
        
      } catch (err: unknown) {
        console.error('Error sending webhook:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to send webhook',
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    } catch (error: unknown) {
      console.error('Error in test-webhook endpoint:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // API route to handle newsletter subscription
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Valid email is required' });
      }
      
      // In a real implementation, this would store the email in a database
      // For now, just return success
      return res.status(200).json({ message: 'Subscription successful' });
    } catch (error: unknown) {
      console.error('Error in subscribe endpoint:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // API route to handle contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      // Check for honeypot field - if filled, silently succeed but don't process
      if (req.body.name && req.body.name.trim() !== '') {
        console.log('Honeypot triggered - suspected bot submission blocked');
        return res.status(200).json({ 
          success: true, 
          message: 'Contact form submitted successfully'
        });
      }
      
      const { 
        formType, firstName, lastName, email, cellPhone, 
        courseInterest, certificationDate, message, consent,
        recaptchaToken
      } = req.body;
      
      // Check if reCAPTCHA should be enabled
      const isRecaptchaEnabled = !!process.env.RECAPTCHA_SECRET_KEY;
      
      // Verify reCAPTCHA token if the feature is enabled
      if (isRecaptchaEnabled) {
        if (!recaptchaToken) {
          console.log('Missing reCAPTCHA token');
          
          // In development environment, we'll allow forms without reCAPTCHA
          const isDevelopment = process.env.NODE_ENV !== 'production';
          if (!isDevelopment) {
            return res.status(400).json({
              success: false,
              message: 'reCAPTCHA verification is required'
            });
          } else {
            console.log('Development mode: Allowing form without reCAPTCHA token');
          }
        } else {
          // Only verify if a token was provided
          const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
          if (!isRecaptchaValid) {
            console.log('reCAPTCHA verification failed');
            
            // In development environment, we'll allow forms even with failed verification
            const isDevelopment = process.env.NODE_ENV !== 'production';
            if (!isDevelopment) {
              return res.status(400).json({
                success: false,
                message: 'reCAPTCHA verification failed'
              });
            } else {
              console.log('Development mode: Allowing form with invalid reCAPTCHA');
            }
          }
        }
      }
      
      // Validate required fields based on form type
      let missingRequiredFields = false;
      
      // Common required fields for all form types
      if (!firstName || !lastName || !email || !cellPhone || !consent) {
        missingRequiredFields = true;
      }
      
      // Additional validation for individual form
      if (formType === 'individual' && (!courseInterest || !certificationDate)) {
        missingRequiredFields = true;
      }
      
      // Additional validation for employer form
      if (formType === 'employer' && (!req.body.companyName || !req.body.trainingMethod || 
          !req.body.pricingMethod || !certificationDate)) {
        missingRequiredFields = true;
      }
      
      if (missingRequiredFields) {
        return res.status(400).json({ 
          success: false,
          message: 'Required fields are missing' 
        });
      }
      
      // Log form submission for debugging
      console.log('Contact form submission:', JSON.stringify(req.body, null, 2));
      
      // Send the data to Pabbly webhook
      try {
        // Get the configured webhook URL
        const webhookUrl = await getWebhookUrl();
        
        // Log the form summary for debugging and record-keeping
        console.log('Form submission summary:');
        console.log(req.body.formSummary || 'No summary available');
        
        // Create a formatted payload for Pabbly - include all form fields
        const webhookResponse = await fetch(webhookUrl, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...req.body,
            // Map formType to route name for clearer identification
            route: formType === 'individual' ? 'Route A' : 
                  formType === 'employer' ? 'Route B' : 
                  'Route C',
            // Standardize course info fields for individual registration
            ...( formType === 'individual' && req.body.courseInfo ? {
                courseId: req.body.courseInfo.courseId,
                courseTitle: req.body.courseInfo.courseTitle,
                courseCategory: req.body.courseInfo.courseCategoryTitle
            } : {}),
            // Include submission timestamp
            submittedAt: new Date().toISOString()
          })
        });
        
        if (!webhookResponse.ok) {
          const webhookErrorText = await webhookResponse.text();
          console.error('Webhook error:', webhookErrorText);
          throw new Error(`Webhook failed: ${webhookResponse.status} ${webhookResponse.statusText}`);
        }
        
        console.log('Successfully sent to Pabbly webhook');
      } catch (webhookError) {
        // Log the error but don't fail the request
        console.error('Failed to send to Pabbly webhook:', webhookError);
        // In production, you might want to handle this differently or notify admins
      }
      
      return res.status(200).json({ 
        success: true,
        message: 'Contact form submitted successfully'
      });
    } catch (error: unknown) {
      console.error('Error in contact endpoint:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Internal server error'
      });
    }
  });

  const httpServer = createServer(app);
  
  // Create WebSocket server on a distinct path to avoid conflict with Vite's HMR
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (socket) => {
    console.log('WebSocket client connected');
    
    // Send welcome message to the client
    socket.send(JSON.stringify({
      type: 'welcome',
      message: 'Connected to Lifeguard Pro WebSocket Server',
      timestamp: new Date().toISOString()
    }));
    
    // Handle incoming messages
    socket.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // Echo the message back to the client
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'echo',
            data,
            timestamp: new Date().toISOString()
          }));
        }
      } catch (error) {
        console.error('Error processing message:', error);
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'error',
            message: 'Failed to process message',
            timestamp: new Date().toISOString()
          }));
        }
      }
    });
    
    // Handle socket closing
    socket.on('close', () => {
      console.log('WebSocket client disconnected');
    });
    
    // Handle errors
    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
  
  console.log('WebSocket server initialized on path: /ws');

  return httpServer;
}
