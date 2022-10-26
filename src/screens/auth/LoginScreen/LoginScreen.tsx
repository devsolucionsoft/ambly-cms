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
  Check,
  Input,
  ModalForgotPassword,
} from "../../../components/global"
import { ModalDataComplete } from "../../../components/auth"
// Store
import { useAppDispatch } from "../../../store"
import { createSession } from "../../../store/Auth/actions"
import { openAlert } from "../../../store/Alert/actions"
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
  const [modalDataComplete, setModalDataComplete] = useState(false)
  const [modalForgotPassword, setModalForgotPassword] = useState(false)

  const handleCheck = () => seCheck(!check)

  const defaultInputs = {
    email: "",
    password: "",
  }
  // States inputs
  const [stateInputs, setStateInputs] = useState(defaultInputs)
  // Use Hook Validation
  const defaultValidation: Array<InputValidationI> = [
    { required: "text", email: true },
    { required: "number", minLengt: 6 },
  ]
  const { validationInputs, getValidation } = useValidateForm({
    defaultInputs,
    defaultValidation,
  })
  const [errorInputs, setErrorInputs] = useState<IErrorInputs>(validationInputs)
  // Inputs keyup
  const handleKeyUp = (value: string, name: string): void => {
    setStateInputs({
      ...stateInputs,
      [name]: value,
    })
    setErrorInputs(validationInputs)
  }

  const handleLogin = async () => {
    const { errors, validation } = getValidation(stateInputs)
    
    if (validation) {
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
      />
      <Header
        returnAction
        title={login ? "Accede a tu cuenta" : "Crea una cuenta"}
      />
      <SafeAreaView style={styles.content}>
        <Input
          placeholder="E - Mail"
          icon="Mail"
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Check
              size={22}
              color="ligth"
              colorIcon="black"
              check={check}
              onChange={handleCheck}
            />
            <TouchableOpacity style={{ width: "70%", marginLeft: 20 }}>
              <Typography
                variant="p2"
                color="ligth"
                textAlign="left"
                textDecorationLine="underline"
              >
                Al continuar acepto terminos y condiciones
              </Typography>
            </TouchableOpacity>
          </View>
        )}

        <Button
          variant="lg"
          text={login ? "Iniciar" : "Continuar"}
          color="redPrimary"
          colorText="ligth"
          style={{ marginTop: 60 }}
          onPress={() => (login ? handleLogin() : handleRegistry())}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default StartScreen
