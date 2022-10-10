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

const StartScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Login">) => {
  const dispatch = useAppDispatch()

  const { action } = route.params
  const login = action === "login"

  const [check, seCheck] = useState(false)
  const [modalDataComplete, setModalDataComplete] = useState(false)
  const [modalForgotPassword, setModalForgotPassword] = useState(false)

  const handleCheck = () => seCheck(!check)

  const handleLogin = () => {
    setTimeout(() => {
      dispatch(createSession({}))
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
        <Input placeholder="E - Mail" icon="Mail" />
        <Input placeholder="Contraseña" icon="Password" />

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
          text="Continuar"
          color="redPrimary"
          colorText="ligth"
          style={{ marginTop: 60 }}
          onPress={() => (login ? handleLogin() : setModalDataComplete(true))}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default StartScreen
