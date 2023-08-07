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

function App() {
  const user = useUserStore((state) => state.user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route
          index
          path="/home"
          element={!user ? <Navigate replace to={"/unauthorized"} /> : <Home />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
