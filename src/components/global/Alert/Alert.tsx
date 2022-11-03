import React from "react"
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
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
// Styles
import { styles } from "./Alert.styles"
// Components
import { Input, Button, Typography } from ".."
// Store
import { useAppDispatch } from "../../../store"
import { closeAlert } from "../../../store/Alert/actions"

interface AlertPasswordProps {
  modalVisible: boolean
  title?: string
  text?: string
  icon?: "check" | "error"
  actionText?: string
  action?: any
}

type AlertPasswordAttributes = AlertPasswordProps & ViewProps

const AlertPassword = (props: AlertPasswordAttributes) => {
  const { modalVisible, title, text, icon, actionText, action } = props
  const dispatch = useAppDispatch()

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay} />
      <View style={styles.modalView}>
        <LinearGradient
          colors={paletteGradient["gradientGray"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalContent}
        >
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => dispatch(closeAlert())}
          >
            <AntDesign name="close" color={palette["ligth"]} size={25} />
          </TouchableOpacity>
          <SafeAreaView style={{ alignItems: "center" }}>
            {icon === "check" && (
              <AntDesign
                name="checkcircleo"
                size={60}
                color="green"
                style={{ marginBottom: 30 }}
              />
            )}
            {icon === "error" && (
              <AntDesign
                name="exclamationcircleo"
                size={60}
                color="red"
                style={{ marginBottom: 30 }}
              />
            )}
            <Typography
              variant="heading3"
              color="ligth"
              textAlign="center"
              style={{ marginBottom: 15 }}
            >
              {title}
            </Typography>
            <Typography
              variant="p2"
              color="ligth"
              textAlign="center"
              style={{ marginBottom: 0 }}
            >
              {text}
            </Typography>

            {actionText && (
              <Button
                color="redPrimary"
                colorText="ligth"
                text={actionText}
                variant="md"
                style={{ marginTop: 20 }}
                onPress={() => {
                  dispatch(closeAlert())
                  action()
                }}
              />
            )}
          </SafeAreaView>
        </LinearGradient>
      </View>
    </Modal>
  )
}

export default AlertPassword
