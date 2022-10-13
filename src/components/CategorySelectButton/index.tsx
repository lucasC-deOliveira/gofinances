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
  testId: string;
}

export function CategorySelectButton({ title, onPress, testId}: Props) {
  return (
    <RectButton testID={testId}>
      <Container onPress={onPress}>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Container>
    </RectButton>
  )
}