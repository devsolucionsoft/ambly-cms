import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  lg: {
    width: "100%",
    paddingVertical: 16,
    paddingBottom: 12,
    paddingHorizontal: 25,
    borderRadius: 18,
    marginVertical: 12,
  },
  md: {
    width: "100%",
    paddingVertical: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 12,
  },
  sm: {
    width: "100%",
    paddingVertical: 13,
    paddingBottom: 7,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginVertical: 9,
  },
})

export const stylesText = StyleSheet.create({
  lg: {
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Inter"
  },
  md: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Inter"
  },
  sm: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Inter"
  },
})
