import cloudinary from "../util/cloudinary.js";
import { logError, logInfo } from "../util/logging.js";

export const uploadedPhoto = async (req, res) => {
  const { image } = req.body;
  const uploadedImg = await cloudinary.v2.uploader.upload(
    image,
    {
      upload_preset: "unsigned_upload",
      allowed_formats: ["png", "jpg", "jpeg", "gif"],
    },
    function (err, result) {
      if (err) {
        logError(err);
        res.status(500).json({ success: false, msg: "Unable to upload Photo" });
      }
      logInfo(result);
    }
  );

  try {
    res.status(200).json(uploadedImg);
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to upload Photo" });
  }
};
