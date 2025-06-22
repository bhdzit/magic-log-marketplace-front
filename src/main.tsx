import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { FeaturesRoutes } from "./features/routes";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { requestError, requestInterceptor } from "./utils/interceptors";

const root = document.getElementById("root");
axios.interceptors.request.use(requestInterceptor, requestError);

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <FeaturesRoutes></FeaturesRoutes>
    <ToastContainer />
  </BrowserRouter>
);
