import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
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

    formData.forEach((value, key) => {
      console.log(key + ": " + value);  
    });

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
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro}>
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
        />
        <input 
          type="text" 
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <p onClick={() => navigate("/Login")} style={{ cursor: "pointer" }}>
        Já tem conta? Faça login
      </p>
    </div>
  );
}
