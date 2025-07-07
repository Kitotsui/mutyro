interface ImageObject {
  url?: string | null;
  public_id?: string;
}

const getImageUrl = (imageSource?: ImageObject | string | null): string => {
  const defaultImage =
    "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png";

  if (!imageSource) {
    return defaultImage;
  }

  let imagePath: string | undefined | null = "";

  if (typeof imageSource === "object" && imageSource !== null) {
    imagePath = imageSource.url;
  } else if (typeof imageSource === "string") {
    imagePath = imageSource;
  }

  if (!imagePath || imagePath.trim() === "") {
    return defaultImage;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `http://localhost:5100${imagePath}`;
};

export default getImageUrl;
