import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  main: {
    marginBottom: 30
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
    paddingHorizontal: 5,
    marginVertical: 30,
    marginTop: 0
  },
  topicsItem: {
    alignItems: "center",
    width: "50%",
    marginBottom: 28,
  },
  topicImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
