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
// Styles
import { styles } from "./SliderCourses.styles"
import { paletteGradient } from "../../../utils/theme"
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
    if (variant === "new") return 350
    if (variant === "popular") return 230
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
        showsPagination={false}
      >
        {items.map((item) => {
          if (variant === "next") {
            return (
              <View key={item} style={styles.swiperItemPopular}>
                <Image
                  style={styles.swiperImagePopular}
                  source={require("../../../../assets/images/start-login.png")}
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
                  <Typography variant="p2" color="ligth" textAlign="left">
                    Jorge Enrique Avello
                  </Typography>
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
              <TouchableOpacity key={item} style={styles.swiperItemNew}>
                <ImageBackground
                  style={styles.swiperImageNew}
                  source={require("../../../../assets/images/start-login.png")}
                >
                  <View style={styles.swiperItemNewContent}>
                    <Typography
                      variant="heading"
                      color="ligth"
                      textAlign="center"
                      style={{ marginBottom: 20 }}
                    >
                      Confianza en si mismo
                    </Typography>
                    <Typography
                      variant="heading3"
                      color="ligth"
                      textAlign="center"
                    >
                      Jorge Enrique Avello
                    </Typography>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )
          }

          if (variant === "popular") {
            return (
              <TouchableOpacity key={item} style={styles.swiperItemNext}>
                <ImageBackground
                  style={styles.swiperVideoNext}
                  source={require("../../../../assets/images/start-login.png")}
                ></ImageBackground>
                <Typography
                  variant="p"
                  color="ligth"
                  textAlign="left"
                  style={{ marginTop: 20, fontWeight: "bold" }}
                >
                  Confianza en si mismo
                </Typography>
                <Typography variant="p2" color="ligth" textAlign="left">
                  Jorge Enrique Avello
                </Typography>
              </TouchableOpacity>
            )
          }
        })}
      </Swiper>
    </View>
  )
}

export default SliderCourses
