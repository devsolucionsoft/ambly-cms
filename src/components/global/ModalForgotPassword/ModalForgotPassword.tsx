import React, { useState } from "react"
import {
  Modal,
  ViewProps,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
// Theme
import { palette, paletteGradient } from "../../../utils/theme"
import AntDesign from "@expo/vector-icons/AntDesign"
// Styles
import { styles } from "./ModalForgotPassword.styles"
// COmponents
import { Input, Button, Typography } from "../"
// Api
import { AuthApi } from "../../../api"

interface ModalForgotPasswordProps {
  modalVisible: boolean
  setModalVisible: Function
  ForgotPasswordResponse: Function
}

type ModalForgotPasswordAttributes = ModalForgotPasswordProps & ViewProps

const ModalForgotPassword = (props: ModalForgotPasswordAttributes) => {
  const { modalVisible, setModalVisible, ForgotPasswordResponse } = props
  const [email, setEmail] = useState("")

  const handleForgotPassword = async () => {
    const AuthApiModel = new AuthApi()
    const response = await AuthApiModel.ForgotPassword(email)

    switch (response.status) {
      case 201:
        setModalVisible(false)
        ForgotPasswordResponse({
          title: "Registro exitoso",
          text: "Ya puedes iniciar session en nuestra app",
          icon: "check",
        })
        break
      default:
        setModalVisible(false)
        ForgotPasswordResponse({
          title: "Algo ha salido mal",
          text: "Intentalo mas tarde",
          icon: "error",
        })
        break
    }
  }

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay} />
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => setModalVisible(false)}
        >
          <AntDesign name="close" color={palette["ligth"]} size={30} />
        </TouchableOpacity>
        <LinearGradient
          colors={paletteGradient["gradientGray"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalContent}
        >
          <SafeAreaView>
            <Typography
              variant="heading3"
              color="ligth"
              textAlign="center"
              style={{ marginBottom: 40 }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>

            <Input
              placeholder="Ingresa tu E - Mail"
              value={email}
              onChange={(event) => setEmail(event.nativeEvent.text)}
            />

            <Button
              variant="md"
              text="Continuar"
              color="redPrimary"
              colorText="ligth"
              style={{ marginTop: 20 }}
              onPress={handleForgotPassword}
            />
          </SafeAreaView>
        </LinearGradient>
      </View>
    </Modal>
  )
}

export default ModalForgotPassword
