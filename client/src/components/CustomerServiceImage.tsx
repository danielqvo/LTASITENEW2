import React from 'react';

interface CustomerServiceImageProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const CustomerServiceImage: React.FC<CustomerServiceImageProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  // Define sizes for the image
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  return (
    <div className={`flex items-center justify-center overflow-hidden rounded-full ${sizeClasses[size]} ${className}`}>
      <img 
        src="https://i.imgur.com/NlAppXu.png" 
        alt="Lifeguard Specialist" 
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default CustomerServiceImage;