import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function TestWebhook() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [updatingUrl, setUpdatingUrl] = useState(false);
  
  // Fetch current webhook URL on mount
  useEffect(() => {
    fetch('/api/webhook-url')
      .then(response => response.json())
      .then(data => {
        if (data.url) {
          setWebhookUrl(data.url);
        }
      })
      .catch(err => {
        console.error('Error fetching webhook URL:', err);
      });
  }, []);
  
  const updateWebhookUrl = async () => {
    if (!webhookUrl.trim()) {
      setError('Please enter a webhook URL');
      return;
    }
    
    setUpdatingUrl(true);
    
    try {
      const response = await fetch('/api/webhook-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: webhookUrl })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update webhook URL');
      }
      
      setError(null);
      
      // Show confirmation
      alert('Webhook URL updated successfully!');
    } catch (err: any) {
      console.error('Error updating webhook URL:', err);
      setError(err.message || 'An error occurred while updating webhook URL');
    } finally {
      setUpdatingUrl(false);
    }
  };

  const sendTestWebhook = async (route?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // If a specific route is provided, add it as a query parameter
      const url = route ? `/api/test-webhook?route=${route}` : '/api/test-webhook';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // If no specific route was requested, we might get back instructions instead of results
      if (data.message && data.examples && !route) {
        setResults([{
          route: 'Instructions',
          success: true,
          message: data.message,
          examples: data.examples
        }]);
        return;
      }
      
      // For specific route testing
      setResults([{
        route: data.message,
        success: data.success,
        status: data.status,
        response: data.response || '',
        data: data.data
      }]);
    } catch (err: any) {
      console.error('Error sending test webhook:', err);
      setError(err.message || 'An error occurred while sending test webhook');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-primary text-white p-8">
              <h1 className="text-3xl font-bold text-center">Test Pabbly Webhook</h1>
              <p className="text-center mt-4">
                Use this page to send test data to the Pabbly webhook for all three form types.
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">Pabbly Webhook Configuration</h2>
                    <p className="text-gray-600 mb-4">
                      Enter your Pabbly webhook URL below. This is where form submissions and test data will be sent.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="webhookUrl">Pabbly Webhook URL</Label>
                        <Input
                          id="webhookUrl"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="Enter your Pabbly webhook URL"
                          className="mt-1 w-full"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          This should be the webhook URL from your Pabbly "Catch Webhook" trigger event
                        </p>
                      </div>
                      
                      <Button 
                        onClick={updateWebhookUrl} 
                        disabled={updatingUrl}
                        variant="outline"
                      >
                        {updatingUrl ? 'Updating...' : 'Update Webhook URL'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Send Test Data</h2>
                  <p className="text-gray-600 mb-4">
                    Select which form route you want to test. Each route sends different data to match the specific form type.
                    This will let you test your automation flows with properly formatted data.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Button 
                      variant="outline"
                      onClick={() => sendTestWebhook('A')} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      Test Route A<br/>
                      <span className="text-xs">Individual Registration</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => sendTestWebhook('B')} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      Test Route B<br/>
                      <span className="text-xs">Employer Registration</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => sendTestWebhook('C')} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      Test Route C<br/>
                      <span className="text-xs">General Contact</span>
                    </Button>
                  </div>
                </div>
                
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md">
                    <h3 className="font-bold">Error</h3>
                    <p>{error}</p>
                  </div>
                )}
                
                {results && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-bold">Webhook Results</h3>
                    
                    {results.map((result: any, index: number) => (
                      <div key={index} className={`p-4 rounded-md ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="flex justify-between">
                          <h4 className="font-bold">{result.route}</h4>
                          <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                            {result.success ? 'Success' : 'Failed'}
                          </span>
                        </div>
                        
                        {result.examples && (
                          <div className="mt-2">
                            <h5 className="text-sm font-medium">Available Options:</h5>
                            <ul className="mt-1 text-sm pl-5 list-disc">
                              {result.examples.map((example: string, i: number) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.status && (
                          <p className="mt-2 text-sm">Status: {result.status}</p>
                        )}
                        
                        {result.response && (
                          <div className="mt-2">
                            <h5 className="text-sm font-medium">Response:</h5>
                            <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                              {result.response}
                            </pre>
                          </div>
                        )}
                        
                        {result.error && (
                          <p className="mt-2 text-sm text-red-600">Error: {result.error}</p>
                        )}
                        
                        {result.data && (
                          <div className="mt-4">
                            <h5 className="text-sm font-medium">Data Sent:</h5>
                            <div className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                              <pre>{JSON.stringify(result.data, null, 2)}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}