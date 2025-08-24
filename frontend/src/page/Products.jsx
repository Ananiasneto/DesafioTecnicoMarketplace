import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TopBar from "../component/TopBar";
import Filter from "../component/Filter"; 

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função simplificada - só recebe os produtos filtrados
  const handleFilterApply = (filteredProducts) => {
    setProducts(filteredProducts);
  };

  // Função para carregar todos os produtos
  const loadAllProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/all`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/all`, {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setError("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container>
        <TopBar/>
        <h1>Carregando produtos...</h1>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <TopBar/>
        <h1>{error}</h1>
      </Container>
    );
  }

  return (
    <Container>
      <TopBar/>
      
      <Content>
        <Preparating>
          <Title>
            <h2>Seus produtos</h2>
            <p>Acesse e gerencie a lista de seus produtos à venda</p>
          </Title>

          <Estatistic>
            <Sidebar>
              <Filter 
                onFilterApply={handleFilterApply} 
                onClearFilters={loadAllProducts}
              />
            </Sidebar>
            
            <Grafic>
              <ProductsFlexContainer>
                {products.map(product => (
                 <ProductCard key={product.id}>
                     <CardHeader>
                        <CardBadge>{product.status}</CardBadge>
                        <CardBadge >{product.category?.name ||product.category}</CardBadge>
                    </CardHeader>
                    {product.imageUrl && (
                        <CardImg 
                        src={`${import.meta.env.VITE_API_URL}/uploads/${product.imageUrl}`} 
                        alt={product.title}
                        />
                    )}
                    <CardContent>
                        <div>
                            <CardTitle title={product.title}>{product.title}</CardTitle>
                            <CardValue>R$ {Number(product.price).toFixed(2)}</CardValue>
                        </div>
                    
                    {product.description && (
                    <CardDescription title={product.description}>
                        {product.description.length > 60 
                        ? `${product.description.substring(0, 60)}...` 
                        : product.description
                        }
                    </CardDescription>
                    )}
                </CardContent>
                </ProductCard>
                ))}
              </ProductsFlexContainer>
            </Grafic>
          </Estatistic>
        </Preparating>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  background-color: #fbf4f4;
`;

const Content = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Preparating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fbf4f4;
  border-radius: 15px;
  padding: 20px;

  p {
    color: #666;
    margin-top: 8px;
  }
`;

const Title = styled.div`
font-family: 'Poppins', sans-serif;
  margin-bottom: 40px;
  text-align: left;
  font-weight: 700;
  
  h2 {
  font-family: 'Poppins', sans-serif;
    color: #333;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

const Estatistic = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: auto;
  overflow: visible;
`;

const Grafic = styled.div`
  background: #fbf4f4;
  border-radius: 15px;
  min-height: 500px;
  max-height: auto;
  overflow-y: auto;
`;

const ProductsFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const ProductCard = styled.div`
  width: 300px;
  margin-top:5px;
  min-height: 250px;
  background: #f8f9fa;
  padding: 8px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  position:relative;

  
  &:hover {
    transform: translateY(-1px);
    border:1px solid #009cf0;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const CardContent = styled.div`
  display: flex;
  padding:0 10px 0 10px;
  flex-direction: column;
  justify-content: space-between;
  div{
  display: flex;
  align-items:center;
  justify-content:space-between;
  
  }
`;

const CardTitle = styled.h3`
font-family: 'Poppins', sans-serif;
    width:150px;
    text-align: left;
    padding-left:10px;
    color: #333;
    font-size: 14px;
    font-weight: 700;
    text-overflow: ellipsis;
    cursor: pointer;
`;

const CardValue = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

const CardDescription = styled.p`
font-family: 'Poppins', sans-serif;
  color: #666;
  font-size: 12px;
  font-weight: 500;
  heigth:50px;
  margin: 0;
  text-overflow: ellipsis;
  cursor: pointer;
   line-height: 1.4;
  height: 34px;

  &:hover {
    color: #333;
  }
`;
const CardHeader = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  z-index: 10;
`;

const CardBadge = styled.span`
  padding: 4px 8px;
  background: #009cf0;
  color: white;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;
