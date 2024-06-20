import { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { PhotoPage } from "./pages/PhotoPage";
import { GlobalProvider, Page } from "./hooks/useGlobalContext";

export default function App() {
  const [page, setPage] = useState<Page>(Page.Login);
  const [user, setUser] = useState<string | undefined>();

  return (
    <GlobalProvider value={{ page, setPage, user, setUser }}>
      <main>
        <header>
          <h1>{page === Page.Photo ? "Photo Gallery" : "Login"}</h1>
        </header>

        {/* For simplicity routed this based on a useState hook. 
        In an real production applicitation, I would reach for react-router or a framework (ie. Next or Remix). */}

        {/* TODO: Sync URL path with the selected page */}
        {page === Page.Login && <LoginPage />}
        {page === Page.Photo && <PhotoPage />}
      </main>
    </GlobalProvider>
  );
}
