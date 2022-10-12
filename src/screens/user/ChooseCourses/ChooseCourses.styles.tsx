import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  listCourses: {
    marginVertical: 50,
    paddingVertical: 20,
    backgroundColor: palette["ligth"],
    borderRadius: 25,
    borderWidth: 3,
    borderColor: palette["redPrimary"],
  },
  itemCourses: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemCoursesActive: {},
  buttonStart: {
    backgroundColor: palette["redPrimary"],
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 35,
    marginHorizontal: 35,
    marginVertical: 15,
  },
})
