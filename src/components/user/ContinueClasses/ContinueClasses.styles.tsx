import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginVertical: 0
  },
  mainTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  swiper: {
    height: 165,
  },
  swiperItem: {
    flex: 1, 
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette["black"],
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,

  },
  swiperContent: {
    width: "70%",
    paddingLeft: 15
  },
  swiperImage: {
    width: "30%",
    borderRadius: 15,
    height: "95%",
    overflow: "hidden"
  },
  swiperTop: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    
  }
})
