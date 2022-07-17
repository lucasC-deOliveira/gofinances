import React from "react";

import { 
  Container,
  Header,
  Title,
  Footer,
  Amount,
  LastTrasaction,
  Icon 

} from "./styles";


export function HighLightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>
      <Footer>
        <Amount>R$ 17.400,00</Amount>
        <LastTrasaction>Última entrada dia 17 de Julho de 2022</LastTrasaction>
      </Footer>
    </Container>
  )
}