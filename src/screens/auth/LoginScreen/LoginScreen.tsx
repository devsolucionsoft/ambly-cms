import { useState } from "react"
import { SafeAreaView, TouchableOpacity } from "react-native"
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
      {/* Modals */}
      <ModalForgotPassword
        modalVisible={modalForgotPassword}
        setModalVisible={(value: boolean) => setModalForgotPassword(value)}
        ForgotPasswordResponse={forgotPasswordResponse}
      />
      <Header returnAction title="Accede a tu cuenta" />
      <SafeAreaView style={styles.content}>
        <Input
          placeholder="E - Mail"
          label="E - Mail"
          autoCapitalize="none"
          value={stateInputs.email}
          error={errorInputs.email.error}
          message={errorInputs.email.message}
          onChange={(event) => handleKeyUp(event.nativeEvent.text, "email")}
        />
        <Input
          placeholder="Contraseña"
          label="Contraseña"
          secureTextEntry
          value={stateInputs.password}
          error={errorInputs.password.error}
          message={errorInputs.password.message}
          onChange={(event) => handleKeyUp(event.nativeEvent.text, "password")}
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

        <Button
          variant="lg"
          text="Iniciar"
          color="redPrimary"
          colorText="ligth"
          style={{ marginTop: 60 }}
          loading={loading}
          onPress={() => handleLogin()}
        />
      </SafeAreaView>
    </LoyoutAuth>
  )
}

export default StartScreen
