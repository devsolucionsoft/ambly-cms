import React, { useEffect, useState } from "react"
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  ActivityIndicator,
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
  loading?: boolean
}

type ButtonAttributes = ButtonProps & TouchableOpacityProps

const Button = (props: ButtonAttributes) => {
  const { style, variant, text, color, colorText, loading = false, onPress } = props
  const [loadingActive, setLoadingActive] = useState(false)

  const parseStyle = typeof style === "object" ? style : {}

  useEffect(() => {
    if (loadingActive && !loading) {
      setTimeout(() => {
        setLoadingActive(loading)
      }, 500);
    } else {
      setLoadingActive(loading)
    }
  },[loading])

  return (
    <View>
      <TouchableOpacity
        {...props}
        onPress={!loadingActive ? onPress : () => false}
        style={{
          ...styles[variant],
          ...parseStyle,
          backgroundColor: palette[color],
        }}
      >
        {loadingActive ? (
          <ActivityIndicator size="large" color={palette[colorText]} />
        ) : (
          <Text
            style={{
              ...stylesText[variant],
              color: palette[colorText],
              fontFamily: "poppins",
            }}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Button
