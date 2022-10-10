import React from "react"
import {
  Modal,
  ViewProps,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native"
// Styles
import { styles } from "./ModalDataComplete.styles"
// COmponents
import { Header, Input, Button } from "../../global"

interface ModalDataCompleteProps {
  modalVisible: boolean
  setModalVisible: Function
}

type ModalDataCompleteAttributes = ModalDataCompleteProps & ViewProps

const ModalDataComplete = (props: ModalDataCompleteAttributes) => {
  const { modalVisible, setModalVisible } = props

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.modalView}
        source={require("../../../../assets/images/background-screen.png")}
      >
        <Header
          title="Completa tus datos"
          action={() => setModalVisible(false)}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={styles.modalContent}>
            <Input placeholder="Nombre" />
            <Input placeholder="Telefono" />
            <Input placeholder="País" />
            <Input placeholder="Ciudad" />
            <Input placeholder="Genero" />

            <Button
              variant="md"
              text="Continuar"
              color="redPrimary"
              colorText="ligth"
              style={{ marginTop: 40, marginBottom: 80 }}
            />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </Modal>
  )
}

export default ModalDataComplete
