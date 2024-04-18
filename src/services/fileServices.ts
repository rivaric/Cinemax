import { FileArray } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";

class FileService {
  uploadFile(files: FileArray) {
    try {
      const fileName = uuidv4() + ".jpg";
      const filePath = path.resolve("static", fileName);
      const file = Array.isArray(files.img) ? files.img[0] : files.img;
      file.mv(filePath);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

export const fileServices = new FileService();
