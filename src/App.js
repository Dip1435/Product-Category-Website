import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Login from "./components/Auth/Login";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/NotFound";
import ProductList from "./components/Lists/ProductList";
import CategoryList from "./components/Lists/CategoryList";
import ProtectedRoute from "./components/Routes/protectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="products" element={<ProductList />} />
            <Route
              path="categories"
              element={
                <ProtectedRoute role="admin">
                  <CategoryList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
};

export default App;
