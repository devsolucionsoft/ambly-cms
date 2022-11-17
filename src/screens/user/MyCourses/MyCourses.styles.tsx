import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 0,
    paddingHorizontal: 30,
  },
  listCourses: {
    marginVertical: 30,
  },
  itemCourse: {
    height: 180,
    marginBottom: 25,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 24,
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
  beagle: {
    backgroundColor: "#1010109e",
    paddingHorizontal: 10,
    paddingTop: 3,
    borderRadius: 15,
    marginTop: 10,
  },
})
