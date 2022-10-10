import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  buttonStart: {
    backgroundColor: palette["redPrimary"],
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 35,
    marginHorizontal: 35,
    marginVertical: 15
  }
})
