import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";
import OrdersList from "./pages/OrdersPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,

    children: [
      {
        path: "/",
        element: <App />,
        index: true,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/orders",
        element: <OrdersList />,
      },
    ],
  },
]);
