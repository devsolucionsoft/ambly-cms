import React from "react"
import { View, ViewProps } from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
// Styles
import { styles } from "./Template.styles"
// Components
import { Typography } from "../../global";

interface TemplateProps {}

type TemplateAttributes = TemplateProps & ViewProps

const Template = (props: TemplateAttributes) => {
  const { style } = props

  const parseStyle = typeof style === "object" ? style : {}

  return <View style={styles.main}></View>
}

export default Template
