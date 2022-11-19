import { useState } from "react"

import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Platform,
} from "react-native"
// Styles
import { styles } from "./LoginScreen.styles"
import { LinearGradient } from "expo-linear-gradient"
import { paletteGradient } from "../../../utils/theme"
// Types
import {
  StackNavigationProps,
  AuthStackParamList,
} from "../../../navigation/types"
// Components
import {
  Header,
  Button,
  Typography,
  Input,
  ModalForgotPassword,
} from "../../../components/global"
import { LoyoutAuth } from "../../../components/auth"
// Store
import { useAppDispatch } from "../../../store"
import { createSession } from "../../../store/Auth/actions"
import { openAlert, openAlertType } from "../../../store/Alert/actions"
// Hooks
import useValidateForm, {
  InputValidationI,
  IErrorInputs,
} from "../../../hooks/useValidateForm"
// Api
import { AuthApi } from "../../../api"

const StartScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Login">) => {
  const AuthApiModel = new AuthApi()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const [modalForgotPassword, setModalForgotPassword] = useState(false)

  const defaultInputs = {
    email: "",
    password: "",
  }
  // States inputs
  const [stateInputs, setStateInputs] = useState(defaultInputs)
  // Use Hook Validation
  const defaultValidation: InputValidationI = {
    email: { required: "email" },
    password: { required: "number" },
  }
  const { validationInputs, getValidation } = useValidateForm({
    defaultInputs,
    defaultValidation,
  })
  const [errorInputs, setErrorInputs] = useState<IErrorInputs>(validationInputs)
  // Inputs keyup
  const handleKeyUp = (value: string | boolean, name: string): void => {
    setStateInputs({
      ...stateInputs,
      [name]: value,
    })
    setErrorInputs(validationInputs)
  }

  const handleLogin = async () => {
    const { errors, validation } = getValidation(stateInputs)

    if (validation) {
      setLoading(true)
      const response = await AuthApiModel.UserLogin(stateInputs)

      switch (response.status) {
        case 200:
          dispatch(
            createSession({
              email: stateInputs.email,
              token: response.data.token,
            })
          )
          break
        case 403:
          dispatch(
            openAlert({
              title: `Este email está asociado a una cuenta de ${response.data?.message}`,
              text: `Inicia sesión con ${response.data?.message}`,
              icon: "error",
            })
          )
          break
        default:
          dispatch(
            openAlert({
              title: "No pudimos iniciar sesíon",
              text: "Revisa tu email o tu contraseña",
              icon: "error",
            })
          )
          break
      }
      setLoading(false)
    } else {
      setErrorInputs({
        ...errorInputs,
        ...errors,
      })
    }
  }

  const forgotPasswordResponse = (response: openAlertType) => {
    setTimeout(() => {
      dispatch(openAlert(response))
    }, 400)
  }

  return (
    <LoyoutAuth>
      <Image
        source={require("../../../../assets/images/registry.png")}
        style={styles.image}
      />
      <LinearGradient
        colors={paletteGradient["gradientOpacity3"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.4 }}
        style={styles.gradient}
      />
      <Header returnAction title="Inicia sesión" />
      <View
        style={{
          height: "100%",
          justifyContent: "space-between",
          paddingBottom: 100,
        }}
      >
        <View></View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <ModalForgotPassword
            ForgotPasswordResponse={forgotPasswordResponse}
            modalVisible={modalForgotPassword}
            setModalVisible={() => setModalForgotPassword(false)}
          />
          <View style={{ marginBottom: 80 }}>
            <View style={{ marginBottom: "10%" }}>
              <Input
                placeholder="E - Mail"
                label="E - Mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={stateInputs.email}
                error={errorInputs.email.error}
                message={errorInputs.email.message}
                onChange={(event) =>
                  handleKeyUp(event.nativeEvent.text, "email")
                }
              />
              <Input
                placeholder="Contraseña"
                label="Contraseña"
                secureTextEntry
                value={stateInputs.password}
                error={errorInputs.password.error}
                message={errorInputs.password.message}
                onChange={(event) =>
                  handleKeyUp(event.nativeEvent.text, "password")
                }
              />

              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => setModalForgotPassword(true)}
              >
                <Typography
                  variant="p2"
                  color="ligth"
                  textAlign="center"
                  textDecorationLine="underline"
                >
                  ¿Olvidaste tu contraseña?
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button
          variant="sm"
          text="Continuar"
          color="redPrimary"
          colorText="ligth"
          style={{
            position: "absolute",
            bottom: Platform.OS === "ios" ? 50 : 20,
            width: "80%",
            marginLeft: "10%",
          }}
          loading={loading}
          onPress={() => handleLogin()}
        />
      </View>
    </LoyoutAuth>
  )
}

export default StartScreen
