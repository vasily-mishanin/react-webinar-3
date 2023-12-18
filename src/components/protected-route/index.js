import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/use-localstorage";
import useSelector from "../../hooks/use-selector";

const ProtectedRoute = ({ children, redirectPath }) => {
  const auth = useSelector((state) => state.auth);
  const storage = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const storage_token = storage.getItem("auth_token");

    if (!auth.token && !storage_token) {
      navigate(redirectPath, { replace: true });
    }
  }, []);

  return children;
};

export default ProtectedRoute;
