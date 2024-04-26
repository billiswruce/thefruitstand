import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Admin } from "./components/Admin";
import { Confirmation } from "./components/Confirmation";
import { NotFound } from "./components/NotFound";
import OrdersList from "./components/OrdersPage";

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
