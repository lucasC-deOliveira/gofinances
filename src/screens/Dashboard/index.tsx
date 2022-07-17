import React from "react";
import { Text, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighLightCard } from "../../components/HilightCard";
import { TransactionCard } from "../TransactionCard";
import { Icon, Transactions, Title, Container, HighLightCards, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, TransactionList } from "./styles"

export function Dashboard() {
  const data = [{
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign"
    },
    date: "17/07/2022"

  },
  {
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign"
    },
    date: "17/07/2022"

  },
  {
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign"
    },
    date: "17/07/2022"

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
        renderItem={({ item }) => <TransactionCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBotton:getBottomSpace()
        }}
        
        />
      </Transactions>
    </Container >
  )
}
