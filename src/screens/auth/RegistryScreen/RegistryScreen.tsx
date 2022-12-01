import { useState, useEffect } from "react"
import {
  Image,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"
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
import { Header, Button, Input, Typography } from "../../../components/global"
import { LoyoutAuth } from "../../../components/auth"
// Store
import { useAppDispatch } from "../../../store"
import { openAlert } from "../../../store/Alert/actions"
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
    username: "",
    email: "",
    password: "",
  }

  // States inputs
  const [stateInputs, setStateInputs] = useState(defaultInputs)
  // Use Hook Validation
  const defaultValidation: InputValidationI = {
    username: { required: "text" },
    email: { required: "email" },
    password: { required: "text", minLengt: 6 }
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

  useEffect(() => {
    //handleKeyUp(route.params?.check ?? false, "check")
  }, [route.params])

  // Registry login
  const handleRegistry = async () => {
    console.log("validation", stateInputs);
    const { errors, validation } = getValidation(stateInputs)
    
    if (validation) {
      setLoading(true)
      const response = await AuthApiModel.UserRegister(stateInputs)

      switch (response.status) {
        case 201:
          setStateInputs({ ...defaultInputs })
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
              title: "El usuario ya está registrado",
              text: "Ingresa otro email",
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
      <Header returnAction title="Crea una cuenta" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <View style={{ marginBottom: 80 }}>
              <View style={{ marginBottom: "10%" }}>
                <Input
                  placeholder="Nombre"
                  label="Nombre"
                  autoCapitalize="none"
                  value={stateInputs.username}
                  error={errorInputs.username.error}
                  message={errorInputs.username.message}
                  onChange={(event) =>
                    handleKeyUp(event.nativeEvent.text, "username")
                  }
                />
                <Input
                  placeholder="E - Mail"
                  label="E - Mail"
                  autoCapitalize="none"
                  keyboardType="email-address"
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
                <Typography
                  variant="p15"
                  color="ligth"
                  textAlign="center"
                  style={{ marginLeft: 0, marginTop: 20 }}
                >
                  Al continuar acepto{" "}
                  <Typography
                    variant="p15"
                    color="ligth"
                    textAlign="left"
                    textDecorationLine="underline"
                    style={{ marginLeft: 20 }}
                  >
                    terminos y condiciones
                  </Typography>{" "}
                  y{" "}
                  <Typography
                    variant="p15"
                    color="ligth"
                    textAlign="left"
                    textDecorationLine="underline"
                    style={{ marginLeft: 20 }}
                  >
                    politicas de privacidad
                  </Typography>
                </Typography>
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
            onPress={() => handleRegistry()}
          />
        </View>
      </TouchableWithoutFeedback>
    </LoyoutAuth>
  )
}

export default RegistryScreen
