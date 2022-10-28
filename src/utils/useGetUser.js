/**
 * Send header to SWR
 * https://stackoverflow.com/questions/65862928/how-to-send-headers-using-swr
 */

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import useSWR from "swr";

function useGetUser() {
  const [user, setUser] = useState({});

  const fetcher = (url, token) =>
    axios
      .get(url, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => res.data);

  const { data, error } = useSWR(
    [
      "https://skillnao-ssr.onrender.com/user/me",
      localStorage?.getItem("skillNaoToken"),
    ],
    fetcher
  );

  useEffect(() => {
    setUser(data?.data);
  }, [data?.data]);

  return {
    user: user,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useGetUser;
