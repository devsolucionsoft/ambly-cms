import { StyleSheet } from "react-native"
// App theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: palette["grayText"],
    position: "absolute",
    height: 45,
    width: "100%",
    top: 30
  },
  item: {
    height: 40,
    color: palette["grayText"]
  }
})
