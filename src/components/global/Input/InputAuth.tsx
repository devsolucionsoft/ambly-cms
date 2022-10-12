import React from "react"
import { View, TextInput, TextInputProps } from "react-native"
// Theme
import { palette, iconsTypes } from "../../../utils/theme"
// Styles
import { styles } from "./InputAuth.styles"
// Components
import { Icon } from ".."

interface InputAuthProps {
  icon?: iconsTypes
  variant?: "variant2"
}

type InputAuthAttributes = InputAuthProps & TextInputProps

const InputAuth = (props: InputAuthAttributes) => {
  const { style, icon, variant } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={variant == "variant2" ? styles.container2 : styles.container}>
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
  )
}

export default InputAuth
