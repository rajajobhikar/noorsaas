export function validateVideo(file: File): boolean {
  const allowedTypes = ['video/mp4', 'video/webm'];
  const maxSize = 20 * 1024 * 1024; // 20MB
  return allowedTypes.includes(file.type) && file.size <= maxSize;
}