/**
 * Applies a filter to an image element
 * @param image The image element to apply the filter to
 * @param filter The filter to apply
 * @returns A canvas element with the filter applied
 */
export const applyFilter = (image: HTMLImageElement, filter: string): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Draw the original image
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
  // Apply filters based on the selected filter
  switch (filter) {
    case 'bw':
      applyGrayscale(ctx, canvas.width, canvas.height);
      break;
    case 'sepia':
      applySepia(ctx, canvas.width, canvas.height);
      break;
    case 'vivid':
      applyVivid(ctx, canvas.width, canvas.height);
      break;
    case 'contrast':
      applyContrast(ctx, canvas.width, canvas.height);
      break;
    case 'warm':
      applyWarm(ctx, canvas.width, canvas.height);
      break;
    default:
      // No filter, use the original image
      break;
  }
  
  return canvas;
};

// Apply grayscale filter
const applyGrayscale = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  
  ctx.putImageData(imageData, 0, 0);
};

// Apply sepia filter
const applySepia = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189)); // red
    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)); // green
    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)); // blue
  }
  
  ctx.putImageData(imageData, 0, 0);
};

// Apply vivid filter (increase saturation)
const applyVivid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const saturationFactor = 1.5; // 50% more saturation
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Convert RGB to HSL
    const [h, s, l] = rgbToHsl(r, g, b);
    
    // Increase saturation
    const newS = Math.min(1, s * saturationFactor);
    
    // Convert back to RGB
    const [newR, newG, newB] = hslToRgb(h, newS, l);
    
    data[i] = newR;
    data[i + 1] = newG;
    data[i + 2] = newB;
  }
  
  ctx.putImageData(imageData, 0, 0);
};

// Apply contrast filter
const applyContrast = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const factor = 1.25; // Contrast factor (25% more contrast)
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - 128) + 128); // red
    data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128); // green
    data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128); // blue
  }
  
  ctx.putImageData(imageData, 0, 0);
};

// Apply warm filter (increase brightness and add warm tone)
const applyWarm = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Increase brightness by 10%
    data[i] = clamp(data[i] * 1.1 + 5); // red (add extra warmth)
    data[i + 1] = clamp(data[i + 1] * 1.1); // green
    data[i + 2] = clamp(data[i + 2] * 0.9); // blue (reduce to add warmth)
  }
  
  ctx.putImageData(imageData, 0, 0);
};

// Helper function to clamp values between 0 and 255
const clamp = (value: number): number => {
  return Math.max(0, Math.min(255, Math.round(value)));
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return [h, s, l];
};

// Helper function to convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
