import React from "react";
import { HighLightCard } from "../../components/HilightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { Icon, Transactions, Title, Container, HighLightCards, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, TransactionList } from "./styles"


export interface DataListProps extends TransactionCardProps{
  id:string;
}


export function Dashboard() {
  const data:DataListProps[] = [{
    id: '1',
    type: "positive",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign"
    },
    date: "17/07/2022"

  },
  {
    id: '2',
    type: "negative",
    title: "Hamburger Pizzy",
    amount: "R$ 59,00",
    category: {
      name: "Alimentação",
      icon: "coffee"
    },
    date: "15/07/2022"

  },
  {
    id: '3',
    type: "negative",
    title: "Aluguel do apartamento",
    amount: "R$ 1.200,00",
    category: {
      name: "Casa",
      icon: "shopping-bag"
    },
    date: "11/07/2022"

  }]

  return (
    <Container>
      <Header>

        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/lucasC-deOliveira.png" }} />
            <User>
              <UserGreeting>Ola,</UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>

      </Header>
      <HighLightCards>
        <HighLightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 17 de julho de 2022"
          type="up"
        />
        <HighLightCard
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 17 de julho de 2022"
          type="down"
        />
        <HighLightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 17 de julho de 2022"
          type="total"
        />
      </HighLightCards >
      <Transactions>
        <Title>
          Listagem
        </Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container >
  )
}
