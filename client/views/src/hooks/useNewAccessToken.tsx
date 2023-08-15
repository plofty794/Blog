import { useAccessTokenStore } from "@/store/accessTokenStore";
import { axiosPrivateRoute } from "@/api/axios";

function useNewAccessToken() {
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  async function getAccessToken() {
    const { data } = await axiosPrivateRoute.post("/refresh/accessToken");
    setAccessToken(null);
    setAccessToken(data.accessToken);
    return data.accessToken;
  }

  return getAccessToken;
}

export default useNewAccessToken;
