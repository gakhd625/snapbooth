import { usePhotoboothStore } from "@/hooks/use-photobooth";
import { useState } from "react";

const BackgroundSelector = () => {
  const { background, setBackground } = usePhotoboothStore();
  const [customColor, setCustomColor] = useState("#C5B4E3"); // Default to lavender
  
  const backgrounds = [
    { id: 'white', name: 'White', preview: 'bg-white' },
    { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-r from-[var(--lavender)] to-[var(--light-pink)]' },
    { id: 'hearts', name: 'Hearts', preview: 'bg-[var(--light-gray)] flex items-center justify-center' },
    { id: 'custom', name: 'Custom Color', preview: 'bg-white' }
  ];

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
    setBackground('custom');
    // Update CSS variable
    document.documentElement.style.setProperty('--custom-background', e.target.value);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-4 gap-2">
        {backgrounds.map((bg) => (
          <div 
            key={bg.id}
            className={`filter-option bg-white rounded-lg p-2 cursor-pointer text-center ${background === bg.id ? 'border-2 border-[var(--deep-purple)]' : 'border border-gray-200'}`}
            onClick={() => setBackground(bg.id)}
          >
            <div className={`w-full h-10 rounded mb-2 ${bg.preview}`}>
              {bg.id === 'hearts' && <i className='bx bx-heart text-[var(--light-pink)] text-xl'></i>}
              {bg.id === 'custom' && (
                <div 
                  className="w-full h-full rounded" 
                  style={{ backgroundColor: customColor }}
                ></div>
              )}
            </div>
            <span className="text-xs font-medium">{bg.name}</span>
          </div>
        ))}
      </div>
      
      {background === 'custom' && (
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Pick a color:</label>
          <input 
            type="color" 
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundSelector;
