import React, { useState } from "react"
import { View, ViewProps } from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
// Styles
import { styles } from "./Select.styles"
// Components
import { Typography } from ".."
// Picker
import { Picker } from "@react-native-picker/picker"

interface SelectProps {
  items: Array<{ label: string | number; value: string | number }>
  label?: string
  onChange?: any
  value?: string
  error?: boolean
  message?: string
}

type SelectAttributes = SelectProps & ViewProps

const Select = (props: SelectAttributes) => {
  const { label, onChange, error, message, value } = props

  const [selectedLanguage, setSelectedLanguage] = useState()

  //const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={{ position: "relative", marginBottom: 10 }}>
      <View
        style={{
          ...styles.main,
          borderColor: error ? palette["redPrimary"] : palette["grayText"],
        }}
      />
      {label && (
        <Typography
          variant="p3"
          color="grayText"
          textAlign="left"
          style={{ marginBottom: 0 }}
        >
          {label}
        </Typography>
      )}
      <Picker
        prompt={label}
        style={{ marginLeft: 15 }}
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
        <Picker.Item style={styles.item} label="Elije una opción" value="" />
        <Picker.Item style={styles.item} label="Java" value="java" />
        <Picker.Item style={styles.item} label="JavaScript" value="js" />
      </Picker>
      {error && (
        <Typography
          variant="p4"
          color="redPrimary"
          textAlign="left"
          style={{ marginTop: 5 }}
        >
          {message}
        </Typography>
      )}
    </View>
  )
}

export default Select
