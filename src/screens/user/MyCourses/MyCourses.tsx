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
import { Typography } from "../../../components/global"
import { Layout } from "../../../components/user"
import { AntDesign } from '@expo/vector-icons';

const MyCoursesScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "MyCourses">) => {
  const [courses, setCourses] = useState([
    { text: "Curso 1", active: false, image: "../../../../assets/images/course.png", title: "Fuerza mental"},
    { text: "Curso 2", active: false, image: "../../../../assets/images/cocina.png", title: "Cocina de lujo" },
  ])

  return (
    <Layout
      spaceTop
      headerProps={{
        returnAction: true,
        variant: "information",
        title: "Mis cursos",
      }}
      navCourse={true}
    >
      <View style={styles.content}>
        <Typography color="ligth" variant="p" textAlign="center">
          Andrés{" "}
          <Typography
            color="ligth"
            variant="p"
            textAlign="center"
            style={{ fontWeight: "bold" }}
          >
            continua con tu aprendizaje
          </Typography>{" "}
          con estos cursos…
        </Typography>
        <View style={styles.listCourses}>
          {//courses.map((item, index) => (
            <TouchableOpacity
              style={styles.itemCourse}
              onPress={() =>
                navigation.navigate("CourseDetail", {
                  id_course: 1,
                })
              }
            >
              <AntDesign name="play" size={30} color="white" style={{position: "absolute", zIndex: 3, right: 20, top: 20}} />
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
                  <View style={{ marginRight: 10, width: "70%" }}>
                    <Typography
                      color="ligth"
                      textAlign="left"
                      variant="heading2"
                      style={{ lineHeight: 30 }}
                    >
                      {"Fuerza Mental"}
                    </Typography>
                    <View style={styles.beagle}>
                      <Typography
                        color="grayText"
                        textAlign="left"
                        variant="p3"
                      >
                        Módulo 4 - min 4:30
                      </Typography>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          /*))*/}

<TouchableOpacity
              style={styles.itemCourse}
              onPress={() =>
                navigation.navigate("CourseDetail", {
                  id_course: 1,
                })
              }
            >
              <AntDesign name="play" size={30} color="white" style={{position: "absolute", zIndex: 3, right: 20, top: 20}} />
              <ImageBackground
                style={styles.itemCourseImage}
                source={require("../../../../assets/images/cocina.png")}
              >
                <LinearGradient
                  start={{ x: 0.5, y: 1 }}
                  end={{ x: 0.5, y: 0 }}
                  style={styles.itemCourseContent}
                  colors={paletteGradient.gradientOpacity2}
                >
                  <View style={{ marginRight: 10, width: "70%" }}>
                    <Typography
                      color="ligth"
                      textAlign="left"
                      variant="heading2"
                      style={{ lineHeight: 30 }}
                    >
                      {"Cocina de lujo"}
                    </Typography>
                    <View style={styles.beagle}>
                      <Typography
                        color="grayText"
                        textAlign="left"
                        variant="p3"
                      >
                        Módulo 4 - min 4:30
                      </Typography>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
        </View>
      </View>
    </Layout>
  )
}

export default MyCoursesScreen
