/* eslint-disable no-unused-vars */

import { v4 as uuid } from "uuid";
import { isURLImage } from "../../..";

export enum FileType {
  Image = "IMAGE",
  Document = "DOCUMENT",
}

export type UploadFileType = {
  id: string;
  file?: File & { path?: string };
  url?: string;
  name?: string;
  type: FileType;
  // uploadType?: string;
};

export const getFilesInfo = (
  files: Array<File & { path?: string }>
): UploadFileType[] =>
  files.map((file) => ({
    id: uuid(),
    file,
    type: isURLImage(file.path) ? FileType.Image : FileType.Document,
  }));
