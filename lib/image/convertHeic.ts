/**
 * Client-side HEIC to JPEG conversion utility
 * Uses heic2any for converting iPhone HEIC images to JPEG before upload
 */

// Dynamically import heic2any to reduce bundle size
async function getHeic2Any() {
  const heic2any = await import('heic2any');
  return heic2any.default;
}

/**
 * Check if file is HEIC format
 */
export function isHeicFile(file: File): boolean {
  // Check both MIME type and file extension
  const mimeType = file.type.toLowerCase();
  const extension = file.name.toLowerCase().split('.').pop();
  
  return (
    mimeType === 'image/heic' ||
    mimeType === 'image/heif' ||
    extension === 'heic' ||
    extension === 'heif'
  );
}

/**
 * Convert HEIC file to JPEG
 * Returns a new File object with JPEG format
 */
export async function convertHeicToJpeg(heicFile: File): Promise<File> {
  try {
    const heic2any = await getHeic2Any();
    
    // Convert HEIC to JPEG blob
    const jpegBlob = await heic2any({
      blob: heicFile,
      toType: 'image/jpeg',
      quality: 0.92, // High quality for scan analysis
    }) as Blob;

    // Create a new file with .jpg extension
    const originalName = heicFile.name;
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
    const jpegName = `${nameWithoutExt}.jpg`;

    return new File([jpegBlob], jpegName, {
      type: 'image/jpeg',
      lastModified: heicFile.lastModified,
    });
  } catch (error) {
    console.error('HEIC conversion failed:', error);
    throw new Error('Failed to convert HEIC image. Please try a different image format.');
  }
}

/**
 * Process file for upload - converts HEIC to JPEG if needed
 */
export async function processImageForUpload(file: File): Promise<File> {
  if (isHeicFile(file)) {
    return await convertHeicToJpeg(file);
  }
  return file;
}