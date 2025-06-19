import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { FeaturesRoutes } from "./features/routes";
import { ToastContainer } from "react-toastify";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <FeaturesRoutes></FeaturesRoutes>
    <ToastContainer />
  </BrowserRouter>
);
