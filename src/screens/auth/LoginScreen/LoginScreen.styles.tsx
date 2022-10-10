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
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
})
