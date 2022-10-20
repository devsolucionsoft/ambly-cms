import { View } from "react-native"
import { palette, paletteTypes } from "../../utils/theme"

interface DividerProps {
  width: string | number
  boder: number
  color: paletteTypes
  align?: "center" | "left" | "right" 
  marginTop?: number
  marginBottom?: number
}

const Divider = (props: DividerProps) => {
  const { width, boder, color, marginTop, marginBottom, align } = props

  const alignItems = align === "left" || align === "right" ? (align === "left" ? "flex-start" : "flex-end") : "center"


  return (
    <View style={{alignItems: alignItems }}>
      <View
        style={{ width, height: boder, backgroundColor: palette[color], marginTop, marginBottom }}
      />
    </View>
  )
}

export default Divider
