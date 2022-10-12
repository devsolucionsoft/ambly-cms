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
  container2: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: palette["ligth"],
    borderRadius: 30
  },
  input: {
    fontSize: 18,
    color: palette["grayText"],
    width: "100%",
    marginLeft: 20,
  },
})
