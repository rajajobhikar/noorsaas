export type EditOptions = {
  blur: number;
  brightness: number;
  saturation: number;
};

export function applyEdits(img: HTMLImageElement, options: EditOptions): string {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.filter = `blur(${options.blur}px) brightness(${options.brightness}%) saturate(${options.saturation}%)`;
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL();
}