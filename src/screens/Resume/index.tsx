import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native"
import { HistoryCard } from "../../components/HistoryCard";
import { useAuth } from "../../hooks/Auth";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer
} from "./styles"

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface categoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {

  const [selectedDate, setSelectedDate] = useState(new Date())

  const [totalByCategories, setTotalByCategories] = useState<categoryData[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const { user} = useAuth()

  const theme = useTheme()

  function handleDateChange(action: "next" | "prev") {

    if (action === "next") {
      const newDate = addMonths(selectedDate, 1)

      setSelectedDate(newDate)

    }
    else {
      const newDate = subMonths(selectedDate, 1)

      setSelectedDate(newDate)
    }

  }

  async function loadData() {
    setIsLoading(true)
    const dataKey = `@gofinance:transactions${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive: TransactionData) =>
      expensive.type === 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    )

    const expensiveTotal = expensives.reduce((accumulator: number, expensive: TransactionData) => {
      return accumulator += Number(expensive.amount)
    }, 0)

    const totalByCategory: categoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      })
      if (categorySum > 0) {

        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        })

        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading ? <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
          <>
            <Content
              showHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: useBottomTabBarHeight()
              }}
            >

              <MonthSelect>
                <MonthSelectButton onPress={() => handleDateChange('prev')}>
                  <MonthSelectIcon name="chevron-left" />
                </MonthSelectButton>
                <Month>
                  {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
                </Month>
                <MonthSelectButton onPress={() => handleDateChange('next')}>
                  <MonthSelectIcon name="chevron-right" />
                </MonthSelectButton>
              </MonthSelect>

              <ChartContainer>
                <VictoryPie
                  colorScale={totalByCategories.map(category => category.color)}
                  data={totalByCategories}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: "bold",
                      fill: theme.colors.shape
                    }
                  }}
                  labelRadius={50}
                  x="percent"
                  y="total"
                />
              </ChartContainer>
              {totalByCategories.map(item => (
                <HistoryCard
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
                />)
              )}
            </Content>
          </>}
    </Container>
  )
}