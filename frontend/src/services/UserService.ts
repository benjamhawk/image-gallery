import axios from "axios";
import { apiHost } from "../config";

/**
 * Service to manage the User data
 */
export class UserService {
  private static userIDKey = "user_id";

  /**
   * Retrieve a user with the given email.
   * If the user does not exist, a new one is created.s
   */
  static async createUser(email?: string): Promise<string> {
    if (!email) {
      throw new Error("Email must be provided");
    }
    const response = await axios.post(apiHost + "/user", {
      email,
    });

    localStorage.setItem(this.userIDKey, response.data.user_id);

    return response.data.user_id;
  }

  /**
   * Load the user from local storage
   */
  static loadUser(): string | undefined {
    return localStorage.getItem(this.userIDKey) || undefined;
  }
}
