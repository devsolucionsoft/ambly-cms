import { useState } from "react"
import { View } from "react-native"
// Styles compomponent
import { styles } from "./ChooseCourses.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Check } from "../../../components/global"
import { Layout, ButtonAction } from "../../../components/user"
import { palette } from "../../../utils/theme"
import { Feather } from "@expo/vector-icons"

const ChooseCoursesScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "ChooseCourses">) => {
  const [courses, setCourses] = useState([
    { text: "Cuerso 1", active: false },
    { text: "Cuerso 2", active: false },
    { text: "Cuerso 3", active: false },
    { text: "Cuerso 4", active: false },
    { text: "Cuerso 5", active: false },
    { text: "Cuerso 6", active: false },
  ])

  const handlePress = (value: number) => {
    setCourses(
      courses.map((item, index) =>
        value == index ? { ...item, active: !item.active } : item
      )
    )
  }

  return (
    <Layout
      spaceTop
      headerProps={{ returnAction: true, icon: true, variant: "information" }}
      buttonAction={{
        text: "Pagar ahora",
        onPress: () => navigation.navigate("CheckIn"),
      }}
    >
      <View style={styles.content}>
        <Typography
          variant="heading3"
          textAlign="center"
          color="ligth"
          style={{ marginBottom: 10 }}
        >
          Escoge tus cursos
        </Typography>
        <Typography variant="p2" textAlign="center" color="ligth">
          <Feather
            name="check"
            size={18}
            color={palette["ligth"]}
            style={{ fontWeight: "900" }}
          />{" "}
          2x1: Compra 1 escoge 2
        </Typography>

        <View style={styles.listCourses}>
          {courses.map((item, index) => (
            <View style={styles.itemCourses}>
              <Typography
                variant="p2"
                textAlign="left"
                color="black"
                style={{ fontWeight: "bold" }}
              >
                Escige tus cursos
              </Typography>
              <Check
                check={item.active}
                color="redPrimary"
                colorIcon="ligth"
                size={25}
                onChange={() => handlePress(index)}
              />
            </View>
          ))}
        </View>
      </View>
    </Layout>
  )
}

export default ChooseCoursesScreen
