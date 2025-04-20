import { useState } from "react";
import { usePhotoboothStore } from "@/hooks/use-photobooth";

const stickers = [
  { icon: 'bx-heart', color: 'pink-500' },
  { icon: 'bx-star', color: 'purple-500' },
  { icon: 'bx-cool', color: 'blue-500' },
  { icon: 'bx-party', color: 'yellow-500' },
  { icon: 'bx-smile', color: 'green-500' }
];

const StickerSelector = () => {
  const { addSticker, downloadStrip } = usePhotoboothStore();
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  
  const handleStickerClick = (icon: string, color: string) => {
    setSelectedSticker(icon);
    // Random position within the photo strip bounds
    const position = {
      x: Math.floor(Math.random() * 200) + 20,
      y: Math.floor(Math.random() * 300) + 20
    };
    
    addSticker({
      icon,
      color,
      position,
      size: 24,
      rotation: Math.floor(Math.random() * 30) - 15 // Random rotation between -15 and 15 degrees
    });
  };

  const handleDownload = () => {
    // Dispatch custom event to trigger download in PhotoStrip component
    window.dispatchEvent(new CustomEvent('download-photo-strip'));
  };
  
  return (
    <>
      <div className="grid grid-cols-5 gap-3 mb-6">
        {stickers.map((sticker, index) => (
          <div 
            key={index}
            className={`bg-white border ${selectedSticker === sticker.icon ? 'border-2 border-[var(--deep-purple)]' : 'border-gray-200'} rounded-lg p-2 cursor-pointer text-center`}
            onClick={() => handleStickerClick(sticker.icon, sticker.color)}
          >
            <i className={`bx ${sticker.icon} text-2xl text-${sticker.color}`}></i>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="gradient-btn text-white font-poppins font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Download Strip
        </button>
      </div>
    </>
  );
};

export default StickerSelector;
