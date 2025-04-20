const Footer = () => {
  return (
    <footer className="bg-[var(--dark-gray)] text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <i className="bx bxs-camera text-2xl text-[var(--light-pink)] mr-2"></i>
              <span className="font-poppins font-semibold text-lg">SnapBooth</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Capture memories in style</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <i className="bx bxl-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <i className="bx bxl-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <i className="bx bxl-twitter text-xl"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SnapBooth App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
