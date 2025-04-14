import React from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Lifeguard Certification Graduate",
    image: "/src/assets/images/testimonial-1.svg",
    text: "The training was comprehensive and gave me the confidence to handle emergency situations. The instructors were knowledgeable and supportive throughout the entire process.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael T.",
    role: "CPR & First Aid Instructor",
    image: "/src/assets/images/testimonial-2.svg",
    text: "Taking the instructor course has enabled me to teach life-saving skills to others in my community. The curriculum is well-structured and the online resources are excellent.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Jessica R.",
    role: "Water Safety Swim Instructor",
    image: "/src/assets/images/testimonial-3.svg",
    text: "As someone passionate about preventing drowning, this certification gave me the tools to teach swimming effectively. I'm now able to help children build confidence in the water from day one.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Scouting America Banner - Clickable with glow effect */}
        <div className="flex justify-center mb-8">
          <a 
            href="/scoutingamericalifeguardpro" 
            className="block transform transition duration-300 hover:scale-105 relative group"
          >
            <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-0 blur-lg group-hover:opacity-50 transition-opacity duration-300"></div>
            <img 
              src="https://i.imgur.com/iHIZXKx.png" 
              alt="Scouting America Lifeguard Pro Partnership" 
              className="relative z-10 max-w-full rounded-lg shadow-lg border-2 border-transparent group-hover:border-blue-300"
              style={{ maxHeight: '150px', width: 'auto' }}
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 whitespace-nowrap shadow-md">
              Click for exclusive Scout offers
            </div>
          </a>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark font-heading mb-4">What Our Students Say</h2>
          <p className="text-lg max-w-3xl mx-auto">Hear from those who've completed our certification programs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic">{testimonial.text}</p>
              <div className="flex mt-4 text-yellow-400">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
