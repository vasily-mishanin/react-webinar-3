import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/use-localstorage";
import useSelector from "../../hooks/use-selector";

const SkipRoute = ({ children, redirectPath }) => {
  const auth = useSelector((state) => state.auth);
  const storage = useLocalStorage();
  console.log("SkipRoute", auth);

  const storage_token = storage.getItem("auth_token");
  if (storage_token || auth.token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default SkipRoute;
