import React from "react"
import { View, TextInput, TextInputProps } from "react-native"
// Theme
import { palette, iconsTypes } from "../../../utils/theme"
// Styles
import { styles } from "./Input.styles"
// Components
import { Icon, Typography } from ".."

interface InputProps {
  icon?: iconsTypes
  variant?: "variant2"
  error?: boolean
  message?: string
}

type InputAttributes = InputProps & TextInputProps

const Input = (props: InputAttributes) => {
  const { style, icon, variant, error, message } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          ...(variant == "variant2" ? styles.container2 : styles.container),
          borderBottomColor: error
            ? palette["redPrimary"]
            : palette["grayText"],
        }}
      >
        {icon && <Icon color="ligth" size={25} icon={icon} />}

        <TextInput
          {...props}
          style={{
            ...parseStyle,
            ...styles.input,
          }}
          placeholderTextColor={palette["grayText"]}
        />
      </View>
      {error && (
        <Typography variant="p3" color="redPrimary" textAlign="left">
          {message}
        </Typography>
      )}
    </View>
  )
}

export default Input
