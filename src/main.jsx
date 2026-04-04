import ReactDOM from "react-dom/client";

import App from "./app/App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthProvider";
import { AdminProvider } from "./admin/index/AdminProvider";
import AdminRoute from "./admin/index/AdminRoute";
import AdminDash from "./admin/design/components/AdminDash";
import AdminLayout from "./admin/design/layouts/AdminLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDash />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </AuthProvider>,
);
