import React from "react"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
// App theme
import { palette, paletteTypes } from "../../utils/theme"
// Styles component
import { StyleSheet } from "react-native"
// Components
import { Typography } from "../global"

export const styles = StyleSheet.create({
  buttonStart: {
    backgroundColor: palette["redPrimary"],
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 35,
    marginHorizontal: 35,
    marginVertical: 15,
  },
})

interface ButtonActionProps {
  text: string
}

type ButtonActionAttributes = ButtonActionProps & TouchableOpacityProps

const ButtonAction = (props: ButtonActionAttributes) => {
  const { style, text, onPress } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <TouchableOpacity {...props} style={{ ...parseStyle, ...styles.buttonStart }}>
      <Typography variant="heading2" textAlign="center" color="ligth">
        {text}
      </Typography>
    </TouchableOpacity>
  )
}

export default ButtonAction
