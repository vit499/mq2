//import "./App.css";
import "./bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TopBar from "./components/router/TopBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
// import {
//   ABOUT_ROUTE,
//   HOME_ROUTE,
//   SETT_ROUTE,
//   LOGIN_ROUTE,
// } from "./components/router/constRouter";
import AdminPage from "./pages/AdminPage";
//import router from "./components/router/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopBar />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sett",
        element: <AdminPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
