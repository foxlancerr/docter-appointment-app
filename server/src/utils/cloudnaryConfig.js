import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    console.log("uploadToCloudnary function called", filePath);
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "profile_images",
    });
    return result.secure_url; // Cloudinary URL
  } catch (error) {
    console.error("Cloudinary upload error: ", error);
    throw new Error("Failed to upload to Cloudinary");
  }
};

export default uploadToCloudinary;
