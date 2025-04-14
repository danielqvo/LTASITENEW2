import React from "react";

// Create an SVG image of text to prevent web scraping
export const TextToSVG: React.FC<{
  text: string;
  className?: string;
  fontSize?: number;
  color?: string;
}> = ({ text, className = "", fontSize = 14, color = "white" }) => {
  return (
    <svg 
      className={className}
      width={text.length * fontSize * 0.6} // approximate width based on font size
      height={fontSize * 1.5}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y={fontSize}
        fontFamily="Arial, sans-serif"
        fontSize={fontSize}
        fill={color}
      >
        {text}
      </text>
    </svg>
  );
};

// Phone number component
export const PhoneNumberImage: React.FC<{ className?: string, color?: string }> = ({ 
  className = "", 
  color = "white" 
}) => {
  return <TextToSVG text="+1-954-800-5068" className={className} color={color} />;
};

// Email address component
export const EmailAddressImage: React.FC<{ className?: string, color?: string }> = ({ 
  className = "", 
  color = "white" 
}) => {
  return <TextToSVG text="Contact@LifeguardTrainingAcademy.org" className={className} color={color} />;
};