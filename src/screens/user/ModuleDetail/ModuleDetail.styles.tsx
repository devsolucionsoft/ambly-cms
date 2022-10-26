import { StyleSheet } from "react-native"
import { palette } from "../../../utils/theme"

export const styles = StyleSheet.create({
  content: {
    paddingVertical: 30,
    paddingBottom: 150,
    paddingHorizontal: 25
  },
  beagle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#ff34377b",
  },
  moduleList: {},
  video: {
    width: "100%",
    height: 250,
    marginTop: 0
  },
  downloadable: {
    backgroundColor: palette["graySecondary"],
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between"
  },
  downloadableIcon: {
    backgroundColor: palette["graySecondary"],
    padding: 10,
    borderRadius: 20,
  },
  downloadableContent: {
    marginLeft: 15,
  },
  downloadableDown: {
    backgroundColor: palette["redPrimary"],
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  }
})