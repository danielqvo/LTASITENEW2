import { useState, useRef } from 'react';
import useWebSocket from '@/hooks/useWebSocket';
import { WebSocketStatus } from '@/lib/websocketClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function WebSocketTest() {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [messageInput, setMessageInput] = useState('');
  const { 
    status, 
    messages, 
    connect, 
    disconnect, 
    sendMessage, 
    clearMessages 
  } = useWebSocket();

  // Get appropriate status badge color
  const getStatusColor = (status: WebSocketStatus) => {
    switch (status) {
      case WebSocketStatus.OPEN:
        return 'bg-green-500 hover:bg-green-500';
      case WebSocketStatus.CONNECTING:
        return 'bg-yellow-500 hover:bg-yellow-500';
      case WebSocketStatus.CLOSED:
        return 'bg-gray-500 hover:bg-gray-500';
      case WebSocketStatus.ERROR:
        return 'bg-red-500 hover:bg-red-500';
      default:
        return 'bg-gray-500 hover:bg-gray-500';
    }
  };

  // Format message timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    } catch (error) {
      return 'Invalid timestamp';
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    sendMessage({
      action: 'message',
      content: messageInput
    });
    
    setMessageInput('');
    
    // Focus the input after sending
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  // Handle message input keypress (send on Enter)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          WebSocket Test
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </CardTitle>
        <CardDescription>
          Test the WebSocket connection to the server
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Button 
            onClick={connect} 
            disabled={status === WebSocketStatus.CONNECTING || status === WebSocketStatus.OPEN}
            variant="outline"
            className="flex-1"
          >
            Connect
          </Button>
          <Button 
            onClick={disconnect} 
            disabled={status === WebSocketStatus.CLOSED}
            variant="outline"
            className="flex-1"
          >
            Disconnect
          </Button>
          <Button 
            onClick={clearMessages}
            variant="ghost"
          >
            Clear
          </Button>
        </div>
        
        <div className="h-[300px] rounded border p-2 mb-4 overflow-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 p-4">
              No messages yet...
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg text-sm ${
                    msg.type === 'welcome' 
                      ? 'bg-blue-100 dark:bg-blue-900/30' 
                      : msg.type === 'error' 
                        ? 'bg-red-100 dark:bg-red-900/30' 
                        : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">{msg.type}</span>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                  {msg.message && (
                    <p className="mt-1">{msg.message}</p>
                  )}
                  {msg.data && (
                    <pre className="mt-1 text-xs overflow-auto">
                      {JSON.stringify(msg.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex space-x-2 w-full">
          <Input
            ref={messageInputRef}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={status !== WebSocketStatus.OPEN}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={status !== WebSocketStatus.OPEN || !messageInput.trim()}
          >
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default WebSocketTest;