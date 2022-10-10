import React from "react"
import { Text, TextProps } from "react-native"
// Component
import { styles } from "./Typography.styles"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"

type variantTypes = "heading" | "heading2" | "heading3" | "p" | "p2" | "p3"

interface TypographyProps {
  variant: variantTypes
  textAlign: "center" | "right" | "left"
  color: paletteTypes
  textDecorationLine?: "underline"
}

type TypographyAttributes = TypographyProps & TextProps

const Typography = (props: TypographyAttributes) => {
  const { style, children, variant, textAlign, color, textDecorationLine } =
    props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <Text
      {...props}
      style={{
        ...styles[variant],
        ...parseStyle,
        textAlign,
        color: palette[color],
        textDecorationLine: textDecorationLine,
      }}
    >
      {children}
    </Text>
  )
}

export default Typography
