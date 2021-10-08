import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const PublicRoute = ({ component: Component, ...rest }) => {
  console.log("COMPONENT: ", Component);

  console.log("rest: ", { ...rest });
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(!AuthService.getCurrentUser());
        !AuthService.getCurrentUser() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/profile" }} />
        );
      }}
    />
  );
};

export default PublicRoute;
