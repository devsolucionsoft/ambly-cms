import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  main: {},
  topicsList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 30
  },
  topicsItem: {
    alignItems: "center",
    width: "48%",
    marginBottom: 30,
  },
  topicImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    shadowColor: "white",
    elevation: 24,
  }
})
