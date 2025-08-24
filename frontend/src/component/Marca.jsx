import styled from "styled-components";
export default function Marca() {

  return (
    <Styles>
        <Container>
            <img src=".././logo.jfif" alt="" />
            <Texto>
                <h1>marketplace</h1>
                <h2>painel de vendedor</h2>
            </Texto>

        </Container>
        <img src=".././cover.jpg" alt="" />
    </Styles>
  );
}
const Styles = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 20px;

    img{
        margin-left: 30px;
        width: 90px;
        height: 75px;
        border-radius: 50%;
    }
`;
const Texto = styled.div`
    h1{
        font-size: 30px;
        margin: 0;
    }
    h2{
        font-size: 15px;
        margin: 0;
    }
`;
