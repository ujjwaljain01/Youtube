import { v4 as uuidv4 } from "uuid"; // Recommended for unique file names
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  secure: true,
});

// this fn is for small file upload like avatar , cover image and thumbnail
// uses disk storage from muter middleware and then uploads to cloudinary
const uploadOnCloudinary = async (localFilePath, uploadType) => {
  try {
    if (!localFilePath) return null;

    const configMap = {
      profile: {
        folder: "user/profiles",
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
        ],
      },
      coverImage: {
        folder: "user/covers",
        transformation: [{ width: 1200, height: 400, crop: "fill" }],
      },
      video: {
        folder: "videos/raw",
        resource_type: "video",
        // Eagerly generates a thumbnail from the video frame
        eager: [{ width: 300, height: 200, crop: "pad", format: "jpg" }],
      },
      thumbnail: {
        folder: "videos/thumbnails",
        transformation: [{ width: 640, height: 360, crop: "fill" }],
      },
    };

    // 2. Fallback to default if an invalid type is passed
    const uploadConfig = configMap[uploadType] || {
      folder: "misc",
      resource_type: "auto",
    };

    const options = {
      ...uploadConfig,
      public_id: `${Date.now()}-${uuidv4()}`,
      resource_type: uploadConfig.resource_type || "auto",
    };

    // 4. Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, options);

    // 5. Clean up local file system safely
    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }

    return response;
  } catch (error) {
    // Clean up local file system even if upload fails
    if (localFilePath && fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }
    console.error(`Cloudinary Upload Error [Type: ${uploadType}]:`, error);
    return null;
  }
};


// this fn deletes file from cloudinary using public id and resource type
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
