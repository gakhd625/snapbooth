import { useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { usePhotoboothStore } from "@/hooks/use-photobooth";
import { useToast } from "@/hooks/use-toast";

const PhotoStrip = () => {
  const { 
    capturedPhotos, 
    layout, 
    filter, 
    background, 
    includeDateOnStrip, 
    stickers,
    downloadStrip 
  } = usePhotoboothStore();
  const photoStripRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const getFilterClass = () => {
    switch (filter) {
      case 'bw': return 'grayscale';
      case 'sepia': return 'sepia';
      case 'vivid': return 'saturate-150';
      case 'contrast': return 'contrast-125';
      case 'warm': return 'brightness-110 saturate-125';
      default: return '';
    }
  };
  
  const getBackgroundStyle = () => {
    switch (background) {
      case 'gradient':
        return 'background: linear-gradient(135deg, var(--lavender) 0%, var(--light-pink) 100%);';
      case 'hearts':
        return 'background-color: #F5F5F5; background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 24 24\' fill=\'%23F8C8DC\' stroke=\'none\'%3E%3Cpath d=\'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\'/%3E%3C/svg%3E"); background-repeat: repeat;';
      default:
        return 'background-color: white;';
    }
  };
  
  useEffect(() => {
    const handleDownload = async () => {
      if (photoStripRef.current && capturedPhotos.length > 0) {
        try {
          const canvas = await html2canvas(photoStripRef.current);
          const dataUrl = canvas.toDataURL('image/png');
          
          // Create a link element and trigger download
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `snapbooth-strip-${new Date().getTime()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast({
            title: "Success!",
            description: "Your photo strip has been downloaded.",
          });
        } catch (error) {
          console.error("Error downloading photo strip:", error);
          toast({
            title: "Error",
            description: "Failed to download your photo strip. Please try again.",
            variant: "destructive"
          });
        }
      }
    };
    
    // Setup listener for download event
    window.addEventListener('download-photo-strip', handleDownload);
    
    return () => {
      window.removeEventListener('download-photo-strip', handleDownload);
    };
  }, [capturedPhotos]);
  
  if (capturedPhotos.length === 0) {
    return (
      <div className="polaroid max-w-xs w-full mx-auto text-center py-10">
        <p className="text-gray-500">No photos captured yet</p>
      </div>
    );
  }

  // Fill with captured photos or empty placeholders based on layout
  const photosToShow = [];
  const numPhotos = parseInt(layout);
  
  for (let i = 0; i < numPhotos; i++) {
    if (i < capturedPhotos.length) {
      photosToShow.push(capturedPhotos[i]);
    } else {
      photosToShow.push(null); // Empty placeholder
    }
  }

  return (
    <div 
      ref={photoStripRef}
      className="polaroid max-w-xs w-full relative"
      style={{ paddingBottom: includeDateOnStrip ? "2rem" : "1rem" }}
    >
      <div 
        className={`grid grid-cols-1 gap-2`}
        style={{ 
          padding: "8px",
          boxSizing: "border-box",
          position: "relative",
          ...getBackgroundStyle()
        }}
      >
        {photosToShow.map((photo, index) => (
          <div key={index} className="relative">
            {photo ? (
              <img 
                src={photo} 
                alt={`Captured photo ${index + 1}`}
                className={`w-full rounded ${getFilterClass()}`}
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-400">Awaiting photo</span>
              </div>
            )}
          </div>
        ))}
        
        {includeDateOnStrip && (
          <p className="text-center mt-2 font-medium text-sm">{currentDate}</p>
        )}
        
        {/* Render stickers */}
        {stickers.map((sticker, index) => (
          <div 
            key={index}
            className="absolute"
            style={{
              top: `${sticker.position.y}px`,
              left: `${sticker.position.x}px`,
              zIndex: 10,
              fontSize: `${sticker.size}px`,
              transform: `rotate(${sticker.rotation}deg)`
            }}
          >
            <i className={`bx ${sticker.icon} text-${sticker.color}`}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoStrip;
