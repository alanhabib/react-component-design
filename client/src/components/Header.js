import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import withAuth from "./withAuth";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled(NavContainer)``;
function Header({ currentUser, loggedInUser, setLoggedInUser }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="padT4 padB4">
      <div className="container mobile-container">
        <NavContainer className="d-flex justify-content-between">
          <div>
            <img width={70} alt="React logo" src="/logo512.png" />
          </div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Phone-contacts
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
          <div className={theme === "light" ? "" : "text-info"}>
            {loggedInUser && loggedInUser.length > 0 ? (
              <div>
                <span>Logged in as {loggedInUser} </span>
                <button className="btn btn-secondary">Logout</button>
              </div>
            ) : (
              <button className="btn btn-secondary">Login</button>
            )}
          </div>
        </NavContainer>
      </div>
    </div>
  );
}

export default withAuth(Header);
