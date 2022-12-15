import { StyleSheet } from "react-native"
// Theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  imageHeader: {
    width: "100%",
    height: 200
  },
  content: {
    paddingHorizontal: 25,
    marginTop: 30,
    marginBottom: 20
  },
  image: {
    width: "100%",
    height: 330,
    justifyContent: "flex-end"
  },
  imtemSlider: {

  },
  imageContent: {
    height: "60%",
    paddingHorizontal: 30,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  beagle: {
    backgroundColor: palette["grayText"],
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10
  }
})
