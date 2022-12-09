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

  const padding = iconRed === "facebook-square" ? "1%" : (iconRed === "google" ? "1%" : "2%") 
  

  return (
    <View>
      <TouchableOpacity
        {...props}
        onPress={!loadingActive ? onPress : () => false}
        style={{
          ...styles[variant],
          ...parseStyle,
          backgroundColor: palette[color],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: iconRed ? "flex-start" : "center",
          paddingLeft: iconRed ? 45 : 18
        }}
      >
        {iconLeft && (
          <MaterialIcons name="skip-previous" size={24} color="white"/>
        )}
        {iconRed && (
          <AntDesign
            name={iconRed}
            size={22}
            color={palette[colorText]}
            style={{ marginRight: 10 }}
          />
        )}
        {loadingActive ? (
          <ActivityIndicator size="small" color={palette[colorText]} />
        ) : (
          <Text
            style={{
              ...stylesText[variant],
              color: palette[colorText],
              fontFamily: "Inter"
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
