import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { BorderlessButton } from "react-native-gesture-handler";
import { HighLightCard } from "../../components/HilightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { ActivityIndicator } from "react-native";
import { LoadContainer } from "./styles";
import { useTheme } from "styled-components";

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
import { useAuth } from "../../hooks/Auth";


export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}


interface HighlightData {
  entries: HighLightProps,
  expensive: HighLightProps,
  total: HighLightProps
}

function getLastTransactionDate(
  collection: DataListProps[],
  type: 'positive' | 'negative'
) {

  const lastTransaction = new Date(Math.max.apply(Math,
    collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime())
  ))
  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([])

  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const [isLoading, setIsLoading] = useState(true)

  const { signOut, user } = useAuth()

  const theme = useTheme()

  async function loadTransactions() {

    let entriesSumTotal = 0;

    let expensiveTotal = 0;

    const dataKey = '@gofinance:transactions'

    const response = await AsyncStorage.getItem(dataKey)

    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted:
      DataListProps[] = transactions.map((item: DataListProps) => {

        if (item.type === "positive") {
          entriesSumTotal += Number(item.amount)
        }
        else {
          expensiveTotal += Number(item.amount)
        }

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

    setTransactions(transactionsFormatted)

    const lastTransactionsEntries = getLastTransactionDate(transactions, "positive")

    const lastTransactionsExpensive = getLastTransactionDate(transactions, "negative")

    const totalInterval = `01  a ${lastTransactionsExpensive}`

    const total = entriesSumTotal - expensiveTotal

    setHighlightData({
      entries: {
        amount: entriesSumTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: lastTransactionsEntries
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: lastTransactionsExpensive
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      {
        isLoading ? <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: user?.photo }} />
                  <User>
                    <UserGreeting>Ola,</UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>
                <BorderlessButton>
                  <LogoutButton onPress={signOut}>
                    <Icon name="power" />
                  </LogoutButton>
                </BorderlessButton>

              </UserWrapper>

            </Header>
            <HighLightCards>
              <HighLightCard
                title="Entradas"
                amount={highlightData?.entries?.amount}
                lastTransaction={highlightData.entries.lastTransaction}
                type="up"
              />
              <HighLightCard
                title="Saidas"
                amount={highlightData?.expensive?.amount}
                lastTransaction={highlightData.expensive.lastTransaction}
                type="down"
              />
              <HighLightCard
                title="Total"
                amount={highlightData?.total?.amount}
                lastTransaction={highlightData.total.lastTransaction}
                type="total"
              />
            </HighLightCards >


            <Transactions>
              <Title>
                Listagem
              </Title>

              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </Transactions>
          </>}
    </Container >
  )
}
