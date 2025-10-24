export function validateImage(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  return allowedTypes.includes(file.type) && file.size <= maxSize;
}