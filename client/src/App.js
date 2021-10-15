import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";

import Header from "./components/Header";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import AuthService from "./services/auth.service";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { Home, Profile, Login, Register } from "./views";

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthProvider>
      <Layout startingTheme="light">
        <>
          <Header currentUser={currentUser} />
          <Route path="/" exact component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
        </>
      </Layout>
    </AuthProvider>
  );
}

export default App;
