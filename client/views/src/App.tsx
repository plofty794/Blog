import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import RootLayout from "./RootLayout";
import { useUserStore } from "@/store/userStore";
import UnauthorizedPage from "./partials/UnauthorizedPage";
import BlogDetails from "./routes/BlogDetails";

function App() {
  const user = useUserStore((state) => state.user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route
          index
          path="/home"
          element={!user ? <Navigate replace to={"/signin"} /> : <Home />}
          errorElement={<UnauthorizedPage />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate replace to={"/home"} /> : <Signin />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate replace to={"/home"} /> : <Signup />}
        />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
