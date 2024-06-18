import React, { useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function App() {
  const [files, setFiles] = useState<Array<File>>([]);

  console.log(files);

  const handleChangeEvent = (items: any) => {
    setFiles([
      ...items.allEntries.filter((file: File) => file.status === "success"),
    ]);
  };

  return (
    <div>
      <FileUploaderRegular
        onChange={handleChangeEvent}
        pubkey="d8b139264282b18b0844"
        onFileAdded={() => {
          console.log("File added");
        }}
      />

      <div>
        {files.map((file) => (
          <div key={file.uuid}>
            <img src={file.cdnUrl} alt={file.fileInfo.originalFilename} />
          </div>
        ))}
      </div>
    </div>
  );
}

type File = {
  uuid: string;
  cdnUrl: string;
  fileInfo: {
    originalFilename: string;
  };
  status: string;
};
