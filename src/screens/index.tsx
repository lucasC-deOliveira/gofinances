import React from "react";
import { Text, View } from "react-native";
import { HighLightCard } from "../components/HilightCard";
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
        <HighLightCard />
        <HighLightCard />
        <HighLightCard />
      </HighLightCards >
    </Container>
  )
}
