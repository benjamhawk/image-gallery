import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useLoadPhotos } from "../hooks/useLoadPhotos";
import { PhotoService } from "../services/PhotoService";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useState } from "react";
import { uploadCarePublicKey } from "../config";

export function PhotoPage() {
  // TODO: Preview photos before uploading
  // const [previewPhotos, setPreviewPhotos] = useState<Array<File>>([]);
  const { photos, setPhotos } = useLoadPhotos();
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | undefined>(
    undefined
  );

  const selectedPhoto = photos.find((photo) => photo.id === selectedPhotoId);
  const { user } = useGlobalContext();

  return (
    <div>
      <FileUploaderRegular
        pubkey={uploadCarePublicKey}
        onFileUploadSuccess={async (file) => {
          const photo = await PhotoService.createPhoto({
            userID: user,
            // TODO: Add an input so this field is controlled by the user
            description: file.fileInfo.originalFilename || undefined,
            url: file.cdnUrl,
          });
          if (photo) {
            setPhotos([
              ...photos,
              {
                url: photo.url,
                description: photo.description,
                id: photo.id,
              },
            ]);
          }
        }}
      />

      <div className="photo-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoId(photo.id)}
            className="photo-wrapper"
            style={{
              border: selectedPhotoId === photo.id ? "2px solid blue" : "none",
            }}
          >
            <img src={photo.url + "-/resize/300x/"} alt={photo.description} />
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div>
          <img
            src={selectedPhoto?.url + "-/quality/best/"}
            alt={selectedPhoto?.description}
            className="selected-photo"
          />
        </div>
      )}
    </div>
  );
}
