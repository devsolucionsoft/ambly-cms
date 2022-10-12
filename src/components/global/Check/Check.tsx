import React from "react"
import { TouchableOpacity, ViewProps } from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
import { Feather } from "@expo/vector-icons"
// Styles
import { styles } from "./Check.styles"

interface CheckProps {
  size: number
  color: paletteTypes
  colorIcon: paletteTypes
  check: boolean
  onChange: Function
}

type CheckAttributes = CheckProps & ViewProps

const Check = (props: CheckAttributes) => {
  const { style, size, color, colorIcon, check, onChange } = props
  const parseStyle = typeof style === "object" ? style : {}

  return (
    <TouchableOpacity
      onPress={() => onChange()}
      style={{
        ...parseStyle,
        ...styles.main,
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: palette[color],
      }}
    >
      {check && (
        <Feather
          name="check"
          size={size * 0.8}
          color={palette[colorIcon]}
          style={{ fontWeight: "900" }}
        />
      )}
    </TouchableOpacity>
  )
}

export default Check
