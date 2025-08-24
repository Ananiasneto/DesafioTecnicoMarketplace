import styled from "styled-components";
import TopBar from "../component/TopBar";

export default function Home() {
  return (
    <Container>
      <TopBar/>
      
        <Preparating>
          <Title>
            <h2>Últimos 30 dias</h2>
            <p>confira as estátisticas da sua loja no último mês</p>
          </Title>
          <Estatistic>
            <Cards>
              <Card>
                <CardTitle>produtos vendidos</CardTitle>
                <CardValue>34</CardValue>
                <CardDescription>+15% em relação ao mês anterior</CardDescription>
              </Card>
              <Card>
                <CardTitle>produtos anunciados</CardTitle>
                <CardValue> 57</CardValue>
                <CardDescription>+10% em relação ao mês anterior</CardDescription>
              </Card>
              <Card>
                <CardTitle>usuarios totais</CardTitle>
                <CardValue>303</CardValue>
                <CardDescription>+15% em relação ao mês anterior</CardDescription>
              </Card>
            </Cards>
            <Grafic>
              <GraficTitle>Desempenho de Vendas</GraficTitle>
              <GraficPlaceholder>
                <p>Gráfico será implementado em breve</p>
                <span>📊</span>
              </GraficPlaceholder>
            </Grafic>
          </Estatistic>
        </Preparating>
    </Container>
  );
}

const Container = styled.div`
    background-color: #fbf4f4;
`;

const Preparating = styled.div`
  text-align: center;
  background-color: #fbf4f4;
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  p {
    color: #666;
    margin-top: 8px;
  }
`;

const Title = styled.div`
  margin-bottom: 40px;
  
  h2 {
    color: #333;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

const Estatistic = styled.div`
  display: flex;
  justify-content:space-around;
`;

const Cards = styled.div`
display:flex;
flex-direction: column;
gap:10px
`;

const Card = styled.div`
  background-color:white;
  width:150px;
  heigth:50px;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
  
`;

const CardTitle = styled.h3`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const CardValue = styled.div`
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const Grafic = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:700px;
  background-color:white;
  padding: 25px;
  border-radius: 12px;
`;

const GraficTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const GraficPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:400px;
  heigth:200px;
  color: #666;
  
  p {
    margin-bottom: 15px;
    font-size: 16px;
  }
  
  span {
    font-size: 48px;
  }
`;