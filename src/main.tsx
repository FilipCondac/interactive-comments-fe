import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

axios.defaults.baseURL = "http://localhost:8001/api/routes";

const Auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const Auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={Auth0Domain}
      clientId={Auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
