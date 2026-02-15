import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./Auth/AuthGuard";
import CreatePost from "./pages/Createpost";
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
  ]);
  return (
    <>
      <RouterProvider router={route} />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;