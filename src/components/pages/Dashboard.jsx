import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/slices/authSlice";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  function handleLogout() {
    toast.success("Logout Successfully");
    dispatch(logout());
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <button
          className="btn btn-primary d-md-none"
          type="button"
          onClick={toggleSidebar}
          style={{ position: "absolute", top: "10px", left: "10px" }}
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-expanded={showSidebar ? "true" : "false"}
          aria-controls="sidebarMenu"
        >
          <FaBars />
        </button>

        <nav
          id="sidebarMenu"
          className={`col-md-3 col-lg-2 d-md-block sidebar text-light collapse position-fixed h-100 ${
            showSidebar ? "show" : ""
          }`}
          style={{ backgroundColor: "#9A616D" }}
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <h2>Dashboard</h2>
                <hr />
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white link-Effect" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white link-Effect" to="products">
                  Products
                </Link>
              </li>
              {user?.user?.role === "admin" && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white link-Effect"
                    to="categories"
                  >
                    Categories
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h5>Welcome, {user?.user?.role}</h5>

            <div className="dropdown">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                  className="rounded-circle"
                  height="45"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <p className="dropdown-item">{user?.user?.role}</p>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
