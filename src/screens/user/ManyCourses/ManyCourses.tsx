import { useState } from "react"
import {
  View,
  ScrollView,
  ImageBackground,
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
import { Header, Typography } from "../../../components/global"
import { ButtonAction } from "../../../components/user"

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
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require("../../../../assets/images/background-screen.png")}
    >
      <Header returnAction icon variant="information"  />

      <ScrollView>
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
      </ScrollView>

      <ButtonAction text="ELEGIR CURSOS" onPress={() => navigation.navigate("ChooseCourses")} />
    </ImageBackground>
  )
}

export default ManyCoursesScreen
