import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChartHistogramIcon, LogoutCircle01Icon, PackageIcon } from "hugeicons-react";

export default function TopBar() {
  const [usuario, setUsuario] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    async function buscarUsuario() {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id; 
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } 
    }

    buscarUsuario();
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <Styles>
      <LogoContainer>
        <Logo src=".././logo.jfif" alt="Logo" />
      </LogoContainer>
    
      <TextoCentral>
        <ButtonDashbord onClick={() => navigate("/Home")}>
          <ChartHistogramIcon size={18} style={{ marginRight: '8px' }} />
          Dashboard
        </ButtonDashbord>
        
        <ButtonProduct onClick={() => navigate("/products")}>
          <PackageIcon size={18} style={{ marginRight: '8px' }} />
          Produtos
        </ButtonProduct>
      </TextoCentral>
    
      <ImagemContainer ref={menuRef}>
        <ImagemPerfil 
          src={usuario?.imageUrl ? `${import.meta.env.VITE_API_URL}/uploads/${usuario.imageUrl}` : ''} 
          alt={usuario?.name}
          onClick={toggleMenu}
        />
        
        {menuAberto && (
          <DropdownMenu>
            <MenuHeader>
              <MenuUserInfo>
                        <img 
                            src={usuario?.imageUrl ? `${import.meta.env.VITE_API_URL}/uploads/${usuario.imageUrl}` :''} 
                            alt=''
                          />
                          
                <MenuUserName>{usuario?.name}</MenuUserName>
              </MenuUserInfo>
            </MenuHeader>
            
            <MenuDivider />
            <MenuItem onClick={handleLogout}>
             <span>Sair</span>  <LogoutCircle01Icon/>
            </MenuItem>
          </DropdownMenu>
        )}
      </ImagemContainer>
    </Styles>
  );
}

const Styles = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 40px;
  background-color: #fbf4f4;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 70px;
  heigth:60px;
`;

const TextoCentral = styled.div`
  display: flex;
  gap: 15px;
`;

const ButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 110px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  color: #666666;
  background-color: #fbf4f4;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #f24d0d;
    background-color: #f5eaea;
  }
`;

const ButtonDashbord = styled(ButtonBase)``;

const ButtonProduct = styled(ButtonBase)``;

const ImagemContainer = styled.div`

  display: flex;
  align-items: center;
  position: relative;
`;

const ImagemPerfil = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 55px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  z-index: 1001;
  overflow: hidden;
`;

const MenuHeader = styled.div`
  padding: 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const MenuUserInfo = styled.div`
  display: flex;
  align-items:center;
  img{
  width:40px;
  heigth:40px;
  border-radius:3px;
  }
`;

const MenuUserName = styled.span`
  margin-left:5px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const MenuDivider = styled.div`
  height: 1px;
  background: #e9ecef;
`;

const MenuItem = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px 12px 16px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  
  &:hover {
    background: #f8f9fa;
    color: #f24d0d;
  }
  
  
`;