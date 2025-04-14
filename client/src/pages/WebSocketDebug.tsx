import WebSocketTest from '@/components/WebSocketTest';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function WebSocketDebugPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">WebSocket Debugging</h1>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">WebSocket Test Panel</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Use this panel to test the WebSocket connection. You can connect, send messages, 
              and see responses from the server.
            </p>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click "Connect" to establish a WebSocket connection</li>
                <li>Send messages using the input field at the bottom</li>
                <li>The server will echo back your messages</li>
                <li>Click "Disconnect" to close the connection</li>
                <li>Click "Clear" to remove all message history</li>
              </ol>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">
              <p className="font-medium">Technical Details:</p>
              <p className="mt-1">
                The WebSocket server is running on the path <code>/ws</code> and is separate from 
                Vite's Hot Module Replacement WebSocket.
              </p>
            </div>
          </div>
          
          <div>
            <WebSocketTest />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebSocketDebugPage;