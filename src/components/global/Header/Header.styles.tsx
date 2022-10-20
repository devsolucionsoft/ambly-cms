import { StyleSheet } from "react-native"
// Theme
import { palette } from "../../../utils/theme"
import { StatusBar } from "react-native"


export const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: (StatusBar.currentHeight ?? 0) + 10,
    paddingHorizontal: 30,
    position: "relative",
    zIndex: 10,
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
  iconMenu: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingRight: 3,
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
