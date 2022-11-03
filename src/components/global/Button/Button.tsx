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
import { MaterialIcons } from "@expo/vector-icons"
// Styles
import { styles, stylesText } from "./Button.styles"
import { AntDesign } from "@expo/vector-icons"

type variantTypes = "lg" | "md" | "sm"

interface ButtonProps {
  variant: variantTypes
  text: string
  color: paletteTypes
  colorText: paletteTypes
  loading?: boolean
  iconRed?: "google" | "facebook-square" | "apple1"
  iconLeft?: boolean
  iconRight?: boolean
}

type ButtonAttributes = ButtonProps & TouchableOpacityProps

const Button = (props: ButtonAttributes) => {
  const {
    style,
    variant,
    text,
    color,
    colorText,
    loading = false,
    onPress,
    iconRed,
    iconLeft,
    iconRight
  } = props
  const [loadingActive, setLoadingActive] = useState(false)

  const parseStyle = typeof style === "object" ? style : {}

  useEffect(() => {
    if (loadingActive && !loading) {
      setTimeout(() => {
        setLoadingActive(loading)
      }, 500)
    } else {
      setLoadingActive(loading)
    }
  }, [loading])

  return (
    <View>
      <TouchableOpacity
        {...props}
        onPress={!loadingActive ? onPress : () => false}
        style={{
          ...styles[variant],
          ...parseStyle,
          backgroundColor: palette[color],
          ...(iconRed || iconLeft || iconRight
            ? {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }
            : {}),
        }}
      >
        {iconLeft && (
          <MaterialIcons name="skip-previous" size={24} color="white" />
        )}
        {iconRed && (
          <AntDesign
            name={iconRed}
            size={24}
            color={palette[colorText]}
            style={{ marginRight: 10, marginBottom: "1%" }}
          />
        )}
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
        {iconRight && (
          <MaterialIcons name="skip-next" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Button
