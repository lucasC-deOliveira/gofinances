import React from "react";
import { TouchableOpacityProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Container, Title } from "./styles"

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, onPress }: Props) {
  return (
    <RectButton>
      <Container onPress={onPress}>
        <Title>
          {title}
        </Title>
      </Container>
    </RectButton>
  )
}