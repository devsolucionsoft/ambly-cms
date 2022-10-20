import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette["ligth"],
  },
  viewAbsolute: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 0
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  image: {
    width: "100%",
    height: 400,
  },
  contentPrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 20
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
