import { useState } from "react";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <i className="bx bxs-camera text-3xl text-[var(--deep-purple)] mr-2"></i>
          <span className="font-poppins font-semibold text-xl">SnapBooth</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link 
            href="/" 
            className={`font-medium hover:text-[var(--deep-purple)] transition-colors ${location === '/' ? 'text-[var(--deep-purple)]' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/instructions" 
            className={`font-medium hover:text-[var(--deep-purple)] transition-colors ${location === '/instructions' ? 'text-[var(--deep-purple)]' : ''}`}
          >
            How It Works
          </Link>
          <Link 
            href="/photobooth" 
            className={`font-medium hover:text-[var(--deep-purple)] transition-colors ${location === '/photobooth' ? 'text-[var(--deep-purple)]' : ''}`}
          >
            Photobooth
          </Link>
          <Link 
            href="/faq" 
            className={`font-medium hover:text-[var(--deep-purple)] transition-colors ${location === '/faq' ? 'text-[var(--deep-purple)]' : ''}`}
          >
            FAQs
          </Link>
        </div>
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-2xl"
          aria-label="Toggle mobile menu"
        >
          <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>
      </div>
      <div className={`md:hidden bg-white shadow-inner ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          <Link 
            href="/" 
            className={`font-medium py-2 hover:text-[var(--deep-purple)] transition-colors ${location === '/' ? 'text-[var(--deep-purple)]' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            href="/instructions" 
            className={`font-medium py-2 hover:text-[var(--deep-purple)] transition-colors ${location === '/instructions' ? 'text-[var(--deep-purple)]' : ''}`}
            onClick={closeMobileMenu}
          >
            How It Works
          </Link>
          <Link 
            href="/photobooth" 
            className={`font-medium py-2 hover:text-[var(--deep-purple)] transition-colors ${location === '/photobooth' ? 'text-[var(--deep-purple)]' : ''}`}
            onClick={closeMobileMenu}
          >
            Photobooth
          </Link>
          <Link 
            href="/faq" 
            className={`font-medium py-2 hover:text-[var(--deep-purple)] transition-colors ${location === '/faq' ? 'text-[var(--deep-purple)]' : ''}`}
            onClick={closeMobileMenu}
          >
            FAQs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
