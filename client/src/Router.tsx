import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Admin } from "./pages/Admin";
import { Confirmation } from "./pages/Confirmation";
import { NotFound } from "./pages/NotFound";
import OrdersList from "./pages/OrdersPage";

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
        path: "/confirmation",
        element: <Confirmation />,
      },
      {
        path: "/orders",
        element: <OrdersList />,
      },
    ],
  },
]);
