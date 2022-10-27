import React from "react"
import { View, TouchableOpacity, ViewProps } from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
import { Feather } from "@expo/vector-icons"
// Styles
import { styles } from "./CheckLabel.styles"
// Components
import {
  Header,
  Button,
  Typography,
  Input,
  ModalForgotPassword,
} from "../../../components/global"

interface CheckProps {
  size: number
  color: paletteTypes
  colorIcon: paletteTypes
  check: boolean
  onChange: Function
  label: string
  error: boolean
  message: string
}

type CheckAttributes = CheckProps & ViewProps

const CheckLabel = (props: CheckAttributes) => {
  const { style, size, color, colorIcon, check, onChange, label, error, message } = props
  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={{alignItems: "center"}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => onChange()}
          style={{
            ...parseStyle,
            ...styles.main,
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: palette[color],
          }}
        >
          {check && (
            <Feather
              name="check"
              size={size * 0.8}
              color={palette[colorIcon]}
              style={{ fontWeight: "900" }}
            />
          )}
        </TouchableOpacity>
        <Typography
          variant="p2"
          color="ligth"
          textAlign="left"
          style={{ marginLeft: 20 }}
        >
          {label}
        </Typography>
      </View>
      {error && (
        <Typography variant="p3" color="redPrimary" textAlign="left">
          {message}
        </Typography>
      )}
    </View>
  )
}

export default CheckLabel
