import { FormEvent, useState } from "react";
import { UserService } from "../services/UserService";
import { useLoadUser } from "../hooks/useLoadUser";
import { Page, useGlobalContext } from "../hooks/useGlobalContext";

/**
 *
 */
export function LoginPage() {
  const [email, setEmail] = useState<string>("example@email.com");
  const [isError, setIsError] = useState<boolean>(false);
  const { setPage, setUser } = useGlobalContext();

  useLoadUser();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsError(false);

    // TODO: Add validation for email

    try {
      const user = await UserService.createUser(email);
      setPage(Page.Photo);
      setUser(user);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div>
      {isError && (
        // TODO: Make error messages more dynamic
        <div>There was an error. Please check the email and try again.</div>
      )}
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
