import React, { useState } from "react"
import {
  Modal,
  ViewProps,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native"
// Styles
import { styles } from "./ModalDataComplete.styles"
// Hooks
import useValidateForm, {
  InputValidationI,
  IErrorInputs,
} from "../../../hooks/useValidateForm"
// Components
import { Header, Input, Button } from "../../global"
// Api
import { AuthApi } from "../../../api"
// Store
import { useAppDispatch } from "../../../store"
import { openAlert } from "../../../store/Alert/actions"

interface ModalDataCompleteProps {
  modalVisible: boolean
  setModalVisible: Function
  data: {
    email: string
    password: string
  }
}

type ModalDataCompleteAttributes = ModalDataCompleteProps & ViewProps

const ModalDataComplete = (props: ModalDataCompleteAttributes) => {
  const AuthApiModel = new AuthApi()
  const dispatch = useAppDispatch()

  const { modalVisible, setModalVisible, data } = props

  const [loading, setLoading] = useState(false)

  const defaultInputs = {
    username: "",
    phone: "",
    country: "",
    city: "",
    gender: "",
  }
  // States inputs
  const [stateInputs, setStateInputs] = useState(defaultInputs)
  // Use Hook Validation
  const defaultValidation: Array<InputValidationI> = [
    { required: "text", email: true },
    { required: "number", minLengt: 6 },
    { required: "text" },
    { required: "text" },
    { required: "text" },
  ]
  const { validationInputs, getValidation } = useValidateForm({
    defaultInputs,
    defaultValidation,
  })
  const [errorInputs, setErrorInputs] = useState<IErrorInputs>(validationInputs)
  // Inputs keyup
  const handleKeyUp = (value: string, name: string): void => {
    setStateInputs({
      ...stateInputs,
      [name]: value,
    })
    setErrorInputs(validationInputs)
  }

  const handleRegistry = async () => {
    const { errors, validation } = getValidation(stateInputs)

    if (validation) {
      setLoading(true)
      const response: any = await AuthApiModel.UserRegister({
        ...data,
        ...stateInputs,
      })

      switch (response.status) {
        case 201:
          dispatch(
            openAlert({
              title: "Registro exitoso",
              text: "Ya puedes iniciar session en nuestra app",
              icon: "check",
            })
          )
          break
        default:
          break
      }
      setLoading(false)
    } else {
      setErrorInputs({
        ...errorInputs,
        ...errors,
      })
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
            <Input
              placeholder="Nombre"
              value={stateInputs.username}
              error={errorInputs.username.error}
              message={errorInputs.username.message}
              onChange={(event) =>
                handleKeyUp(event.nativeEvent.text, "username")
              }
            />
            <Input
              placeholder="Telefono"
              value={stateInputs.phone}
              error={errorInputs.phone.error}
              message={errorInputs.phone.message}
              onChange={(event) => handleKeyUp(event.nativeEvent.text, "phone")}
            />
            <Input
              placeholder="País"
              value={stateInputs.country}
              error={errorInputs.country.error}
              message={errorInputs.country.message}
              onChange={(event) =>
                handleKeyUp(event.nativeEvent.text, "country")
              }
            />
            <Input
              placeholder="Ciudad"
              value={stateInputs.city}
              error={errorInputs.city.error}
              message={errorInputs.city.message}
              onChange={(event) => handleKeyUp(event.nativeEvent.text, "city")}
            />
            <Input
              placeholder="Genero"
              value={stateInputs.gender}
              error={errorInputs.gender.error}
              message={errorInputs.gender.message}
              onChange={(event) =>
                handleKeyUp(event.nativeEvent.text, "gender")
              }
            />

            <Button
              variant="md"
              text="Continuar"
              color="redPrimary"
              colorText="ligth"
              loading={loading}
              style={{ marginTop: 40, marginBottom: 80 }}
              onPress={handleRegistry}
            />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </Modal>
  )
}

export default ModalDataComplete
