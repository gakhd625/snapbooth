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
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <i className="bx bxs-camera text-3xl text-[var(--deep-purple)] mr-2"></i>
          <span className="font-poppins font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--deep-purple)] to-[var(--light-pink)]">SnapBooth</span>
        </Link>
        <div className="hidden md:flex space-x-8">
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
        <div className="hidden md:block">
          <Link 
            href="/photobooth" 
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[var(--deep-purple)] to-[var(--light-pink)] text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            Start Capturing
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
          <Link 
            href="/photobooth" 
            className="mt-3 px-6 py-2 rounded-full bg-gradient-to-r from-[var(--deep-purple)] to-[var(--light-pink)] text-white font-medium text-center"
            onClick={closeMobileMenu}
          >
            Start Capturing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
