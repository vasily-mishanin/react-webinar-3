import { useCallback, useMemo, useState, memo } from "react";
import useAuth from "../../hooks/use-auth";
import "./style.css";

function FormLogin() {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const auth = useAuth();

  const callbacks = {
    onChange: useCallback((e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    ),
    onSubmit: useCallback((e) => {
      e.preventDefault();
      auth.getUser(formData);
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
            value={formData.login}
            onChange={callbacks.onChange}
          />
        </div>
        <div className="FormLogin-item">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={callbacks.onChange}
          />
        </div>
        <div className="FormLogin-error-msg">
          <p>{auth.error ? auth.error?.data?.issues[0]?.message : ""}</p>
        </div>
        <button>Войти</button>
      </form>
    </div>
  );
}
export default memo(FormLogin);
