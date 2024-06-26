import axios from "axios";
import { Photo } from "../types/Photo";
import { apiHost } from "../config";

/**
 * Service to manage the Photo data.
 */
export class PhotoService {
  /**
   * Load photos for a given user.
   */
  static async loadPhotos(userID: string): Promise<Photo[]> {
    const response = await axios.get(apiHost + "/photo", {
      params: {
        user_id: userID,
      },
    });

    return response.data.photos;
  }

  /**
   * Store a new photo added by a user
   */
  static async createPhoto({
    userID,
    url,
    description,
  }: {
    userID?: string;
    url: string;
    description?: string;
  }): Promise<Photo | undefined> {
    if (userID) {
      const response = await axios.post(apiHost + "/photo", {
        user_id: userID,
        url,
        description,
      });
      return response.data;
    }
  }
}
