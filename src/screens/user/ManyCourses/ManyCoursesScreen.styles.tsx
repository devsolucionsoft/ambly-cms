import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 0,
    paddingBottom: 20,
    paddingHorizontal: 30
  },
  listCourses: {
    marginVertical: 50
  },
  itemCourses: {
    backgroundColor: palette["ligth"],
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginBottom: 25,
    borderRadius: 25,
    borderColor: palette["ligth"],
    borderWidth: 3,
  },
  itemCoursesActive: {
    borderColor: palette["redPrimary"],
  }
})
