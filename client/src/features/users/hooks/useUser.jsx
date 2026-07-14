import { useCallback, useState } from "react";
import { getUserProfile } from "../api/userApi";
import { useParams } from "react-router-dom";

export const useUser = () => {
  const { username } = useParams();

  const [userPageInfo, setUserPageInfo] = useState(null);

  const [loadingUserPage, setLoadingUserPage] = useState(true);
  const [error, setError] = useState(null);
  const getUserPage = useCallback(async () => {
    try {
      const { data } = await getUserProfile(username);
      setUserPageInfo(data.user);
    } catch (error) {
      setError(error);
      setUserPageInfo(error.response.data.user);
    } finally {
      setLoadingUserPage(false);
    }
  }, []);

  return {
    userPageInfo,

    getUserPage,

    loadingUserPage,
  };
};
