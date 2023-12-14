import { useCallback, useMemo, useState } from "react";
import useAuth from "../../hooks/use-auth";
import "./style.css";

function FormLogin() {
  const [formData, setFormData] = useState({});
  const { error, user, getUser } = useAuth();

  const callbacks = {
    onChange: useCallback((e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    ),
    onSubmit: useCallback((e) => {
      e.preventDefault();
      getUser(formData);
    }),
  };

  return (
    <div className="FormLogin">
      <h1 className="FormLogin-title">Вход</h1>
      <form className="FormLogin-form" onSubmit={callbacks.onSubmit}>
        <div className="FormLogin-item">
          <label htmlFor="login">Логин</label>
          <input
            type="text"
            name="login"
            id="login"
            onChange={callbacks.onChange}
          />
        </div>
        <div className="FormLogin-item">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={callbacks.onChange}
          />
        </div>
        <div className="FormLogin-error-msg">
          <p>{error ? error?.data?.issues[0]?.message : ""}</p>
        </div>
        <button>Войти</button>
      </form>
    </div>
  );
}
export default FormLogin;
