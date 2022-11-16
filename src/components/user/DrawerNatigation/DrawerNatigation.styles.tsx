import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme";

export const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#151515"
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#1E1E1E"
  }
})
