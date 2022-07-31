import React, { useState } from "react"

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from "./styles"

import AppleSvg from "../../assets/apple.svg"
import GoogleSvg from "../../assets/google.svg"
import LogoSvg from "../../assets/logo.svg"
import { RFValue } from "react-native-responsive-fontsize"
import { SignInSocialButton } from "../../components/SignInSocialButton"
import { useAuth } from "../../hooks/Auth"
import { ActivityIndicator, Alert } from "react-native"
import { useTheme } from "styled-components"



export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possivel conectar a conta Google")
    }
    finally {
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possivel conectar a conta Apple")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas a baixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          <SignInSocialButton
            title="Entrar com a apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />

        </FooterWrapper>

        {isLoading && <ActivityIndicator
          color={theme.colors.shape}
          style={{ marginTop: 18 }}
        />}
      </Footer>
    </Container>
  )
}