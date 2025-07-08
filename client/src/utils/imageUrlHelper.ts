const getImageUrl = (avatar?: { url: string } | string | null): string => {
  const defaultImage =
    "https://res.cloudinary.com/dunfagpl8/image/upload/v1751840306/mutyrouser_mjap7e.png";

  // Handle null/undefined
  if (!avatar) return defaultImage;

  // Handle Mongoose avatar object
  if (typeof avatar === "object" && avatar.url) {
    return avatar.url.startsWith("http")
      ? avatar.url
      : `http://localhost:5100${avatar.url}`;
  }

  // Handle string path (legacy support)
  if (typeof avatar === "string") {
    return avatar.startsWith("http")
      ? avatar
      : `http://localhost:5100${avatar}`;
  }

  return defaultImage;
};

export default getImageUrl;
