import { useCallback, useState, memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function FormLogin(props) {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const callbacks = {
    onChange: useCallback((e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    ),
    onSubmit: useCallback((e) => {
      e.preventDefault();
      props.getUser(formData);
    }),
  };

  return (
    <div className="FormLogin">
      <h1 className="FormLogin-title">{props.labels.enter}</h1>
      <form className="FormLogin-form" onSubmit={callbacks.onSubmit}>
        <div className="FormLogin-item">
          <label htmlFor="login">{props.labels.username}</label>
          <input
            type="text"
            name="login"
            id="login"
            value={formData.login}
            onChange={callbacks.onChange}
          />
        </div>
        <div className="FormLogin-item">
          <label htmlFor="password">{props.labels.password}</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={callbacks.onChange}
          />
        </div>
        <div className="FormLogin-error-msg">
          <p>{props.error ? props.error : ""}</p>
        </div>
        <button>{props.labels.login}</button>
      </form>
    </div>
  );
}

FormLogin.propTypes = {
  error: PropTypes.string,
  labels: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

FormLogin.defaultProps = {
  error: "",
};

export default memo(FormLogin);
