import React, { useRef } from "react"
import {
  View,
  ViewProps,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import Swiper from "react-native-swiper"
import { LinearGradient } from "expo-linear-gradient"
import { navigateUser } from "../../../navigation/actions"
import { FontAwesome5 } from "@expo/vector-icons"
// Styles
import { styles } from "./SliderCourses.styles"
import { palette, paletteGradient } from "../../../utils/theme"
// COmponents
import { Typography, Button } from "../../global"

interface SliderCoursesProps {
  variant?: "popular" | "new" | "next"
  header?: boolean
  title?: string
}

type SliderCoursesAttributes = SliderCoursesProps & ViewProps

const SliderCourses = (props: SliderCoursesAttributes) => {
  const { style, variant, header, title } = props

  const parseStyle = typeof style === "object" ? style : {}
  const items: Array<any> = [1, 2, 3]

  const videoPlayer = useRef<any>()

  const getHeigth = () => {
    if (variant === "next") return 600
    if (variant === "new") return 420
    if (variant === "popular") return 300
  }

  const renderPagination = (current: number, total: number) => {
    return (
      <View style={styles.swiperPagination}>
        {Array(total)
          .fill(0)
          .map((item: any, index: number) => (
            <View
              key={index}
              style={{
                ...styles.swiperPaginationItem,
                backgroundColor: current === index ? "#FFFFFF" : "#787878",
              }}
            />
          ))}
      </View>
    )
  }

  return (
    <View style={{ ...parseStyle, ...styles.main, height: getHeigth() }}>
      {header && (
        <View style={styles.swiperTop}>
          <Typography variant="heading2" textAlign="left" color="ligth">
            {title}
          </Typography>
          <TouchableOpacity style={{ justifyContent: "center", marginTop: 5 }}>
            <Typography
              variant="p3"
              textAlign="left"
              color="redPrimary"
              style={{ fontWeight: "bold" }}
            >
              Ver todos
            </Typography>
          </TouchableOpacity>
        </View>
      )}

      <Swiper
        loop={false}
        loadMinimalSize={2}
        loadMinimal={false}
        showsPagination={true}
        renderPagination={renderPagination}
      >
        {items.map((item) => {
          if (variant === "next") {
            return (
              <View key={item} style={styles.swiperItemPopular}>
                <Image
                  style={styles.swiperImagePopular}
                  resizeMode="contain"
                  source={require("../../../../assets/images/course-3.jpg")}
                />
                <LinearGradient
                  start={{ x: 0.5, y: 0.8 }}
                  end={{ x: 0.5, y: 0 }}
                  colors={paletteGradient.gradientOpacity}
                  style={styles.swiperItemPopularContent}
                >
                  <Typography
                    variant="heading"
                    color="ligth"
                    textAlign="left"
                    style={{ fontWeight: "bold" }}
                  >
                    Confianza en si mismo
                  </Typography>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome5
                      name="user-alt"
                      size={12}
                      color={palette["ligth"]}
                    />
                    <Typography variant="p2" color="ligth" textAlign="left" style={{marginLeft: 10}}>
                      Jorge Enrique Avello
                    </Typography>
                  </View>
                  <Button
                    text="Acceder"
                    variant="sm"
                    color="redPrimary"
                    colorText="ligth"
                    style={{ marginTop: 15, paddingHorizontal: 60 }}
                    onPress={() => navigateUser("CourseDetail")}
                  />
                </LinearGradient>
              </View>
            )
          }

          if (variant === "new") {
            return (
              <TouchableOpacity
                key={item}
                style={styles.swiperItemNew}
                onPress={() => navigateUser("CourseDetail")}
              >
                <ImageBackground
                  style={styles.swiperImageNew}
                  source={require("../../../../assets/images/course-1.png")}
                >
                  <LinearGradient
                    start={{ x: 0.5, y: 0.8 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={paletteGradient.gradientOpacity2}
                    style={styles.swiperItemNewContent}
                  >
                    <Typography
                      variant="heading2"
                      color="ligth"
                      textAlign="left"
                      style={{ marginBottom: 10 }}
                    >
                      Confianza en si mismo
                    </Typography>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FontAwesome5
                        name="user-alt"
                        size={12}
                        color={palette["ligth"]}
                      />
                      <Typography
                        variant="p2"
                        color="ligth"
                        textAlign="left"
                        style={{ marginLeft: 10 }}
                      >
                        Jorge Enrique Avello
                      </Typography>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            )
          }

          if (variant === "popular") {
            return (
              <TouchableOpacity
                key={item}
                style={styles.swiperItemNext}
                onPress={() => navigateUser("CourseDetail")}
              >
                <Image
                  style={styles.swiperVideoNext}
                  source={require("../../../../assets/images/course-2.png")}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Image
                    style={{ width: 40, height: 40, marginRight: 10 }}
                    source={require("../../../../assets/images/user.png")}
                  />
                  <View>
                    <Typography
                      variant="p"
                      color="ligth"
                      textAlign="left"
                      style={{ fontWeight: "bold" }}
                    >
                      Confianza en si mismo
                    </Typography>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FontAwesome5
                        name="user-alt"
                        size={12}
                        color={palette["ligth"]}
                      />
                      <Typography
                        variant="p2"
                        color="ligth"
                        textAlign="left"
                        style={{ marginLeft: 10 }}
                      >
                        Jorge Enrique Avello
                      </Typography>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        })}
      </Swiper>
    </View>
  )
}

export default SliderCourses
