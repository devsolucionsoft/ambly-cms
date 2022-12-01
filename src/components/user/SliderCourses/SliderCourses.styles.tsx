import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"
import { StatusBar } from "react-native"

export const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginBottom: 40,
    position: "relative"
  },
  swiper: {
    flex: 1,
  },
  swiperTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  swiperItemPopular: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    marginBottom: 10
  },
  swiperImagePopular: {
    flex: 1,
    height: 200,
    justifyContent: "center",
  },
  swiperSvgPopular: {
    width: "60%",
    maxHeight: 100
  },
  swiperItemPopularContent: {
    width: "100%",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 30,
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  swiperItemNew: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: palette["ligth"],
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 25
  },
  swiperImageNew: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  swiperItemNewContent: {
    width: "100%",
    height: "60%",
    paddingBottom: 25,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
  },
  swiperItemNext: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
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
  swiperItemNextContent: {
    width: "85%",
    paddingBottom: 30,
  },
  swiperPagination: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  swiperPaginationItem: {
    height: 8,
    marginHorizontal: 2,
    borderRadius: 5
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

