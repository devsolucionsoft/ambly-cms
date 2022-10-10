import React from "react"
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
// Styles
import { styles, stylesText } from "./Button.styles"

type variantTypes = "lg" | "md" | "sm"

interface ButtonProps {
  variant: variantTypes
  text: string
  color: paletteTypes
  colorText: paletteTypes
}

type ButtonAttributes = ButtonProps & TouchableOpacityProps

const Button = (props: ButtonAttributes) => {
  const { style, variant, text, color, colorText } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View>
      <TouchableOpacity
        {...props}
        style={{
          ...styles[variant],
          ...parseStyle,
          backgroundColor: palette[color],
        }}
      >
        <Text style={{ ...stylesText[variant], color: palette[colorText] }}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button
