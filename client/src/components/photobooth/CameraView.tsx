import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { usePhotoboothStore } from "@/hooks/use-photobooth";

interface CameraViewProps {
  onStartCapture: () => void;
  onCaptureComplete: () => void;
  isCapturing: boolean;
}

const CameraView = ({ onStartCapture, onCaptureComplete, isCapturing }: CameraViewProps) => {
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();
  const { 
    layout, 
    addCapturedPhoto,
    resetCapture,
    setIsCapturing,
    filter
  } = usePhotoboothStore();
  
  const [countdown, setCountdown] = useState<number | null>(null);
  const [captureProgress, setProgress] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const numPhotos = parseInt(layout);

  useEffect(() => {
    if (isCapturing) {
      const captureSequence = async () => {
        setProgress(0);
        // Start countdown
        setCountdown(3);
        
        // Countdown from 3 to 1
        for (let i = 3; i > 0; i--) {
          setCountdown(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Begin capturing images
        for (let i = 0; i < numPhotos; i++) {
          setCountdown(null);
          // Capture the image
          if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
              addCapturedPhoto(imageSrc);
            }
          }
          
          // Update progress
          const newProgress = ((i + 1) / numPhotos) * 100;
          setProgress(newProgress);
          
          // Wait 3 seconds unless it's the last photo
          if (i < numPhotos - 1) {
            setCountdown(3);
            for (let j = 3; j > 0; j--) {
              setCountdown(j);
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        }
        
        // Capturing complete
        setIsCapturing(false);
        onCaptureComplete();
      };
      
      // Start capture sequence
      captureSequence().catch(error => {
        console.error("Error during capture sequence:", error);
        toast({
          title: "Error",
          description: "Something went wrong during photo capture. Please try again.",
          variant: "destructive"
        });
        setIsCapturing(false);
      });
    }
  }, [isCapturing, layout, numPhotos]);
  
  useEffect(() => {
    // Check for camera permission
    const checkPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } catch (err) {
        setHasPermission(false);
        toast({
          title: "Camera Access Required",
          description: "Please allow camera access to use the photobooth.",
          variant: "destructive"
        });
      }
    };
    
    checkPermission();
  }, []);
  
  const handleStartCapture = () => {
    if (hasPermission) {
      onStartCapture();
    } else {
      toast({
        title: "Camera Access Required",
        description: "Please allow camera access to use the photobooth.",
        variant: "destructive"
      });
    }
  };

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

  return (
    <>
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
        {hasPermission === false ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <i className="bx bx-camera-off text-6xl mb-2"></i>
            <p className="text-center">Camera access is required</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 gradient-btn text-white font-poppins font-medium py-2 px-4 rounded-full"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className={`h-full w-full object-cover ${getFilterClass()}`}
            />
            
            {/* Countdown overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white text-8xl font-bold">{countdown}</span>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-poppins font-semibold text-xl">Camera Preview</h3>
          <p className="text-sm text-gray-600">Get ready to pose!</p>
        </div>
        <button 
          onClick={handleStartCapture}
          disabled={isCapturing || hasPermission === false}
          className="gradient-btn text-white font-poppins font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          Start Capture
        </button>
      </div>
      
      {/* Instructions during capture */}
      {isCapturing && (
        <div className="bg-[var(--light-gray)] rounded-lg p-4 mb-6">
          <p className="font-medium text-center">
            Taking {numPhotos} photos with 3 seconds between each. Get ready to pose!
          </p>
          <div className="w-full bg-white rounded-full h-4 mt-3">
            <div 
              className="bg-gradient-to-r from-[var(--lavender)] to-[var(--deep-purple)] h-4 rounded-full transition-all duration-300"
              style={{ width: `${captureProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CameraView;
