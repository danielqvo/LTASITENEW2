import { useState, useEffect, useCallback } from 'react';
import websocketClient, { 
  WebSocketStatus, 
  WebSocketMessage,
  WebSocketClientOptions
} from '@/lib/websocketClient';

// Hook for using WebSocket in React components
export function useWebSocket(options?: Partial<WebSocketClientOptions>) {
  const [status, setStatus] = useState<WebSocketStatus>(websocketClient.getStatus());
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  // Connect to WebSocket
  const connect = useCallback(() => {
    return websocketClient.connect();
  }, []);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    websocketClient.disconnect();
  }, []);

  // Send a message through the WebSocket
  const sendMessage = useCallback((data: any) => {
    return websocketClient.sendMessage(data);
  }, []);

  // Clear message history
  const clearMessages = useCallback(() => {
    setMessages([]);
    setLastMessage(null);
  }, []);

  // Set up WebSocket event handlers
  useEffect(() => {
    // Handler for status changes
    const handleStatusChange = (newStatus: WebSocketStatus) => {
      setStatus(newStatus);
    };

    // Handler for incoming messages
    const handleMessage = (message: WebSocketMessage) => {
      setLastMessage(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Create the options object with our handlers plus any passed in
    const clientOptions: WebSocketClientOptions = {
      onStatusChange: handleStatusChange,
      onMessage: handleMessage,
      ...(options || {})
    };

    // Update the client with our options
    websocketClient.updateOptions(clientOptions);

    // Connect to WebSocket if not already connected
    if (websocketClient.getStatus() === WebSocketStatus.CLOSED) {
      websocketClient.connect();
    }

    // Cleanup function
    return () => {
      // We don't disconnect here to allow the WebSocket to persist between component renders
      // Instead, components should explicitly call disconnect when they're done with the WebSocket
    };
  }, [options]);

  return {
    status,
    messages,
    lastMessage,
    connect,
    disconnect,
    sendMessage,
    clearMessages
  };
}

export default useWebSocket;