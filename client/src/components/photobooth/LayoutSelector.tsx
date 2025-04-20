import { usePhotoboothStore } from "@/hooks/use-photobooth";

const LayoutSelector = () => {
  const { layout, setLayout } = usePhotoboothStore();

  return (
    <div className="space-y-4">
      <div 
        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--light-gray)] cursor-pointer ${layout === '2' ? 'bg-[var(--light-gray)]' : ''}`}
        onClick={() => setLayout('2')}
      >
        <input 
          type="radio" 
          name="layout" 
          id="layout-2" 
          value="2" 
          className="text-[var(--deep-purple)]" 
          checked={layout === '2'} 
          onChange={() => setLayout('2')}
        />
        <label htmlFor="layout-2" className="flex-grow cursor-pointer">
          <span className="font-medium">2 Photos</span>
          <p className="text-sm text-gray-600">Classic duo strip</p>
        </label>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-6 h-8 bg-[var(--lavender)]/30 rounded"></div>
          <div className="w-6 h-8 bg-[var(--lavender)]/30 rounded"></div>
        </div>
      </div>
      
      <div 
        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--light-gray)] cursor-pointer ${layout === '3' ? 'bg-[var(--light-gray)]' : ''}`}
        onClick={() => setLayout('3')}
      >
        <input 
          type="radio" 
          name="layout" 
          id="layout-3" 
          value="3" 
          className="text-[var(--deep-purple)]" 
          checked={layout === '3'} 
          onChange={() => setLayout('3')}
        />
        <label htmlFor="layout-3" className="flex-grow cursor-pointer">
          <span className="font-medium">3 Photos</span>
          <p className="text-sm text-gray-600">Perfect trio strip</p>
        </label>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-6 h-8 bg-[var(--lavender)]/30 rounded"></div>
          <div className="w-6 h-8 bg-[var(--lavender)]/30 rounded"></div>
          <div className="w-6 h-8 bg-[var(--lavender)]/30 rounded"></div>
        </div>
      </div>
      
      <div 
        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--light-gray)] cursor-pointer ${layout === '5' ? 'bg-[var(--light-gray)]' : ''}`}
        onClick={() => setLayout('5')}
      >
        <input 
          type="radio" 
          name="layout" 
          id="layout-5" 
          value="5" 
          className="text-[var(--deep-purple)]" 
          checked={layout === '5'} 
          onChange={() => setLayout('5')}
        />
        <label htmlFor="layout-5" className="flex-grow cursor-pointer">
          <span className="font-medium">5 Photos</span>
          <p className="text-sm text-gray-600">Tell your story</p>
        </label>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-6 h-5 bg-[var(--lavender)]/30 rounded"></div>
          <div className="w-6 h-5 bg-[var(--lavender)]/30 rounded"></div>
          <div className="w-6 h-5 bg-[var(--lavender)]/30 rounded"></div>
          <div className="w-6 h-5 bg-[var(--lavender)]/30 rounded"></div>
          <div className="w-6 h-5 bg-[var(--lavender)]/30 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
