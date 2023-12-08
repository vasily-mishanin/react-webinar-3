import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Outlet } from "react-router-dom";

function Root() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Outlet />

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default Root;
