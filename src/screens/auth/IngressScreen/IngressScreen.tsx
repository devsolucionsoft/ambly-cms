import { useState, useEffect } from "react"
import { View, TouchableOpacity, ImageBackground } from "react-native"
// Styles compomponent
import { styles } from "./SIngress.styles"
// Types
import {
  StackNavigationProps,
  AuthStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Button, Header } from "../../../components/global"
import { ModalDataComplete, LoyoutAuth } from "../../../components/auth"
import * as Google from "expo-auth-session/providers/google"
import * as Facebook from "expo-auth-session/providers/facebook"
import * as WebBrowser from "expo-web-browser"
// API
import { AuthApi } from "../../../api"
// Store
import { useAppDispatch } from "../../../store"
import { createSession } from "../../../store/Auth/actions"
import axios from "axios"

WebBrowser.maybeCompleteAuthSession()

const GoogleOuth = ({
  setStateInputs,
  setModalDataComplete,
  setTypeDataComplete
}: {
  setStateInputs: Function
  setModalDataComplete: Function
  setTypeDataComplete: Function
}) => {
  const AuthApiModel = new AuthApi()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  // Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "743164640778-el5jhbgmhp91h4gj1eimeme1akk3bb2g.apps.googleusercontent.com",
  })

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      fetchUserInfo(authentication?.accessToken)
    }
  }, [response])

  const fetchUserInfo = async (token?: string) => {
    const responseInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    const response = await AuthApiModel.UserLoginGoogle(responseInfo.data.email)
    
    switch (response.status) {
      case 204:
        setStateInputs({
          email: responseInfo.data.email,
          password: "0000000",
        })
        setModalDataComplete(true)
        break
      case 200:
        dispatch(
          createSession({
            email: responseInfo.data.email,
            token: response.data.token,
          })
        )
        break
      default:
        break
    }
    setLoading(false)
  }

  return (
    <Button
      color="blueRed"
      colorText="ligth"
      variant="md"
      iconRed="google"
      text="Continue with Google"
      loading={loading}
      onPress={() => {
        setTypeDataComplete("google")
        setLoading(true)
        promptAsync()
      }}
    />
  )
}

const FacebookOuth = ({
  setStateInputs,
  setModalDataComplete,
  setTypeDataComplete
}: {
  setStateInputs: Function
  setModalDataComplete: Function
  setTypeDataComplete: Function
}) => {
  const AuthApiModel = new AuthApi()
  const dispatch = useAppDispatch()

  // faebook
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "408971244606095",
  })

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      console.log(authentication)

      //fetchUserInfo(authentication?.accessToken)
    }
  }, [response])

  const fetchUserInfo = async (token?: string) => {
    const responseInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    const response = await AuthApiModel.UserLoginGoogle(responseInfo.data.email)

    switch (response.status) {
      case 204:
        setStateInputs({
          email: responseInfo.data.email,
        })
        setModalDataComplete(true)
        break
      case 200:
        dispatch(
          createSession({
            email: responseInfo.data.email,
            token: response.data.token,
          })
        )
        break
      default:
        break
    }
  }

  return (
    <Button
      color="blueRed"
      colorText="ligth"
      variant="md"
      text="Continue with Facebook"
      iconRed="facebook-square"
      onPress={() => {
        promptAsync()
      }}
    />
  )
}

const AppleOuth = ({
  setStateInputs,
  setModalDataComplete,
  setTypeDataComplete
}: {
  setStateInputs: Function
  setModalDataComplete: Function
  setTypeDataComplete: Function
}) => {
  const AuthApiModel = new AuthApi()
  const dispatch = useAppDispatch()

  // faebook
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "408971244606095",
  })

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      console.log(authentication)

      //fetchUserInfo(authentication?.accessToken)
    }
  }, [response])

  const fetchUserInfo = async (token?: string) => {
    const responseInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    const response = await AuthApiModel.UserLoginGoogle(responseInfo.data.email)

    switch (response.status) {
      case 204:
        setStateInputs({
          email: responseInfo.data.email,
          password: "0000000",
        })
        setModalDataComplete(true)
        break
      case 200:
        dispatch(
          createSession({
            email: responseInfo.data.email,
            token: response.data.token,
          })
        )
        break
      default:
        break
    }
  }

  return (
    <Button
      color="ligth"
      colorText="black"
      variant="md"
      text="Continue with Apple"
      iconRed="apple1"
      onPress={() => {
        promptAsync()
      }}
    />
  )
}

const IngressScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Ingress">) => {
  const [modalDataComplete, setModalDataComplete] = useState(false)
  const [typeDataComplete, setTypeDataComplete] = useState<any>("")
  const [stateInputs, setStateInputs] = useState({
    email: "",
    password: "",
  })



  return (
    <LoyoutAuth>
      <Header icon returnAction />

      <View style={styles.content}>
        <ModalDataComplete
          modalVisible={modalDataComplete}
          setModalVisible={(value: boolean) => setModalDataComplete(value)}
          data={stateInputs}
          typeLogin={typeDataComplete}
          action={() =>
            navigation.navigate("Login", {
              action: "login",
            })
          }
        />
        <Typography variant="heading2" textAlign="center" color="ligth">
          Crea una cuenta
        </Typography>
        <Typography variant="heading2" textAlign="center" color="ligth">
          {" "}
          para continuar
        </Typography>

        <View style={{ ...styles.containButtons, marginTop: 50 }}>
          <FacebookOuth
            setModalDataComplete={setModalDataComplete}
            setStateInputs={setStateInputs}
            setTypeDataComplete={setTypeDataComplete}
          />
          <AppleOuth
            setModalDataComplete={setModalDataComplete}
            setStateInputs={setStateInputs}
            setTypeDataComplete={setTypeDataComplete}
          />
          <GoogleOuth
            setModalDataComplete={setModalDataComplete}
            setStateInputs={setStateInputs}
            setTypeDataComplete={setTypeDataComplete}
          />
        </View>

        <Typography variant="heading2" textAlign="center" color="ligth">
          o
        </Typography>
        <View style={styles.containButtons}>
          <Button
            color="redPrimary"
            colorText="ligth"
            variant="md"
            text="Crear un correo electrónico"
            onPress={() =>
              navigation.navigate("Login", {
                action: "registry",
              })
            }
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Login", {
              action: "login",
            })
          }
        >
          <Typography
            variant="p"
            textAlign="center"
            color="ligth"
            textDecorationLine="underline"
          >
            Accede a tu cuenta
          </Typography>
        </TouchableOpacity>
      </View>
    </LoyoutAuth>
  )
}

export default IngressScreen
