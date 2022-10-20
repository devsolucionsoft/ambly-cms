import { useState } from "react"
import { View, ImageBackground, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
// Styles compomponent
import { styles } from "./MyCourses.styles"
import { paletteGradient } from "../../../utils/theme"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Button } from "../../../components/global"
import { Layout } from "../../../components/user"

const MyCoursesScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "MyCourses">) => {
  const [courses, setCourses] = useState([
    { text: "Curso 1", active: false },
    { text: "Curso 2", active: false },
    { text: "Curso 3", active: false },
  ])

  return (
    <Layout
      spaceTop
      headerProps={{
        returnAction: true,
        variant: "information",
        title: "Mis cursos",
      }}
    >
      <View style={styles.content}>
        <View style={styles.listCourses}>
          {courses.map((item, index) => (
            <TouchableOpacity style={styles.itemCourse}>
              <ImageBackground
                style={styles.itemCourseImage}
                source={require("../../../../assets/images/course.png")}
              >
                <LinearGradient
                  start={{ x: 0.5, y: 1 }}
                  end={{ x: 0.5, y: 0 }}
                  style={styles.itemCourseContent}
                  colors={paletteGradient.gradientOpacity2}
                >
                  <View style={{ marginRight: 10 }}>
                    <Typography
                      color="ligth"
                      textAlign="left"
                      variant="heading3"
                    >
                      Cocina de lujo
                    </Typography>
                    <Typography color="grayText" textAlign="left" variant="p2">
                      Módulo 4 - min 4:30
                    </Typography>
                  </View>
                  <Button
                    color="redPrimary"
                    colorText="ligth"
                    text="Continuar"
                    variant="sm"
                  />
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Layout>
  )
}

export default MyCoursesScreen
