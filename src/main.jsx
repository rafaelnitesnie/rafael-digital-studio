import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import DemoProductPage from "./pages/demo-checkout/ProductPage.jsx";
import DemoCheckoutPage from "./pages/demo-checkout/CheckoutPage.jsx";
import DemoStatusPage from "./pages/demo-checkout/StatusPage.jsx";
import "./index.css";

// Roteamento mínimo por pathname — sem lib de router.
// Normaliza barra final para "/rota/" também funcionar.
const routes = {
  "/demo-checkout": DemoProductPage,
  "/demo-checkout/checkout": DemoCheckoutPage,
  "/demo-checkout/status": DemoStatusPage,
};

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const Page = routes[path] ?? App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
