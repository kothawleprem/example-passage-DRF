import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

export function useAuthStatus() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    userid: "",
  });

  useEffect(() => {
    let cancelRequest = false;
    const authToken = localStorage.getItem("psg_auth_token");
    axios
      .post(`${API_URL}/api/client/auth/`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (cancelRequest) {
          return;
        }
        const { authStatus, identifier } = response.data;
        // console.log(authStatus)
        if (authStatus === "success") {
          setResult({
            isLoading: false,
            isAuthorized: authStatus,
            userid: identifier,
          });
        } else {
          setResult({
            isLoading: false,
            isAuthorized: false,
            userid: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setResult({
          isLoading: false,
          isAuthorized: false,
          userid: "",
        });
      });
    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}
