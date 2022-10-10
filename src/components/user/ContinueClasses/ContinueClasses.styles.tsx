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
    height: 170,
  },
  swiperItem: {
    flex: 1, 
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    overflow: "hidden",
    backgroundColor: palette["yellowSecondary"],
    padding: 18,
    borderRadius: 30
  },
  itemTop: {
    flexDirection: "row",
    alignItems: "center"
  },
  swiperImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 20
  }
})
