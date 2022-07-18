import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles"

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({ title , onPress}: Props) {
  return (
    <Container onPress={onPress}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}