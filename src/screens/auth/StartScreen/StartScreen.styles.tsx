import { StyleSheet } from "react-native"
// Theme
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  content: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 40,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    backgroundColor: palette["dark"],
  },
  buttonsContain: {
    marginTop: 20,
  },
  swiper: {
    flex: 1,
  },
  swiperItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swiperContent: {
    width: "100%",
    marginTop: -40,
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 45,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: palette["dark"],
  },
  swiperPagination: {
    position: "absolute",
    bottom: 5,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  swiperPaginationItem: {
    height: 18,
    width: 18,
    borderRadius: 9,
    marginHorizontal: 5,
  },
})
