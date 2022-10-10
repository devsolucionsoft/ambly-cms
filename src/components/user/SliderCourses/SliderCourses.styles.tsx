import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  main: {
    height: 250,
    width: "100%",
    marginVertical: 30
  },
  swiper: {
    flex: 1,
  },
  swiperItemPopular: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: palette["ligth"],
    borderRadius: 30,
    overflow: "hidden"
  },
  swiperImagePopular: {
    flex: 1,
    justifyContent: "center",
  },
  swiperItemPopularContent: {
    width: "85%",
    paddingTop: 15,
    paddingBottom: 8
  },
  swiperItemNew: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: palette["ligth"],
    borderRadius: 30,
    overflow: "hidden",
  },
  swiperImageNew: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  swiperItemNewContent: {
    width: "85%",
    paddingBottom: 30
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
    justifyContent: "flex-end"
  },
  swiperItemNextContent: {
    width: "85%",
    paddingBottom: 30
  }
})
