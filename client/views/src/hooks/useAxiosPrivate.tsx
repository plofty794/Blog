import { axiosPrivateRoute } from "@/api/axios";
import { useAccessTokenStore } from "@/store/accessTokenStore";
import { useUserStore } from "@/store/userStore";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import useNewAccessToken from "./useNewAccessToken";

interface AxiosConfig extends AxiosRequestConfig {
  sent: boolean;
}

function useAxiosPrivate() {
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const logOut = useUserStore((state) => state.setLogOut);
  const newAccessToken = useNewAccessToken();
  const user = useUserStore((state) => state.user);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  useEffect(() => {
    const requestInterceptor = axiosPrivateRoute.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    const responseInterceptor = axiosPrivateRoute.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config as AxiosConfig;
        if (error?.response.status === 401) {
          const token = await newAccessToken();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          prevRequest!.headers!.Authorization = `Bearer ${token}`;
          return axiosPrivateRoute(prevRequest);
        }
        if (error?.response.status === 403) {
          setAccessToken(null);
          logOut();
          prevRequest!.headers!.Authorization = `Bearer ${null}`;
          return axiosPrivateRoute(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateRoute.interceptors.request.eject(requestInterceptor);
      axiosPrivateRoute.interceptors.request.eject(responseInterceptor);
    };
  }, [user, accessToken, newAccessToken]);

  return axiosPrivateRoute;
}

export default useAxiosPrivate;
