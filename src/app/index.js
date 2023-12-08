import Root from "./root";
import Main from "./pages/main";
import ProductPage from "./pages/product";
import NotFoundPage from "./not-found";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "products/:productId",
        element: <ProductPage />,
      },
    ],
  },
]);

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  return <RouterProvider router={router} />;
}

export default App;
