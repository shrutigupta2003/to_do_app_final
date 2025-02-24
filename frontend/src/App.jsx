import React from "react";
import Home from "./components/Home";
import Login from "./components/login";
import Signup from "./components/signup";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
const App = () => {
  let token = localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
