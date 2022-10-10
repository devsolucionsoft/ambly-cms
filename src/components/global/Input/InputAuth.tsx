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
}

type InputAuthAttributes = InputAuthProps & TextInputProps

const InputAuth = (props: InputAuthAttributes) => {
  const { style, icon } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={styles.container}>
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
