import { Link } from "react-router-dom";
import "./style.css";
import useAuth from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

export default function AuthHeader() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="AuthHeader">
      {user && (
        <>
          <Link className="AuthHeader-link" to="/profile">
            {user.name}
          </Link>
          <button className="AuthHeader-button" onClick={handleLogOut}>
            {t("auth.logout")}
          </button>
        </>
      )}
      {!user && (
        <Link className="AuthHeader-button" to="/login">
          {t("auth.enter")}
        </Link>
      )}
    </div>
  );
}
