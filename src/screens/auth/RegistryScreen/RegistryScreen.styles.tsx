import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: palette["black"],
  },
  content: {
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "45%",
    top: 0
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "45%",
    top: 0
  }
})
