import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/Login";
import Cadastro from "./page/Cadastro";


function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
