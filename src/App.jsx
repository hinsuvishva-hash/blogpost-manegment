import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import AuthGuard from "./Auth/AuthGuard";
import { ToastContainer } from "react-toastify";
import Analytics from "./pages/Analytics";

const DefultRouter = () => {
  const data = JSON.parse(localStorage.getItem("blog_rdata"));

  if (data) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <DefultRouter />,
    },
    {
      path: "/register",
      element: (
        <AuthGuard required={false}>
          <Register />
        </AuthGuard>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthGuard required={false}>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },
    {
      path: "/create-post",
      element: (
        <AuthGuard required={true}>
          <CreatePost />
        </AuthGuard>
      ),
    },
    {
      path: "/post/:id",
      element: (
        <AuthGuard required={true}>
          <PostDetails />
        </AuthGuard>
      ),
    },
    {
      path: "/Analytics",
      element: (
        <AuthGuard required={true}>
          <Analytics/>
        </AuthGuard>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={route} />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme="light"
      />
    </>
  );
}

export default App;