import { create } from 'zustand';
import html2canvas from 'html2canvas';

interface Sticker {
  icon: string;
  color: string;
  position: { x: number; y: number };
  size: number;
  rotation: number;
}

interface PhotoboothState {
  layout: string;
  filter: string;
  background: string;
  includeDateOnStrip: boolean;
  capturedPhotos: string[];
  isCapturing: boolean;
  stickers: Sticker[];
  
  // Actions
  setLayout: (layout: string) => void;
  setFilter: (filter: string) => void;
  setBackground: (background: string) => void;
  setIncludeDateOnStrip: (include: boolean) => void;
  addCapturedPhoto: (photoUrl: string) => void;
  setIsCapturing: (isCapturing: boolean) => void;
  resetCapture: () => void;
  addSticker: (sticker: Sticker) => void;
  downloadStrip: () => Promise<void>;
}

export const usePhotoboothStore = create<PhotoboothState>((set, get) => ({
  layout: '3',
  filter: 'none',
  background: 'white',
  includeDateOnStrip: true,
  capturedPhotos: [],
  isCapturing: false,
  stickers: [],
  
  setLayout: (layout) => set({ layout }),
  setFilter: (filter) => set({ filter }),
  setBackground: (background) => set({ background }),
  setIncludeDateOnStrip: (include) => set({ includeDateOnStrip: include }),
  
  addCapturedPhoto: (photoUrl) => set((state) => ({ 
    capturedPhotos: [...state.capturedPhotos, photoUrl] 
  })),
  
  setIsCapturing: (isCapturing) => set({ isCapturing }),
  
  // Removed startCapture as it's handled directly in the component
  
  resetCapture: () => set({ capturedPhotos: [] }),
  
  addSticker: (sticker) => set((state) => ({
    stickers: [...state.stickers, sticker]
  })),
  
  downloadStrip: async () => {
    // This function is implemented in the PhotoStrip component
    // using html2canvas to capture the rendered strip
    return Promise.resolve();
  }
}));
