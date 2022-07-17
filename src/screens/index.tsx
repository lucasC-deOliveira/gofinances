import React from "react";
import { Text, View } from "react-native";
import { Icon, Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName } from "./styles"

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

        </UserWrapper>
        <Icon name="power" />
      </Header>
    </Container>
  )
}
