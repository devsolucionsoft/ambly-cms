import { View } from "react-native"
import { palette, paletteTypes } from "../../utils/theme"

interface DividerProps {
  width: string | number
  boder: number
  color: paletteTypes
  marginTop?: number
  marginBottom?: number
}

const Divider = (props: DividerProps) => {
  const { width, boder, color, marginTop, marginBottom } = props
  return (
    <View
      style={{ width, height: boder, backgroundColor: palette[color], marginTop, marginBottom }}
    />
  )
}

export default Divider
