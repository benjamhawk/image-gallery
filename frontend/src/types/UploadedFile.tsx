export type UploadedFile = {
  uuid: string;
  cdnUrl: string;
  fileInfo: {
    originalFilename: string;
  };
  status: string;
};
