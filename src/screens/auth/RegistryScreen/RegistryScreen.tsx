import { useState } from "react"
import { SafeAreaView, Image, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { paletteGradient } from "../../../utils/theme"

// Styles
import { styles } from "./RegistryScreen.styles"
// Types
import {
  StackNavigationProps,
  AuthStackParamList,
} from "../../../navigation/types"
// Components
import {
  Header,
  Button,
  CheckLabel,
  Input,
} from "../../../components/global"
import { LoyoutAuth } from "../../../components/auth"
// Store
import { useAppDispatch } from "../../../store"
import { openAlert, openAlertType } from "../../../store/Alert/actions"
// Hooks
import useValidateForm, {
  InputValidationI,
  IErrorInputs,
} from "../../../hooks/useValidateForm"
// Api
import { AuthApi } from "../../../api"

const RegistryScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Registry">) => {
  const AuthApiModel = new AuthApi()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)

  const defaultInputs = {
    email: "",
    password: "",
    check: false,
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

  // Registry login
  const handleRegistry = async () => {
    const { errors, validation } = getValidation(stateInputs)
    if (validation) {
      const response = await AuthApiModel.UserRegister(stateInputs)

      switch (response.status) {
        case 201:
          setStateInputs({ ...defaultInputs, check: true })
          dispatch(
            openAlert({
              title: "Registro exitoso",
              text: "Ya puedes iniciar session en nuestra app",
              icon: "check",
              actionText: "Ir Login",
              action: () => navigation.navigate("Login"),
            })
          )
          break
        default:
          dispatch(
            openAlert({
              title: "Ha ocurrido un error",
              text: "Intentalo mas tarde",
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

  const forgotPasswordResponse = (response: openAlertType) => {
    setTimeout(() => {
      dispatch(openAlert(response))
    }, 400)
  }

  return (
    <LoyoutAuth>
      <Image
        source={require("../../../../assets/images/registry.jpg")}
        style={styles.image}
      />
      <LinearGradient
        colors={paletteGradient["gradientOpacity3"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.4 }}
        style={styles.gradient}
      />
      <Header returnAction title="Crea una cuenta" />
      <SafeAreaView style={styles.content}>
        <View style={{marginBottom: "15%"}}>
          <Input
            placeholder="Nombre"
            label="Nombre"
            autoCapitalize="none"
            value={stateInputs.email}
            error={errorInputs.email.error}
            message={errorInputs.email.message}
            onChange={(event) => handleKeyUp(event.nativeEvent.text, "email")}
          />
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
            onChange={(event) =>
              handleKeyUp(event.nativeEvent.text, "password")
            }
          />

          <CheckLabel
            size={25}
            color="ligth"
            colorIcon="black"
            label="Al continuar acepto terminos y condiciones"
            check={stateInputs.check}
            error={errorInputs.check.error}
            message={errorInputs.check.message}
            onChange={() => handleKeyUp(!stateInputs.check, "check")}
            actionLabel={() => navigation.navigate("Terms")}
          />
        </View>

        <Button
          variant="lg"
          text="Continuar"
          color="redPrimary"
          colorText="ligth"
          style={{ marginTop: 60 }}
          loading={loading}
          onPress={() => handleRegistry()}
        />
      </SafeAreaView>
    </LoyoutAuth>
  )
}

export default RegistryScreen
