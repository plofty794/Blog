import { Link, Outlet } from "react-router-dom";
import { useUserStore } from "./store/userStore";
import { buttonVariants } from "./components/ui/button";
import { useAccessTokenStore } from "./store/accessTokenStore";

function RootLayout() {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.setLogOut);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  function handleLogout() {
    logOut();
    setAccessToken(null);
  }
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        {user && (
          <nav className="px-8 py-3 bg-slate-950 border-b border-slate-700">
            <ul className="text-slate-200 font-semibold w-full flex justify-end items-center">
              <li>
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                    className: "text-white mr-2",
                  })}
                  to={"/profile"}
                >
                  {user && user.email}
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  reloadDocument={true}
                  onClick={handleLogout}
                  replace
                  className={buttonVariants({
                    variant: "ghost",
                    className: "hover:bg-slate-700 hover:text-white",
                  })}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <Outlet />;
      </div>
    </>
  );
}

export default RootLayout;
