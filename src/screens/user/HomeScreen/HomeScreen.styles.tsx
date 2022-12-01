import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 0,
    paddingBottom: 100,
    paddingHorizontal: 25,
  },
  viewAbsolute: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  buttonStart: {
    backgroundColor: palette["redPrimary"],
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 35,
    marginHorizontal: 35,
    marginVertical: 15,
  },
})

export const stylesNew = StyleSheet.create({
  swiperItemNew: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    backgroundColor: palette["ligth"],
    borderRadius: 30,
    overflow: "hidden",
  },
  swiperImageNew: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  swiperItemNewContent: {
    width: "100%",
    height: "70%",
    paddingBottom: 0,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-end",

  },
  swiperItemNext: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
    overflow: "hidden",
  },
  swiperVideoNext: {
    width: "100%",
    height: 150,
    borderRadius: 30,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
})
