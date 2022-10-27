import { useState } from "react"
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
// Styles
import { styles } from "./LoginScreen.styles"
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
  CheckLabel,
  Input,
  ModalForgotPassword,
} from "../../../components/global"
import { ModalDataComplete } from "../../../components/auth"
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

  const { action } = route.params
  const login = action === "login"

  const [check, seCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalDataComplete, setModalDataComplete] = useState(false)
  const [modalForgotPassword, setModalForgotPassword] = useState(false)

  const defaultInputs = {
    email: "",
    password: "",
    check: login,
  }
  // States inputs
  const [stateInputs, setStateInputs] = useState(defaultInputs)
  // Use Hook Validation
  const defaultValidation: Array<InputValidationI> = [
    { required: "text", email: true },
    { required: "number", minLengt: 6 },
    { required: "boolean" },
  ]
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
        default:
          dispatch(
            openAlert({
              title: "Cuenta no encontrada",
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

  // Submit forms
  const handleRegistry = () => {
    const { errors, validation } = getValidation(stateInputs)
    if (validation) {
      setModalDataComplete(true)
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
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require("../../../../assets/images/background-screen.png")}
    >
      {/* Modals */}
      <ModalDataComplete
        modalVisible={modalDataComplete}
        setModalVisible={(value: boolean) => setModalDataComplete(value)}
        data={stateInputs}
      />
      <ModalForgotPassword
        modalVisible={modalForgotPassword}
        setModalVisible={(value: boolean) => setModalForgotPassword(value)}
        ForgotPasswordResponse={forgotPasswordResponse}
      />
      <Header
        returnAction
        title={login ? "Accede a tu cuenta" : "Crea una cuenta"}
      />
      <SafeAreaView style={styles.content}>
        <Input
          placeholder="E - Mail"
          icon="Mail"
          autoCapitalize="none"
          value={stateInputs.email}
          error={errorInputs.email.error}
          message={errorInputs.email.message}
          onChange={(event) => handleKeyUp(event.nativeEvent.text, "email")}
        />
        <Input
          placeholder="Contraseña"
          icon="Password"
          value={stateInputs.password}
          error={errorInputs.password.error}
          message={errorInputs.password.message}
          onChange={(event) => handleKeyUp(event.nativeEvent.text, "password")}
        />

        {login ? (
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
        ) : (
          <CheckLabel
            size={25}
            color="ligth"
            colorIcon="black"
            label="Al continuar acepto terminos y condiciones"
            check={stateInputs.check}
            error={errorInputs.check.error}
            message={errorInputs.check.message}
            onChange={() => handleKeyUp(!stateInputs.check, "check")}
          />
        )}

        <Button
          variant="lg"
          text={login ? "Iniciar" : "Continuar"}
          color="redPrimary"
          colorText="ligth"
          style={{ marginTop: 60 }}
          loading={loading}
          onPress={() => (login ? handleLogin() : handleRegistry())}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default StartScreen
