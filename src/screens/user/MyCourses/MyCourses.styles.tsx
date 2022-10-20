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
    marginVertical: 30,
  },
  itemCourse: {
    height: 150,
    marginBottom: 25,
    borderRadius: 20,
    overflow: "hidden",
  },
  itemCourseImage: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  itemCourseContent: {
    height: "101%",
    width: "101%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 20,
  },
})
