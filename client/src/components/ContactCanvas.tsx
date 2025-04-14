import React, { useRef, useEffect } from "react";

interface TextCanvasProps {
  text: string;
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  className?: string;
}

export const TextCanvas: React.FC<TextCanvasProps> = ({
  text,
  width = 200,
  height = 30,
  fontSize = 14,
  fontFamily = "Arial, sans-serif",
  color = "white",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamically calculate width based on text length if needed
  const canvasWidth = width === 200 ? text.length * fontSize * 0.6 : width;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set font and color
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    
    // Draw text
    ctx.fillText(text, 0, fontSize + 2);
  }, [text, fontSize, fontFamily, color, canvasWidth, height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={canvasWidth} 
      height={height}
      className={className}
      style={{ display: "inline-block" }}
    />
  );
};

// Specific components for phone number and email
export const PhoneNumberCanvas: React.FC<{ className?: string, color?: string, fontSize?: number }> = ({ 
  className = "", 
  color = "white",
  fontSize
}) => {
  return <TextCanvas text="+1-954-800-5068" className={className} color={color} fontSize={fontSize} />;
};

export const EmailAddressCanvas: React.FC<{ className?: string, color?: string, fontSize?: number }> = ({ 
  className = "", 
  color = "white",
  fontSize
}) => {
  return <TextCanvas text="Contact@LifeguardTrainingAcademy.org" width={300} className={className} color={color} fontSize={fontSize} />;
};