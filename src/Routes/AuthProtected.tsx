import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



import { RootState } from "../app/store";

import Cookies from "js-cookie";
import { selectCurrentUser, setCredentials } from "features/authSlice";

const AuthProtected = (props: any) => {
  const token = Cookies.get("astk");
  const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => selectCurrentUser(state));

  /*
    Navigate is un-auth access protected routes via url
    */
    useEffect(() => {
      const fetchUserData = async () => {
        if (token) {
          const response = await fetch("http://localhost:5000/api/user/get-user-by-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ api_token: token }),
          });
  
          if (response.ok) {
            const data = await response.json();
            dispatch(setCredentials({ user: data.user }));
          } else {
            console.error("Failed to fetch user data");
          }
        }
      };
  
      fetchUserData();
    }, [dispatch, token]);

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };