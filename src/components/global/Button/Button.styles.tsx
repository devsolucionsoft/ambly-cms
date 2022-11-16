import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  lg: {
    width: "100%",
    paddingVertical: 15,
    paddingBottom: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginVertical: 10,
  },
  md: {
    width: "100%",
    paddingVertical: 13,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginVertical: 10,
  },
  sm: {
    width: "100%",
    paddingVertical: 10,
    paddingBottom: 7,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginVertical: 8,
  },
})

export const stylesText = StyleSheet.create({
  lg: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  md: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  sm: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
})
