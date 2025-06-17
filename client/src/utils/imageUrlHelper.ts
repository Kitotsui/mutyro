const getImageUrl = (imagePath?: string): string => {
  const defaultImage =
    "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png";

  if (!imagePath) {
    return defaultImage;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `http://localhost:5100${imagePath}`;
};

export default getImageUrl;
