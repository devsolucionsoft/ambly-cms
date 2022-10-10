import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  modalOverlay: {
    top: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.5,
    backgroundColor: "black"
  },
  modalView: {
    top: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalContent: {
    paddingHorizontal: 30,
    paddingTop: 40,
    width: "90%",
    padding: 30,
    borderRadius: 30
  },
  closeIcon: {
    position: "absolute",
    top: 30,
    right: 30
  }
})
