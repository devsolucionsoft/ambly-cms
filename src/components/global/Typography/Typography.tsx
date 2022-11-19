import React from "react"
import { Text, TextProps } from "react-native"
// Component
import { styles } from "./Typography.styles"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"

type variantTypes = "headingLg" | "heading" | "heading2" | "heading3" | "h1" | "h2" | "h3" | "h4" |"h5" |"h6" | "p" | "p2" | "p3" | "p4" | "p10" | "p11" | "p12" | "p13" | "p14" | "p15" | "p16" | "p17" | "p18" |  "p19" |  "p20"

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
        alignItems: "center",
        textDecorationLine: textDecorationLine,
      }}
    >
      {children}
    </Text>
  )
}

export default Typography
