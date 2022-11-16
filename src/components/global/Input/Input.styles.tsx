import { StyleSheet } from "react-native"
// App theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 10
  },
  container2: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
