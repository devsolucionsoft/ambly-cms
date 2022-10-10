import React from "react"
import {
  Modal,
  ViewProps,
  ImageBackground,
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

interface ModalForgotPasswordProps {
  modalVisible: boolean
  setModalVisible: Function
}

type ModalForgotPasswordAttributes = ModalForgotPasswordProps & ViewProps

const ModalForgotPassword = (props: ModalForgotPasswordAttributes) => {
  const { modalVisible, setModalVisible } = props

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        //resizeMode="cover"
        style={styles.modalOverlay}
        //source={require("../../../../assets/images/background-screen.png")}
      />
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
            <Input placeholder="Ingresa tu E - Mail" icon="Mail" />

            <Button
              variant="md"
              text="Continuar"
              color="redPrimary"
              colorText="ligth"
              style={{ marginTop: 20 }}
            />
          </SafeAreaView>
        </LinearGradient>
      </View>
    </Modal>
  )
}

export default ModalForgotPassword
