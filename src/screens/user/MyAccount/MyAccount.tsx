import { useState, useEffect } from "react"
import { View, ScrollView } from "react-native"
// Styles compomponent
import { styles } from "./MyAccount.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Input, Select, Button } from "../../../components/global"
import { Layout } from "../../../components/user"
// Hooks
import useValidateForm, {
  InputValidationI,
  IErrorInputs,
} from "../../../hooks/useValidateForm"

const MyAccount = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "MyAccount">) => {

  const defaultInputs = {
    username: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    gender: "",
  }
  // States inputs
  const [stateInputs, setStateInputs] = useState(defaultInputs)
  // Use Hook Validation
  const defaultValidation: InputValidationI = {
    username: { required: "text" },
    email: { required: "email"},
    phone: { required: "number", minLengt: 5 },
    country: { required: "text" },
    city: { required: "text" },
    gender:{ required: "text" },
  }

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

  useEffect(() => {
    setErrorInputs(validationInputs)
  }, [])

  const handleSend = async () => {
    const { errors, validation } = getValidation(stateInputs)

    if (validation) {
    } else {
      setErrorInputs({
        ...errorInputs,
        ...errors,
      })
    }
  }
  return (
    <Layout spaceTop headerProps={{ returnAction: true, title: "Perfil" }}>
      <ScrollView style={styles.content}>
        <Input
          placeholder="Nombre"
          label="Nombre"
          value={stateInputs.username}
          error={errorInputs.username.error}
          message={errorInputs.username.message}
          onChange={(event) => handleKeyUp(event.nativeEvent.text, "username")}
        />
        <Input
          placeholder="E - Mail"
          label="E - Mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={stateInputs.email}
          error={errorInputs.email.error}
          message={errorInputs.email.message}
          onChange={(event) => handleKeyUp(event.nativeEvent.text, "email")}
        />
        <Input
          placeholder="Teléfono"
          label="Teléfono"
          keyboardType="number-pad"
          value={stateInputs.phone}
          error={errorInputs.phone.error}
          message={errorInputs.phone.message}
          onChange={(event) => handleKeyUp(event.nativeEvent.text, "phone")}
        />
        <Select
          items={[]}
          label="País"
          value={stateInputs.country}
          error={errorInputs.country.error}
          message={errorInputs.country.message}
          onChange={(value: any) => handleKeyUp(value, "country")}
        />
        <Select
          items={[]}
          label="Ciudad"
          value={stateInputs.city}
          error={errorInputs.city.error}
          message={errorInputs.city.message}
          onChange={(value: any) => handleKeyUp(value, "city")}
        />
        <Select
          items={[]}
          label="Sexo"
          value={stateInputs.gender}
          error={errorInputs.gender.error}
          message={errorInputs.gender.message}
          onChange={(value: any) => handleKeyUp(value, "gender")}
        />

        <Button
          variant="md"
          text="Continuar"
          color="redPrimary"
          colorText="ligth"
          style={{ marginTop: 40, marginBottom: 80 }}
          onPress={handleSend}
        />
      </ScrollView>
    </Layout>
  )
}

export default MyAccount
