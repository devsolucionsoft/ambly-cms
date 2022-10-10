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
    width: "30%",
    marginBottom: 30
  },
  topicImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8
  }
})
