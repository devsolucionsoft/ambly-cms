import { StyleSheet } from "react-native"
// Theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  imageHeader: {
    width: "100%",
    height: 200
  },
  content: {
    paddingHorizontal: 25
  },
  imageUser: {
    height: 130,
    width: 130,
    marginTop: -65,
    marginBottom: 15,
    borderRadius: 20,
    borderColor: palette["graySecondary"],
    borderWidth: 4
  },
  imtemSlider: {
    backgroundColor: palette["black"],
    borderRadius: 10, 
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row", 
    alignItems: "center"
  }
})
