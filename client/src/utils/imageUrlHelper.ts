const getImageUrl = (imagePath?: string): string => {
  // Use a default image from Cloudinary or a local one
  const defaultImage = "http://localhost:5100/uploads/default.png"; // Or your Cloudinary default URL

  if (!imagePath) {
    return defaultImage;
  }

  // If imagePath is already a full absolute URL (like from Cloudinary), use it directly.
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Otherwise, assume it's a local path and prepend your backend server's address.
  return `http://localhost:5100${imagePath}`;
};

export default getImageUrl;
