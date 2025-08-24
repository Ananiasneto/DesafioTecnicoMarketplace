import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/Login";
import Cadastro from "./page/Cadastro";
import { createGlobalStyle } from "styled-components";
import Home from "./page/Home";
import Products from "./page/Products";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body, #root {
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #fbf4f4;
  }
`;

export default App;
