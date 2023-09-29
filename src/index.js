import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/home/Home";
import './styles.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
