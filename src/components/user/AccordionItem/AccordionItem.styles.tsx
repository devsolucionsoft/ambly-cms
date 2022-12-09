import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  main: {
    backgroundColor: palette["black"],
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  videos: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: palette["ligth"],
    padding: 6,
    borderRadius: 15,
  },
  image: {
    width: 60,
    height: 50,
    marginRight: 20,
    borderRadius: 10,
  },
})
