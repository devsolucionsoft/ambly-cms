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
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  itemCourses: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 20,
    backgroundColor: palette["redPrimary"],
    marginBottom: 10
  },
  itemCoursesImage:{
    width: 90,
    height: 70,
    marginRight: 25,
    borderRadius: 15,
  },
  form: {
    marginTop: 20
  }
})
