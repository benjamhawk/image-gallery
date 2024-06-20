import { FC, createContext, useContext } from "react";

const GlobalContext = createContext<any>(undefined);

export type GlobalContextProps = {
  value: {
    setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
    user: string | undefined;
    setPage: React.Dispatch<React.SetStateAction<Page>>;
    page: Page;
  };
  children: React.ReactNode;
};

/**
 * Provider to wrap the app with the global state context
 */
const GlobalProvider: FC<GlobalContextProps> = ({ children, value }) => {
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

/**
 * Custom hook to use the global state context.
 * Contains the page and user state.
 * @example const { page, user, setPage, setUser } = useGlobalContext();
 */
const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context as GlobalContextProps["value"];
};

enum Page {
  Login = "login",
  Photo = "photo",
}

// TODO: Fix eslint error
export { GlobalProvider, useGlobalContext, Page };
