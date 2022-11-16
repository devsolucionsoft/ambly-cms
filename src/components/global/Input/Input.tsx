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
  label?: string
  error?: boolean
  message?: string
}

type InputAttributes = InputProps & TextInputProps

const Input = (props: InputAttributes) => {
  const { style, icon, variant, error, message, label } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={{ marginBottom: 10 }}>
      {label && (
        <Typography variant="p3" color="ligth" textAlign="left" style={{marginBottom: 3}}>
          {label}
        </Typography>
      )}
      <View
        style={{
          ...(variant == "variant2" ? styles.container2 : styles.container),
          borderColor: error ? palette["redPrimary"] : palette["grayText"],
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
