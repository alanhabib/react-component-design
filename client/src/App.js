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
// const API_URL = "https://localhost:5001/api/users";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  // const fetchUsers = async () => {
  //   return await axios.get(API_URL);
  // };

  useEffect(() => {
    // const users = fetchUsers();
    // console.log("JOHAN USERS", users);
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthProvider>
      <Layout startingTheme="light">
        <>
          <Header />
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              bezKoder
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="/"
                    className="nav-link"
                    onClick={() => AuthService.logout()}
                  >
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <Route path="/" exact component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
        </>
      </Layout>
    </AuthProvider>
  );
}

export default App;
