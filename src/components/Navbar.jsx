import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../assets/images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../servies/firebase";
import { CurrentUserAuth } from "../redux/action/commonAction";
import { isEmpty } from "lodash";
import { CURRENT_USER } from "../common/constant";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  // console.log("currentUser: ", currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
          dispatch(CurrentUserAuth(user.uid));
        }
      });
  }, []);

  const handleLogout = () => {
    auth.signOut();
    localStorage.clear();
    dispatch({ type: CURRENT_USER, payload: {} });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom gradient">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Event Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {!isEmpty(currentUser) && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={profileIcon}
                  alt=""
                  className="img"
                  style={{ cursor: "pointer" }}
                />
                <span style={{ color: "white" }}>{currentUser.name}</span>
              </div>
            )}
            {!isEmpty(currentUser) ? (
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className="dropdown-item"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
