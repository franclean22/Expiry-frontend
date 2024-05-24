import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaAddressBook, FaBars, FaSearch } from "react-icons/fa";
import { IS_ACTIVE } from "./../Redux/Constants/SidebarConstant";
import { logout } from "../Redux/Action/UserAction";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const setSidebar = useSelector((state) => state.setSidebar);
  const openSidebar = () => {
    dispatch({ type: IS_ACTIVE });
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  console.log(userInfo);
  const handleLogout = () => {
    dispatch(logout());
  };

  const [keyword, setKeyword] = React.useState("");

  const handleSearch = (e, keyword) => {
    e.preventDefault();
    if (keyword) {
      history(`/store/${keyword}`);
      setKeyword("");
    } else {
      history("/");
    }
  };
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const [message, setMessage] = useState("");

  const [loadingg, setLoadingg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [erorrr, setErorrr] = useState(false);

  const handleCheckExpiry = async () => {
    setLoadingg(true);
    try {
      const response = await api.get("/api/products/check-expiry");
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setErorrr(true);
    } finally {
      setLoadingg(false);
   
    }
  };
  React.useEffect(() => {
    if (success) {
      toast(`Expiry check and email notifications sent successfully `, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
        const timer = setTimeout(() => {
          setSuccess(false);
        }, 1000); // Adjust the duration as needed

        // Cleanup the timer when the component unmounts or success changes
        return () => clearTimeout(timer);
    }
    if (erorrr) {
      toast(`Error checking expiry and sending email notifications`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
        const timer = setTimeout(() => {
          setErorrr(false);
        }, 1000); // Adjust the duration as needed

        // Cleanup the timer when the component unmounts or success changes
        return () => clearTimeout(timer);
    }
  }, [success, erorrr]);

  return (
    <>
      {/****HEADER FOR LARGE SCREEN *****/}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header className="header-upper large px-3 ">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-md-1 col-sm-6 header-logo">
              <img src="/images/amma.png" className="img-fluid " />
            </div>
            <div className="col-md-7 col-sm-12">
              <form
                className="input-group"
                onSubmit={(e) => handleSearch(e, keyword)}
              >
                <input
                  type=""
                  className="form-control"
                  placeholder="Search amazon"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.trim())}
                />
                <button className="input-group-text" id="basic-addon2">
                  <FaSearch />
                </button>
              </form>
            </div>
            <div className="col-md-4 col-sm-12 ">
              <div className="header-upper-links d-flex justify-content-between align-items-center">
                <div className="header-items">
                  <Link
                    to={"/wishlist"}
                    className="d-flex align-items-center text-white gap-10"
                  >
                    <img src="/images/love.svg" />
                    <p className="mb-0 ">
                      Favorite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div className="small-avatar header-items">
                  {userInfo ? (
                    <div class="dropdown">
                      <div
                        className=" dropdown-toggle d-flex align-items-center text-white gap-10"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <p className="mb-0 user-text">
                          Hello <br />
                          {userInfo.name}
                        </p>
                      </div>
                      <ul class="dropdown-menu">
                        <Link to={"/profile"}>
                          <li>
                            <a class="dropdown-item" href="#">
                              Profile
                            </a>
                          </li>
                        </Link>
                        <li onClick={handleLogout}>
                          <a class="dropdown-item" href="#">
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="d-flex align-items-center text-white gap-10"
                    >
                      <p className="mb-0 ">
                        Login <br /> My Account
                      </p>
                    </Link>
                  )}
                </div>
                <div className="cart-container">
                  <Link
                    to={"/cart"}
                    className="d-flex align-items-center text-white gap-10"
                  >
                    <img src="/images/cart.png" />
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HEADER FOR MOBILE SCREEN */}
      <header className="header-upper mobile px-y py-3 ">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="d-flex gap-10 col-6 col-md-1 col-sm-4 align-items-center">
              <div className="bar" onClick={openSidebar}>
                {/* <img src='/images/bar.svg'/> */}
                <FaBars />
              </div>
              <div className="header-logo">
                <img src="/images/amma.png" />
              </div>
            </div>
            <div className="col-6 col-md-6 col-sm-8">
              <div className="header-upper-links d-flex justify-content-between align-items-center">
                <div className="d-flex gap-10 me">
                  <div className="small-avatar">
                    {userInfo ? (
                      <div class="dropdown">
                        <div
                          className=" dropdown-toggle d-flex align-items-center text-white gap-10"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <p className="mb-0 user-text">
                            Hello <br />
                            {userInfo.name}
                          </p>
                        </div>
                        <ul class="dropdown-menu">
                          <Link to={"/profile"}>
                            <li>
                              <a class="dropdown-item" href="#">
                                Profile
                              </a>
                            </li>
                          </Link>
                          <li onClick={handleLogout}>
                            <Link class="dropdown-item" href="#">
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="d-flex align-items-center text-white gap-10"
                      >
                        <p className="mb-0 ">
                          Login <br /> My Account
                        </p>
                      </Link>
                    )}
                  </div>
                  <div className="cart-container">
                    <Link
                      to={"/cart"}
                      className="d-flex align-items-center text-white gap-10"
                    >
                      <img src="/images/cart.svg" />
                      <span className="badge">{cartItems.length}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 ">
              <form
                className="input-group"
                onSubmit={(e) => handleSearch(e, keyword)}
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Product"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.trim())}
                />
                <span className="input-group-text" id="basic-addon2">
                  <FaSearch />
                </span>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/******* HEADER STRIP*****/}
      <header className="header-bottom px-3 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Store</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <button
                      onClick={handleCheckExpiry}
                      disabled={loadingg}
                      className="bn"
                    >
                      {loadingg ? "Checking..." : "Check Expiry"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
