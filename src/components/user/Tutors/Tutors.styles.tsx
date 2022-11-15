import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  main: {
    marginBottom: 50
  },
  swiperTop: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topicsList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 0
  },
  topicsItem: {
    alignItems: "center",
    width: "45%",
    marginBottom: 25,
  },
  topicImage: {
    width: "100%",
    height: 100,
    borderRadius: 15,
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
