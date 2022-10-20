import { useState } from "react"
import {
  View,
  Image,
} from "react-native"
// Styles compomponent
import { styles } from "./CheckIn.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Input } from "../../../components/global"
import { Layout, ButtonAction } from "../../../components/user"
import { palette } from "../../../utils/theme"
import { Feather } from "@expo/vector-icons"

const ChooseCoursesScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "CheckIn">) => {
  const [courses, setCourses] = useState([
    { text: "Cuerso 1", active: false },
    { text: "Cuerso 2", active: false },
  ])

  return (
    <Layout
      spaceTop
      headerProps={{ returnAction: true, icon: true, variant: "information" }}
    >
      <View style={styles.content}>
        <Typography variant="heading3" textAlign="center" color="ligth">
          Resumen de compra
        </Typography>

        <View style={styles.listCourses}>
          {courses.map((item, index) => (
            <View style={styles.itemCourses}>
              <Image
                style={styles.itemCoursesImage}
                source={require("../../../../assets/images/start-login.png")}
              />
              <View>
                <Typography
                  variant="p2"
                  textAlign="left"
                  color="ligth"
                  style={{ fontWeight: "bold" }}
                >
                  Curso 1
                </Typography>
                <Typography variant="p2" textAlign="left" color="ligth">
                  Profesor
                </Typography>
              </View>
            </View>
          ))}
        </View>

        <Typography variant="p2" textAlign="center" color="ligth">
          <Feather
            name="check"
            size={18}
            color={palette["ligth"]}
            style={{ fontWeight: "900" }}
          />{" "}
          2x1: Compra 1 escoge 2
        </Typography>

        <Typography
          variant="heading"
          textAlign="center"
          color="ligth"
          style={{ marginVertical: 30 }}
        >
          Total: $45.000
        </Typography>

        <Typography
          variant="heading3"
          textAlign="center"
          color="ligth"
          style={{ marginBottom: 20 }}
        >
          Datos de pago
        </Typography>

        <Typography variant="p2" textAlign="left" color="ligth">
          Datos personales
        </Typography>

        <View style={styles.form}>
          <Input placeholder="Nombre" variant="variant2" />
          <Input placeholder="Apellido" variant="variant2" />
          <Input placeholder="Cedula" variant="variant2" />
          <Input placeholder="E - mail" variant="variant2" />
        </View>
      <ButtonAction
        text="PAGAR AHORA"
        onPress={() => navigation.goBack()}
        />
      </View>

    </Layout>
  )
}

export default ChooseCoursesScreen
