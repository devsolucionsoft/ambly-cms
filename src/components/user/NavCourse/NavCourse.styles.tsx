import { StyleSheet } from "react-native"
// Theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  main: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    backgroundColor: palette["black"],
    alignItems: "center", 
    justifyContent: "space-evenly",
    paddingVertical: 20
  },
  itemNav: {
    backgroundColor: "#ff343751",
    height: 45,
    width: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center"
  }
})
