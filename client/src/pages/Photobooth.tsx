import { useState } from "react";
import LayoutSelector from "@/components/photobooth/LayoutSelector";
import FilterSelector from "@/components/photobooth/FilterSelector";
import BackgroundSelector from "@/components/photobooth/BackgroundSelector";
import CameraView from "@/components/photobooth/CameraView";
import PhotoStrip from "@/components/photobooth/PhotoStrip";
import StickerSelector from "@/components/photobooth/StickerSelector";
import { usePhotoboothStore } from "@/hooks/use-photobooth";

const Photobooth = () => {
  const { 
    layout, 
    includeDateOnStrip, 
    setIncludeDateOnStrip,
    capturedPhotos,
    isCapturing,
    setIsCapturing,
    resetCapture
  } = usePhotoboothStore();
  
  const [showPhotoStrip, setShowPhotoStrip] = useState(false);
  
  const handleStartCapture = () => {
    setShowPhotoStrip(false);
    setIsCapturing(true);
    resetCapture();
  };
  
  const handleCaptureComplete = () => {
    setShowPhotoStrip(true);
  };
  
  const handleRetake = () => {
    resetCapture();
    setShowPhotoStrip(false);
  };

  return (
    <section id="photobooth" className="py-12 px-4 fade-in">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-poppins font-bold text-2xl md:text-4xl text-center mb-6">Photobooth</h2>
        <p className="text-center max-w-lg mx-auto mb-10">
          Get ready to capture your perfect moment! Choose your settings and click "Start Capture" when you're ready.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Layout Selection Panel */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-poppins font-semibold text-xl mb-4">Layout Selection</h3>
            <LayoutSelector />
            
            <h3 className="font-poppins font-semibold text-xl mt-8 mb-4">Filter Selection</h3>
            <FilterSelector />
            
            <h3 className="font-poppins font-semibold text-xl mt-8 mb-4">Background</h3>
            <BackgroundSelector />
            
            <div className="flex items-center mt-6">
              <input 
                type="checkbox" 
                id="include-date" 
                className="text-[var(--deep-purple)]" 
                checked={includeDateOnStrip}
                onChange={(e) => setIncludeDateOnStrip(e.target.checked)}
              />
              <label htmlFor="include-date" className="ml-2 cursor-pointer">Include date on strip</label>
            </div>
          </div>
          
          {/* Camera Preview */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {!showPhotoStrip ? (
                <CameraView 
                  onStartCapture={handleStartCapture}
                  onCaptureComplete={handleCaptureComplete}
                  isCapturing={isCapturing}
                />
              ) : (
                <div className="fade-in">
                  <h3 className="font-poppins font-semibold text-xl mb-4">Your Photo Strip</h3>
                  
                  <div className="flex justify-center mb-6">
                    <PhotoStrip />
                  </div>
                  
                  <h3 className="font-poppins font-semibold text-xl mb-4">Add Stickers</h3>
                  <StickerSelector />
                  
                  <div className="flex justify-center space-x-3 mt-6">
                    <button 
                      onClick={handleRetake}
                      className="bg-white border border-[var(--deep-purple)] text-[var(--deep-purple)] font-poppins font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      Retake Photos
                    </button>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('download-photo-strip'))}
                      className="gradient-btn text-white font-poppins font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
                      disabled={capturedPhotos.length === 0}
                    >
                      Download Strip
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Photobooth;
