import { usePhotoboothStore } from "@/hooks/use-photobooth";

const FilterSelector = () => {
  const { filter, setFilter } = usePhotoboothStore();
  
  const filters = [
    { id: 'none', name: 'No Filter', className: '' },
    { id: 'bw', name: 'B&W', className: 'grayscale' },
    { id: 'sepia', name: 'Sepia', className: 'sepia' },
    { id: 'vivid', name: 'Vivid', className: 'saturate-150' },
    { id: 'contrast', name: 'Contrast', className: 'contrast-125' },
    { id: 'warm', name: 'Warm', className: 'brightness-110 saturate-125' }
  ];
  
  const sampleImageUrl = "https://images.unsplash.com/photo-1516914589923-f105f1539f65?w=500&h=600&fit=crop";

  return (
    <div className="grid grid-cols-3 gap-3">
      {filters.map((filterOption) => (
        <div 
          key={filterOption.id}
          className={`filter-option bg-white rounded-lg p-2 cursor-pointer text-center ${filter === filterOption.id ? 'border-2 border-[var(--deep-purple)]' : 'border border-gray-200'}`}
          onClick={() => setFilter(filterOption.id)}
        >
          <div className="w-full h-16 rounded bg-[var(--light-gray)] mb-2 overflow-hidden">
            <img 
              src={sampleImageUrl} 
              alt={`${filterOption.name} filter preview`} 
              className={`w-full h-full object-cover ${filterOption.className}`}
            />
          </div>
          <span className="text-xs font-medium">{filterOption.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterSelector;
