import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette["ligth"],
  },
  content: {
    paddingBottom: 150,
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    height: 400,
    justifyContent: "flex-end"
  },
  imageContent: {
    height: "30%",
    paddingHorizontal: 30
  },
  video: {
    marginTop: 20,
    width: "100%",
    height: 200,
    borderRadius: 20
  },
  caracteristics: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30
  },
  caracteristicsItem: {
    backgroundColor: palette["graySecondary"],
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "48.5%", 
    justifyContent: "center",
    marginBottom: 10
  },
  cirriculum: {

  },
  moduleList: {
    marginTop: 20
  }
})
