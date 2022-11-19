import { StyleSheet, Platform } from "react-native"
// Theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 52 : 20,
    paddingHorizontal: 25,
    position: "relative",
    zIndex: 10,
  },
  iconReturn: {
    width: 38,
    height: 38,
    borderRadius: 20,
    paddingRight: 3,
    backgroundColor: "#ffffff3c",
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
