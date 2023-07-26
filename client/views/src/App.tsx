import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import RootLayout from "./RootLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
