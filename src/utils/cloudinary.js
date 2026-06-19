import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  secure: true,
});

const configMap = {
  avatar: {
    folder: "user/avatars",
    transformation: [
      { width: 400, height: 400, crop: "fill", gravity: "face" },
    ],
  },
  coverImage: {
    folder: "user/coverImages",
    transformation: [{ width: 1200, height: 400, crop: "fill" }],
    eager_async: true,
  },
  video: {
    folder: "videos/raw",
    resource_type: "video",
    eager: [{ width: 300, height: 200, crop: "pad", format: "jpg" }],
  },
  thumbnail: {
    folder: "videos/thumbnails",
    eager: [{ width: 640, height: 360, crop: "fill" }],
  },
};

// this fn is for small file upload like avatar , cover image and thumbnail
// uses disk storage from muter middleware and then uploads to cloudinary
const uploadOnCloudinary = async (localFilePath, uploadType) => {
  try {
    if (!localFilePath) return null;

    const uploadConfig = configMap[uploadType] || {
      folder: "misc",
      resource_type: "auto",
    };

    const options = {
      ...uploadConfig,
      public_id: `${Date.now()}-${uuidv4()}`,
      resource_type: uploadConfig.resource_type || "auto",
    };

    const response = await cloudinary.uploader.upload(localFilePath, options);

    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }

    return response;
  } catch (error) {
    console.error(
      `Cloudinary Large Upload Error [Type: ${uploadType}]:`,
      error
    );
    return null;
  } finally {
    // Guaranteed cleanup loop using modern fs/promises
    try {
      if (fs.existsSync(localFilePath)) {
        await fs.promises.unlink(localFilePath);
      }
    } catch (cleanupError) {
      console.error("Failed to delete local temp file:", cleanupError);
    }
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

// this fn uploads large files using Cloudinary chunked upload (suitable for >100MB video files)
const uploadLargeOnCloudinary = async (localFilePath, uploadType) => {
  try {
    if (!localFilePath) return null;

    const uploadConfig = configMap[uploadType] || {
      folder: "misc",
      resource_type: "auto",
    };

    const options = {
      ...uploadConfig,
      public_id: `${Date.now()}-${uuidv4()}`,
      resource_type: uploadConfig.resource_type || "auto",
      chunk_size: 15000000, // 15MB chunk size
    };

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        localFilePath,
        options,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return response;
  } catch (error) {
    console.error(
      `Cloudinary Large Upload Error [Type: ${uploadType}]:`,
      error
    );
    return null;
  } finally {
    // Guaranteed cleanup loop using modern fs/promises
    try {
      if (fs.existsSync(localFilePath)) {
        await fs.promises.unlink(localFilePath);
      }
    } catch (cleanupError) {
      console.error("Failed to delete local temp file:", cleanupError);
    }
  }
};

export { uploadOnCloudinary, deleteFromCloudinary, uploadLargeOnCloudinary };
