import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Marca from "../component/Marca";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { KeyIcon } from "../icons/KeyIcon";
import { MailIcon } from "../icons/MailIcon";
import {GoToIcon, GoToIconWhite} from "../icons/GoToIcon"
import styled from "styled-components";
import { UploadIcon } from "../icons/UploadIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { PersonIcon } from "../icons/PersonIcon";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  function handleCadastro(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!name || !email || !password || !confirmPassword || !phone) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phone", phone);
    if (image) formData.append("image", image);

    axios
      .post(`${import.meta.env.VITE_API_URL}/sign-up`, formData)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        navigate("/Login");
      })
      .catch((err) => {
        const errors = err.response?.data?.errors;
        if (errors) alert(errors.join(", "));
        else alert(err.response?.data?.error || "Erro ao cadastrar");
      });
  }

  return (
    <Styles>
      <MarcaContainer><Marca /></MarcaContainer>
      <Fomulario>
        <Container>
          <Text>
            <h1>Crie sua conta</h1>
            <h2>Informe os seus dados pessoais e de acesso</h2>
          </Text>
          <form onSubmit={handleCadastro}>
            <Title>Perfil</Title>
            <FileWrapper>
              <input 
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label htmlFor="file-upload" className="file-label">
                <UploadIcon />
              </label>
            </FileWrapper>

            <SubTitle>Nome</SubTitle>
            
            <InputWrapper>
            <PersonIcon />
              <input
                type="text"
                placeholder="Seu nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputWrapper>

            <SubTitle>Telefone</SubTitle>
           
            <InputWrapper> 
            <PhoneIcon/>
              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </InputWrapper>

            <SubTitle>E-mail</SubTitle>
            <InputWrapper>
              <MailIcon className="icon-left" />
              <input
                type="email"
                placeholder="Seu E-mail de acesso"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputWrapper>

            <SubTitle>Senha</SubTitle>
            <InputWrapper>
              <KeyIcon className="icon-left" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="icon-right" size={20} />
                ) : (
                  <FiEye className="icon-right" size={20} />
                )}
              </span>
            </InputWrapper>

            <SubTitle>Confirme a Senha</SubTitle>
            <InputWrapper>
            <KeyIcon className="icon-left" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
               <span
                className="toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="icon-right" size={20} />
                ) : (
                  <FiEye className="icon-right" size={20} />
                )}
              </span>
            </InputWrapper>

            <ButtonSubmit type="submit">
              Cadastrar
              <GoToIconWhite />
            </ButtonSubmit>
          </form>
        </Container>

        <FooterCadastro>
          <h1>Já tem uma conta?</h1>
          <ButtonCadastro
            onClick={() => navigate("/Login")}
            style={{ cursor: "pointer" }}
          >
            <h2>Acessar</h2>
            <GoToIcon />
          </ButtonCadastro>
        </FooterCadastro>
      </Fomulario>
    </Styles>
  );
}


const Styles = styled.div`
display:flex;
`;
const MarcaContainer = styled.div`
margin-top:35px;
`;

const ButtonSubmit = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 15px;
  margin-top: 50px;
  padding: 0 15px;
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
  height: auto;
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

const SubTitle = styled.h2`
   font-size: 15px;
   margin: 0 0 5px 0;
   color: #888;
`;
const Title = styled.h1`
   font-size: 20px;
   margin: 0 0 5px 0;
`;

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
    padding: 5px; 
    border: none;
    color: #888;
    outline: none;
  }

  .icon {
    font-size: 24px;
    color: #888;
  }
`;
const FileWrapper = styled.div`
  width: 350px;
  margin: 10px 0 15px 0;

  input[type="file"] {
    display: none;
  }

  .file-label {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: #f5eaea;
    color: #f24d0d;
    font-size: 14px;
  }
`;

const Text = styled.div`
  margin-bottom: 30px;
  h1 { 
    font-size: 24px; 
    margin: 0 0 10px 0;
  }
  h2 { 
    font-size: 16px;
    margin: 0; 
    color: #666;
  }
`;

const FooterCadastro = styled.div`
  margin-top:50px;
  display: flex;
  flex-direction: column;
  width: 350px;
  h1 {
    font-size: 16px;
      text-shadow: 2px 2px 4px rgba(124, 123, 123, 0.5);
    margin: 0 0 10px 0;
    color: #666;
  }
  h2 {
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
  padding: 0 15px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #f24d0d;
  color: #f24d0d;
  font-weight: 500;
  cursor: pointer;
`;
