import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  main: {
    marginBottom: 40
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
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 0,
    paddingHorizontal: 1
  },
  topicsItem: {
    alignItems: "center",
    width: "45%",
    marginBottom: 25,
  },
  topicImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginBottom: 8,
    marginHorizontal: 20,
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
