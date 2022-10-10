import React, { useRef } from "react"
import { View, ViewProps, Image, ImageBackground, TouchableOpacity } from "react-native"
import Swiper from "react-native-swiper"
// Styles
import { styles } from "./SliderCourses.styles"
// COmponents
import { Typography, Button } from "../../global"

interface SliderCoursesProps {
  variant?: "popular" | "new" | "next"
}

type SliderCoursesAttributes = SliderCoursesProps & ViewProps

const SliderCourses = (props: SliderCoursesAttributes) => {
  const { style, variant } = props

  const parseStyle = typeof style === "object" ? style : {}
  const items: Array<any> = [1, 2, 3]

  const videoPlayer = useRef<any>()

  return (
    <View style={{...styles.main, height: variant === "next" ? 230 : 350}}>
      <Swiper
        loop={false}
        loadMinimalSize={2}
        loadMinimal={false}
        showsPagination={false}
      >
        {items.map((item) => {
          if (variant === "popular") {
            return (
              <View key={item} style={styles.swiperItemPopular}>
                <Image
                  style={styles.swiperImagePopular}
                  source={require("../../../../assets/images/start-login.png")}
                />
                <View style={styles.swiperItemPopularContent}>
                  <Typography
                    variant="p2"
                    color="dark"
                    textAlign="left"
                    style={{ fontWeight: "bold" }}
                  >
                    Confianza en si mismo
                  </Typography>
                  <Typography variant="p2" color="grayText" textAlign="left">
                    Jorge Enrique Avello
                  </Typography>
                  <Button
                    text="Acceder"
                    variant="sm"
                    color="redPrimary"
                    colorText="ligth"
                    style={{ marginTop: 15 }}
                  />
                </View>
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

          if (variant === "next") {
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
