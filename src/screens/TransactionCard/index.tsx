import React from "react";


import {
  Container,
  Date,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName
} from "./styles"

export function TransactionCard() {
  return (
    <Container>
      <Title> Desenvolvimento de site</Title>
      <Amount> R$ 12.000,00</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />

          <CategoryName>
            Vendas
          </CategoryName>
        </Category>
        <Date> 17/07/22</Date>
      </Footer>
    </Container>
  )
}