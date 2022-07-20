import React from 'react'
import { RectButton } from 'react-native-gesture-handler';

import {
  Container,
  Category,
  Icon
} from "./styles"

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: Props) {
  return (
    <RectButton>
      <Container onPress={onPress}>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Container>
    </RectButton>
  )
}