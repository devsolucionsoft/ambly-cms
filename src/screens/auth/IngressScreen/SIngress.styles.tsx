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
    flex: 1,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "15%",
  },
  containButtons: {
    width: "100%",
    marginVertical: 10,
    marginBottom: 20
  },
})
