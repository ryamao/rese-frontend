import React from "react";

import { Global, css } from "@emotion/react";
import ReactDOM from "react-dom/client";

import { RegisterPage } from "./pages/RegisterPage.tsx";

const global = css`
  body {
    background-color: #eee;
    margin: 0;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={global} />
    <RegisterPage />
  </React.StrictMode>
);
