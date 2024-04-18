import { FileArray } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";

class FileService {
  uploadFilePicker(files: FileArray) {
    try {
      const file = Array.isArray(files.img) ? files.img[0] : files.img;
      const fileName = uuidv4() + ".jpg";
      const filePath = path.resolve("static", fileName);
      file.mv(filePath);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }

  uploadFileVideo(files: FileArray) {
    try {
      const file = Array.isArray(files.video) ? files.video[0] : files.video;
      const fileName = uuidv4() + ".mp4";
      const filePath = path.resolve("static", fileName);
      file.mv(filePath);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

export const fileServices = new FileService();
