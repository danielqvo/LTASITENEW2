import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { PhoneNumberCanvas, EmailAddressCanvas } from "@/components/ContactCanvas";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation links that will be used in both desktop and mobile menus
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/courses", label: "Select Your Course" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact-register", label: "Contact & Register" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" }
  ];

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar with Contact Info */}
      <div className="bg-primary-dark text-white py-2">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>
              <a href="tel:+19548005068" className="hover:text-gray-200">
                <PhoneNumberCanvas />
              </a>
            </div>
            <div className="flex items-center">
              <i className="fas fa-envelope mr-2"></i>
              <a href="mailto:Contact@LifeguardTrainingAcademy.org" className="hover:text-gray-200">
                <EmailAddressCanvas />
              </a>
            </div>
          </div>
          <Link href="/contact-register">
            <Button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-md font-semibold transition duration-300 hover:scale-105">
              Contact Us/Register
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-dark">Lifeguard Training Academy</span>
          </Link>

          {/* Mobile Menu Dropdown */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-none">
                  <Menu className="h-6 w-6 text-primary-dark" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {navigationLinks.map((link, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={link.href} className="w-full cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:space-x-6">
            {navigationLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;