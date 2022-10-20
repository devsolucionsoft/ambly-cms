import { useState } from "react"
import {
  View,
  TouchableOpacity,
} from "react-native"
// Styles compomponent
import { styles } from "./ManyCoursesScreen.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography } from "../../../components/global"
import { Layout, ButtonAction } from "../../../components/user"

const ManyCoursesScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "ManyCourses">) => {
  const [courses, setCourses] = useState([
    { text: "2x1: Compra 1 escoge 2", active: false },
    { text: "3x2: Compra 2 escoge 3", active: false },
    { text: "Cuerso 1", active: false },
    { text: "Cuerso 2", active: false },
    { text: "Cuerso 3", active: false },
  ])

  const handlePress = (value: number) => {
    courses[value].active
      ? setCourses(courses.map((item) => ({ ...item, active: false })))
      : setCourses(
          courses.map((item, index) =>
            value == index
              ? { ...item, active: true }
              : { ...item, active: false }
          )
        )
  }

  return (
    <Layout
      spaceTop
      headerProps={{ returnAction: true, icon: true, variant: "information" }}
    >
      <View style={styles.content}>
        <Typography variant="heading3" textAlign="center" color="ligth">
          ¿A cuantos cursos quieres acceder?
        </Typography>

        <View style={styles.listCourses}>
          {courses.map((item, index) => (
            <TouchableOpacity
              style={
                item.active
                  ? { ...styles.itemCourses, ...styles.itemCoursesActive }
                  : styles.itemCourses
              }
              onPress={() => handlePress(index)}
            >
              <Typography
                variant="p2"
                textAlign="left"
                color="black"
                style={{ fontWeight: "bold" }}
              >
                {item.text}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ButtonAction
        text="ELEGIR CURSOS"
        onPress={() => navigation.navigate("ChooseCourses")}
      />
    </Layout>
  )
}

export default ManyCoursesScreen
