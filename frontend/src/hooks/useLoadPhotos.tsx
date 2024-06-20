import { useEffect, useState } from "react";
import { Photo } from "../types/Photo";
import { useGlobalContext } from "./useGlobalContext";
import { PhotoService } from "../services/PhotoService";

/**
 * Custom hook to load photos for the current user
 */
export const useLoadPhotos = () => {
  const { user } = useGlobalContext();

  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const photos = await PhotoService.loadPhotos(user);
        setPhotos(photos);
      }
    };
    fetchData();
  }, [user]);

  return { photos, setPhotos };
};
