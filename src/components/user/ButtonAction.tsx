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
    position: "absolute",
    bottom: 0,
    backgroundColor: palette["redPrimary"],
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "80%",
    borderRadius: 35,
    marginHorizontal: "10%",
    marginVertical: 15,
  },
})

interface ButtonActionProps {
  text: string
}

export type ButtonActionAttributes = ButtonActionProps & TouchableOpacityProps

const ButtonAction = (props: ButtonActionAttributes) => {
  const { style, text } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <TouchableOpacity {...props} style={{ ...parseStyle, ...styles.buttonStart }}>
      <Typography variant="heading3" textAlign="center" color="ligth" style={{fontWeight: "bold"}}>
        {text}
      </Typography>
    </TouchableOpacity>
  )
}

export default ButtonAction
