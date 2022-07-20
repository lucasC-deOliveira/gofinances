import React, { useEffect, useState } from 'react'
import { CategorySelectButton } from '../../components/CategorySelectButton'
import { Button } from '../../components/Forms/Button'
import { Input } from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/TransactionTypeButton'
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'
import { CategorySelect } from '../CategorySelect'
import { InputForm } from '../../components/Forms/InputForm'
import { useForm } from 'react-hook-form'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from '@react-native-async-storage/async-storage'

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required("Nome é obrigatorio"),
  amount: Yup
    .number()
    .typeError("Informe um valor numérico")
})

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: "category",
    name: "categoria",
  })

  const dataKey = '@gofinance:transactions'

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {

    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação')

    if (category.key === "category")
      return Alert.alert('Selecione a categoria')

    const newTransaction = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        newTransaction 
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
    }
    catch (e) {
      console.log(e)
      Alert.alert("Não foi possível salvar")
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey)
      console.log(data)
    }

    loadData()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder='Nome'
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message}
            />
            <InputForm
              name="amount"
              placeholder='Preço'
              control={control}
              keyboardType="numeric"
              error={errors.amount?.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                title='Income'
                type='up'
                onPress={() => handleTransactionsTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                title='Outcome'
                type='down'
                onPress={() => handleTransactionsTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />

          </Fields>
          <Button
            title='Enviar'
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
}