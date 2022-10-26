import { StyleSheet } from "react-native"
// Theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette["dark"],
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  viewAbsolute: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
})