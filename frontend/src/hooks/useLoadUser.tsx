import { useEffect } from "react";
import { UserService } from "../services/UserService";
import { Page, useGlobalContext } from "./useGlobalContext";

/**
 * Custom hook to load the user from local storage
 */
export const useLoadUser = () => {
  const { setPage, setUser } = useGlobalContext();

  useEffect(() => {
    const id = UserService.loadUser();

    if (id) {
      setUser(id);
      setPage(Page.Photo);
    }
  }, []);
};
