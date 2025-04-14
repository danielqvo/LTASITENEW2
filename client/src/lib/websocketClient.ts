// WebSocket client for Lifeguard Pro
// This module handles the WebSocket connection to the server

// WebSocket connection status enum
export enum WebSocketStatus {
  CONNECTING = 'connecting',
  OPEN = 'open',
  CLOSED = 'closed',
  ERROR = 'error'
}

// WebSocket message types
export type WebSocketMessage = {
  type: string;
  message?: string;
  data?: any;
  timestamp: string;
}

// WebSocket client options
export type WebSocketClientOptions = {
  onOpen?: (event: Event) => void;
  onMessage?: (message: WebSocketMessage) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onStatusChange?: (status: WebSocketStatus) => void;
}

// WebSocket client class
export class WebSocketClient {
  private socket: WebSocket | null = null;
  private status: WebSocketStatus = WebSocketStatus.CLOSED;
  private options: WebSocketClientOptions;
  private reconnectInterval: number = 5000; // 5 seconds
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimeoutId: number | null = null;
  
  constructor(options: WebSocketClientOptions = {}) {
    this.options = options;
  }
  
  // Connect to the WebSocket server
  connect(): boolean {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.log('WebSocket already connected or connecting');
      return false;
    }
    
    try {
      // Determine the WebSocket URL based on the current protocol and host
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      // Update status to connecting
      this.updateStatus(WebSocketStatus.CONNECTING);
      
      // Create a new WebSocket connection
      this.socket = new WebSocket(wsUrl);
      
      // Set up event handlers
      this.socket.onopen = (event) => this.handleOpen(event);
      this.socket.onmessage = (event) => this.handleMessage(event);
      this.socket.onclose = (event) => this.handleClose(event);
      this.socket.onerror = (event) => this.handleError(event);
      
      return true;
    } catch (error) {
      console.error('Error connecting to WebSocket server:', error);
      this.updateStatus(WebSocketStatus.ERROR);
      return false;
    }
  }
  
  // Disconnect from the WebSocket server
  disconnect(): void {
    if (this.socket) {
      // Clear any reconnect timeout
      if (this.reconnectTimeoutId !== null) {
        window.clearTimeout(this.reconnectTimeoutId);
        this.reconnectTimeoutId = null;
      }
      
      // Only close if not already closed or closing
      if (this.socket.readyState !== WebSocket.CLOSED && this.socket.readyState !== WebSocket.CLOSING) {
        this.socket.close();
      }
      
      this.socket = null;
      this.reconnectAttempts = 0;
      this.updateStatus(WebSocketStatus.CLOSED);
    }
  }
  
  // Send a message to the WebSocket server
  sendMessage(data: any): boolean {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        const message = typeof data === 'string' ? data : JSON.stringify(data);
        this.socket.send(message);
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        return false;
      }
    } else {
      console.warn('Cannot send message: WebSocket is not open');
      return false;
    }
  }
  
  // Get the current connection status
  getStatus(): WebSocketStatus {
    return this.status;
  }
  
  // Update the WebSocket event handlers
  updateOptions(options: WebSocketClientOptions): void {
    this.options = options;
  }
  
  // Handle WebSocket open event
  private handleOpen(event: Event): void {
    console.log('WebSocket connection established');
    this.updateStatus(WebSocketStatus.OPEN);
    this.reconnectAttempts = 0;
    
    if (this.options.onOpen) {
      this.options.onOpen(event);
    }
  }
  
  // Handle WebSocket message event
  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data) as WebSocketMessage;
      
      // Log received message (except for echo messages to reduce noise)
      if (message.type !== 'echo') {
        console.log('WebSocket message received:', message);
      }
      
      if (this.options.onMessage) {
        this.options.onMessage(message);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error, event.data);
    }
  }
  
  // Handle WebSocket close event
  private handleClose(event: CloseEvent): void {
    console.log('WebSocket connection closed:', event.code, event.reason);
    this.updateStatus(WebSocketStatus.CLOSED);
    
    if (this.options.onClose) {
      this.options.onClose(event);
    }
    
    // Attempt to reconnect unless explicitly disconnected
    this.attemptReconnect();
  }
  
  // Handle WebSocket error event
  private handleError(event: Event): void {
    console.error('WebSocket error:', event);
    this.updateStatus(WebSocketStatus.ERROR);
    
    if (this.options.onError) {
      this.options.onError(event);
    }
  }
  
  // Update the WebSocket status
  private updateStatus(status: WebSocketStatus): void {
    if (this.status !== status) {
      this.status = status;
      
      if (this.options.onStatusChange) {
        this.options.onStatusChange(status);
      }
    }
  }
  
  // Attempt to reconnect to the WebSocket server
  private attemptReconnect(): void {
    // Only attempt to reconnect if we haven't exceeded the maximum attempts
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${this.reconnectInterval}ms`);
      
      // Clear any existing timeout
      if (this.reconnectTimeoutId !== null) {
        window.clearTimeout(this.reconnectTimeoutId);
      }
      
      // Set a new timeout
      this.reconnectTimeoutId = window.setTimeout(() => {
        console.log('Reconnecting to WebSocket server...');
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.warn('Maximum reconnect attempts reached. Giving up.');
    }
  }
}

// Create a singleton instance
const websocketClient = new WebSocketClient();

// Export the singleton instance
export default websocketClient;