import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import AuthService from "./services/auth.service";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { Home, Profile, Login, Register } from "./views";

const authenticated = true;
const RouteGuard =
  (Component) =>
  ({ match }) => {
    if (!authenticated) {
      return <Redirect to={"/"} />;
    }
    return <Component match={match} />;
  };

function App() {
  const [currentUser, setCurrentUser] = useState();

  return (
    <AuthProvider>
      <Layout startingTheme="light">
        <>
          <Header currentUser={currentUser} />
          <Route path="/" exact render={() => <Home />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route path="/profile" render={RouteGuard(Profile)} />
        </>
      </Layout>
    </AuthProvider>
  );
}

export default App;
