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
import AdminLayout from "./admin/design/layouts/AdminLayout";
import SemestersDash from "./admin/design/components/list/SemestersDash";
import SubjectListDash from "./admin/design/components/list/SubjectListDash";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ✅ Main Layout */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>

      {/* ✅ Admin Layout (separate) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<SemestersDash />} />
        <Route path="/admin/subjects" element={<SubjectListDash />} />
      </Route>
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </AuthProvider>,
);
