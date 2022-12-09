import { useState, useEffect } from "react"
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
import { AntDesign } from "@expo/vector-icons"
// Store
import { useAppSelector } from "../../../store"

const MyCoursesScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "MyCourses">) => {
  const coursesItems = useAppSelector((store) => store.User.myCourses)

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
          {
            coursesItems.map((item:any, index: number) => (
            <TouchableOpacity
              style={styles.itemCourse}
              onPress={() =>
                navigation.navigate("CourseDetail", {
                  id_course: item.id,
                })
              }
            >
              <AntDesign
                name="play"
                size={30}
                color="white"
                style={{ position: "absolute", zIndex: 3, right: 20, top: 20 }}
              />
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
                      {item.name_course}
                    </Typography>
                    <View style={styles.beagle}>
                      <Typography
                        color="grayText"
                        textAlign="left"
                        variant="p3"
                      >
                        Módulo {item.num_modulos} - min 4:30
                      </Typography>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
            ))
          }

          
        </View>
      </View>
    </Layout>
  )
}

export default MyCoursesScreen
