import React from "react";
import { Text, View } from "react-native";
import { HighLightCard } from "../../components/HilightCard";
import { Icon, Container, HighLightCards, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName } from "./styles"

export function Dashboard() {
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
    </Container>
  )
}
