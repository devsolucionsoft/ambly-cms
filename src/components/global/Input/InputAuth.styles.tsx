import { StyleSheet } from "react-native"
// App theme
import { palette, paletteTypes } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette["grayText"],
  },
  input: {
    fontSize: 18,
    color: palette["grayText"],
    width: "100%",
    marginLeft: 20,
  },
})
