import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { BorderlessButton } from "react-native-gesture-handler";
import { HighLightCard } from "../../components/HilightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
  Icon,
  Transactions,
  Title,
  Container,
  HighLightCards,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  TransactionList,
  LogoutButton

} from "./styles"


export interface DataListProps extends TransactionCardProps {
  id: string;
}


export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransactions() {

    const dataKey = '@gofinance:transactions'

    const response = await AsyncStorage.getItem(dataKey)

    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted:
      DataListProps[] = transactions.map((item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: 'currency',
          currency: "BRL"
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit"
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      })

    setData(transactionsFormatted)

  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

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
          <BorderlessButton>
            <LogoutButton onPress={() => { }}>
              <Icon name="power" />
            </LogoutButton>
          </BorderlessButton>

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
