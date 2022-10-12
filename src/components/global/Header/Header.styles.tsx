import { StyleSheet } from "react-native"
// Theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  iconReturn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingRight: 3,
    backgroundColor: palette["graySecondary"],
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 100,
  },
  action: {
    width: 40,
  },
  user: {
    backgroundColor: palette["graySecondary"],
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  }
})
