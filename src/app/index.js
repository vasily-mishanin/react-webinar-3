import Main from "./pages/main";
import Products from "./products";
import NotFoundPage from "./not-found";
import ProductDetails from "./product-details";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
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
