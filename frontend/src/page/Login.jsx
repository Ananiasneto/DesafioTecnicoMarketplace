import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Marca from "../component/Marca";
import { AccessIcon, ArrowRight02Icon, Mail02Icon, ViewIcon, ViewOffIcon } from "hugeicons-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const body = { email, password };
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, body)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/Home");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  return (
    <Styles>
      <Marca />
      <Fomulario>
        <Container>
          <Text>
            <h1>Acesse sua conta</h1>
            <h2>Informe seu email e senha pra entrar</h2>
          </Text>
          <SubTitle>E-mail</SubTitle>
          <form onSubmit={handleLogin}>
            <InputWrapper>
              <Mail02Icon className="icon"/>
              <input 
                type="email" 
                placeholder="Seu Email Cadastrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputWrapper>
          <SubTitle>Senha</SubTitle>
          <InputWrapper>
              <AccessIcon className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <ViewOffIcon className="icon" size={20}/> : <ViewIcon className="icon" size={20}/>}
              </span>
          </InputWrapper>
                <ButtonSubmit type="submit">
                  Acessar
                < ArrowRight02Icon/>
              </ButtonSubmit>
          </form>
        </Container>
      <FooterCadastro>
          <h1>Ainda não tem uma conta?</h1>
          <ButtonCadastro onClick={() => navigate("/Cadastro")} style={{ cursor: "pointer" }}>
          <h2>
           Cadastrar
          </h2>
          < ArrowRight02Icon/>
        </ButtonCadastro>
      </FooterCadastro>
      </Fomulario>  
    </Styles>
  );
}

const Styles = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
   
 
`;
const ButtonSubmit = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 15px;
  margin-top: 50px;
  padding: 0 15px 0 15px;
  background-color: #f24d0d;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
`;

const Fomulario = styled.div`   
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: 500px;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  margin-top: 20px;
  margin-right: 30px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top:25px;
`;
const SubTitle =styled.h2`
   font-size: 15px;
   margin-bottom:5px;
   color: #888;
   margin:0;
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
  input {
    width: 100%;
    height: 40px;
    font-size: 15px;
    padding:5px; 
    border: none;
    color: #888;
    outline: none;
  }

  .icon {
    font-size: 24px;
    color: #888;
  }
`;


const Text = styled.div`
  margin-bottom: 20px;
  h1 { 
  font-size: 24px; 
  margin: 0; 
  margin-bottom: 10px;
  }
  h2 { 
  font-size: 16px;
   margin: 0; color: #666;
  }
`;

const FooterCadastro = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  h1 {
    font-size: 16px;
    margin: 0 0 10px 0;
    color: #666;
  }
  h2{
  font-size: 15px;
  color: #f24d0d;
  }
`;

const ButtonCadastro = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-size: 15px;
  padding: 0 15px 0 15px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #f24d0d;
  color: #f24d0d;
  font-weight: 500;
  cursor: pointer;

`;
