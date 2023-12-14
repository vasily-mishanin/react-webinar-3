import { createContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/use-localstorage";

/**
 * @type {React.Context<{}>}
 */
export const AuthContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const storage = useLocalStorage();

  useEffect(() => {
    (async () => {
      const token = storage.getItem("token");
      if (!user && token) {
        await getMe(token);
      }
    })();
  }, []);

  /**
   *
   * @param {Object} creds
   */
  const getUser = async (creds) => {
    try {
      setWaiting(true);
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
        },
        body: JSON.stringify(creds),
      });

      const data = await response.json();

      setWaiting(false);

      if (data.error) {
        setUser(null);
        setError(data.error);
      } else if (data.result.token) {
        storage.setItem("token", data.result.token);
        const { name, phone } = data.result.user.profile;
        const { email } = data.result.user;
        setUser({ name, phone, email, token: data.result.token });
        setError(null);
      }
    } catch (err) {
      console.error("While getting user", err);
    }
  };

  const logOut = async () => {
    const token = storage.getItem("token");
    setError(null);
    setUser(null);
    storage.removeItem("token");

    try {
      setWaiting(true);
      await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
        },
      });
      setWaiting(false);
    } catch (err) {
      console.error("While user delete", err);
    }
  };

  async function getMe(token) {
    try {
      setWaiting(true);
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
        },
      });

      const data = await response.json();
      setWaiting(false);

      if (data.error) {
        setUser(null);
        setError(data.error);
      } else if (data.result.profile) {
        const { name, phone } = data.result.profile;
        setUser({ name, phone, email: data.result.email, token });
        setError(null);
      }
    } catch (err) {
      console.error("While user init", err);
    }
  }

  const authValue = useMemo(
    () => ({
      // состояние авторизации
      user,
      error,
      getUser,
      getMe,
      logOut,
      waiting,
    }),
    [user, error, waiting]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
