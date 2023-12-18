import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import ProtectedRoute from "../components/protected-route";
import SkipRoute from "../components/skip-route";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);

  const storage_token = localStorage.getItem("auth_token");

  if (storage_token) {
    useInit(async () => {
      await store.actions.auth.getMe(storage_token);
    }, []);
  }

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            <SkipRoute redirectPath="/profile">
              <Login />
            </SkipRoute>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProtectedRoute redirectPath="/login">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
