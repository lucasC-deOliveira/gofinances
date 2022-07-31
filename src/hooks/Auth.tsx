import { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session"
import { Alert } from "react-native";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  
async function signInWithGoogle() {
  try {
    const CLIENT_ID = '1035917762447-5qbg7gq9eqed831bsot1iaot773mlh6u.apps.googleusercontent.com';
    const REDIRECT_URI = "https://auth.expo.io/@lussckass/gofinances";
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

    const { type, params } = await AuthSession.startAsync({ authUrl: authURL }) as AuthorizationResponse
    if (type === "success") {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

      const userInfo = await response.json()
      console.log(userInfo)
      setUser({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.given_name,
        photo: userInfo.picture
      })
    }
  } catch (error) {
    console.log(error)
    Alert.alert("Não foi possivel conectar a conta Google")
  }
}
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}


function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }