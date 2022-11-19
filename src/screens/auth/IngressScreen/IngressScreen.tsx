import { useState, useEffect } from "react"
import { View, TouchableOpacity, Image } from "react-native"
// Styles compomponent
import { styles } from "./SIngress.styles"
// Types
import {
  StackNavigationProps,
  AuthStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Button, Header } from "../../../components/global"
import { LoyoutAuth } from "../../../components/auth"
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
  setTypeDataComplete,
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
    scopes: ["email"],
  })

  useEffect(() => {
    setLoading(false)
    if (response?.type === "success") {
      const { authentication } = response
      fetchUserInfo(authentication?.accessToken)
    }
  }, [response])

  const fetchUserInfo = async (token?: string) => {
    setLoading(true)
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

    let response = await AuthApiModel.UserLoginGoogle(responseInfo.data.email)

    if (response.status === 204) {
      response = await AuthApiModel.UserRegistryGoogle({
        email: responseInfo.data.email,
      })
    }

    if (response.status === 200 || response.status === 201) {
      dispatch(
        createSession({
          email: responseInfo.data.email,
          token: response.data.token,
        })
      )
    }
    setLoading(false)
  }

  return (
    <Button
      color="blueRed"
      colorText="ligth"
      variant="sm"
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
  setTypeDataComplete,
}: {
  setStateInputs: Function
  setModalDataComplete: Function
  setTypeDataComplete: Function
}) => {
  const AuthApiModel = new AuthApi()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  // facebook
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: "1324979871671286",
    redirectUri: "https://auth.expo.io/@solucionsoft/ambly-app",
  })

  useEffect(() => {
    setLoading(false)
    if (response?.type === "success") {
      const { access_token } = response.params
      fetchUserInfo(access_token)
    }
  }, [response])

  const fetchUserInfo = async (token?: string) => {
    setLoading(false)
    const responseInfo = await axios.get(
      `https://graph.facebook.com/me?fields=email&access_token=${token}`
    )

    let response = await AuthApiModel.UserLoginFacebook(responseInfo.data.email)

    if (response.status === 204) {
      response = await AuthApiModel.UserRegistryFacebook({
        email: responseInfo.data.email,
      })
    }

    if (response.status === 200 || response.status === 201) {
      dispatch(
        createSession({
          email: responseInfo.data.email,
          token: response.data.token,
        })
      )
    }
    setLoading(false)
  }

  return (
    <Button
      color="blueRed"
      colorText="ligth"
      variant="sm"
      loading={loading}
      text="Continue with Facebook"
      iconRed="facebook-square"
      onPress={() => {
        setTypeDataComplete("facebook")
        setLoading(true)
        promptAsync()
      }}
    />
  )
}

const AppleOuth = ({
  setStateInputs,
  setModalDataComplete,
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
    }
  }, [response])

  return (
    <Button
      color="ligth"
      colorText="black"
      variant="sm"
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
      <Header returnAction />

      <View style={styles.content}>
        <Image
          source={require("../../../../assets/images/icon-ambly.png")}
          resizeMode="contain"
          style={{ height: 100, width: 200, marginTop: 10 }}
        />

        <View style={{ ...styles.containButtons }}>
          <Typography
            variant="p2"
            textAlign="center"
            color="ligth"
            style={{ marginBottom: 25 }}
          >
            Inicia sesión para continuar
          </Typography>

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
          <Typography
            variant="p"
            textAlign="center"
            color="ligth"
            style={{ marginTop: 10 }}
          >
            o
          </Typography>
          <View style={styles.containButtons}>
            <Button
              color="redPrimary"
              colorText="ligth"
              variant="sm"
              text="Crear un correo electrónico"
              onPress={() =>
                navigation.navigate("Registry", {
                  check: false,
                })
              }
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{marginTop: 10}}>
            <Typography
              variant="p2"
              textAlign="center"
              color="ligth"
              textDecorationLine="underline"
            >
              Accede a tu cuenta
            </Typography>
          </TouchableOpacity>
        </View>

        <View></View>
      </View>
    </LoyoutAuth>
  )
}

export default IngressScreen
