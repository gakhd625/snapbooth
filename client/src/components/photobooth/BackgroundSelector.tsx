import { usePhotoboothStore } from "@/hooks/use-photobooth";

const BackgroundSelector = () => {
  const { background, setBackground } = usePhotoboothStore();
  
  const backgrounds = [
    { id: 'white', name: 'White', preview: 'bg-white' },
    { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-r from-[var(--lavender)] to-[var(--light-pink)]' },
    { id: 'hearts', name: 'Hearts', preview: 'bg-[var(--light-gray)] flex items-center justify-center' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {backgrounds.map((bg) => (
        <div 
          key={bg.id}
          className={`filter-option bg-white rounded-lg p-2 cursor-pointer text-center ${background === bg.id ? 'border-2 border-[var(--deep-purple)]' : 'border border-gray-200'}`}
          onClick={() => setBackground(bg.id)}
        >
          <div className={`w-full h-12 rounded mb-2 ${bg.preview}`}>
            {bg.id === 'hearts' && <i className='bx bx-heart text-[var(--light-pink)] text-xl'></i>}
          </div>
          <span className="text-xs font-medium">{bg.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BackgroundSelector;
