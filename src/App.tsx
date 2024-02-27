import { Global, css } from "@emotion/react";
import { Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ThanksPage } from "./pages/ThanksPage";

const global = css`
  body {
    margin: 0;
    background-color: #eee;
  }
`;

function App() {
  return (
    <>
      <Global styles={global} />
      <Routes>
        {/* 動作確認のためにユーザー登録ページを仮のトップページにする */}
        <Route index element={<RegisterPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
