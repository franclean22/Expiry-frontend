import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import LazyLoading from "../Loading/Error/LazyLoading";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded components
const LazyFooter = lazy(() => import("./Footer"));
const LazyHeader = lazy(() => import("./Header"));
const LazySidebar = lazy(() => import("./Sidebar"));

const Layout = () => {
  return (
    <Suspense fallback={<LazyLoading />}>
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
      <LazyHeader />
      <LazySidebar />
      <Outlet />
      <LazyFooter />
    </Suspense>
  );
};

export default Layout;
