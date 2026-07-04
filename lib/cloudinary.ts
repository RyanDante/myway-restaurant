/**
 * Utility function to generate optimized Cloudinary CDN URLs.
 * 
 * Cloudinary offers automatic format selection (f_auto) and quality compression (q_auto).
 * Example URL generated:
 * https://res.cloudinary.com/[cloud_name]/[resource_type]/upload/f_auto,q_auto/[path]
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'myway-restaurant';

export function getCloudinaryImageUrl(path: string): string {
  if (!path) return '';
  
  // If the path is already an external URL (e.g. Unsplash), return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Normalize path (remove leading slash if present)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Build the Cloudinary URL with auto quality and format transformations
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${cleanPath}`;
}

export function getCloudinaryVideoUrl(path: string): string {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Video transformations: f_auto,q_auto for smart compression and dynamic format serving
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${cleanPath}`;
}
