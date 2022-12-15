import React, { useRef } from "react"
import {
  View,
  ViewProps,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native"
import Swiper from "react-native-swiper"
import { LinearGradient } from "expo-linear-gradient"
import { navigateUser, navigateAuth } from "../../../navigation/actions"
import { FontAwesome5 } from "@expo/vector-icons"
// Styles
import { styles, stylesNew } from "./SliderCourses.styles"
import { palette, paletteGradient } from "../../../utils/theme"
// COmponents
import { Typography, Button } from "../../global"
// Store
import { useAppSelector } from "../../../store"
import Carousel from "react-native-snap-carousel"

interface SliderCoursesProps {
  variant?: "popular" | "new" | "next"
  header?: boolean
  title?: string
  arrayItems?: Array<any>
  navigateToCourse?: any
}

type SliderCoursesAttributes = SliderCoursesProps & ViewProps

const SliderCourses = (props: SliderCoursesAttributes) => {
  const {
    style,
    variant,
    header,
    title,
    arrayItems = [],
    navigateToCourse,
  } = props

  const auth = useAppSelector((store) => store.Auth)

  const parseStyle = typeof style === "object" ? style : {}
  const items: Array<any> = [1, 2, 3]

  const getHeigth = () => {
    if (variant === "next") return 660
    if (variant === "new") return 340
    if (variant === "popular") return 280
  }

  const renderPagination = (current: number, total: number) => {
    if (variant === "new") {
      return <View></View>
    }

    return (
      <View style={styles.swiperPagination}>
        {Array(total)
          .fill(0)
          .map((item: any, index: number) => (
            <View
              key={index}
              style={{
                ...styles.swiperPaginationItem,
                width: current === index ? 8 : 8,
                backgroundColor: current === index ? "#FFFFFF" : "#787878",
              }}
            />
          ))}
      </View>
    )
  }

  const itemSlider = ({ item, index }: { item: any; index: any }) => {
    return (
      <TouchableOpacity
        key={item}
        style={stylesNew.swiperItemNew}
        onPress={() => false}
      >
        <ImageBackground
          style={stylesNew.swiperImageNew}
          source={require("../../../../assets/images/course-1.png")}
        >
          <LinearGradient
            start={{ x: 0.5, y: 0.8 }}
            end={{ x: 0.5, y: 0 }}
            colors={paletteGradient.gradientOpacity2}
            style={stylesNew.swiperItemNewContent}
          >
            <Image
              resizeMode="contain"
              style={{ width: "70%", height: 100 }}
              source={require("../../../../assets/images/svg-ejem.png")}
            />
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  const itemSliderPopu = ({ item, index }: { item: any; index: any }) => {
    return (
      <TouchableOpacity
        key={item}
        style={styles.swiperItemNext}
        onPress={() =>
          !auth.session
            ? navigateAuth("CourseDetail")
            : navigateUser("CourseDetail")
        }
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
            style={{ width: 35, height: 35, marginRight: 10 }}
            source={require("../../../../assets/images/user.png")}
          />
          <View>
            <Typography
              variant="p16"
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
              <Typography
                variant="p14"
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

  return (
    <View style={{ ...parseStyle, ...styles.main, height: getHeigth() }}>
      {header && (
        <View
          style={{
            ...styles.swiperTop,
            marginBottom: 20,
            paddingHorizontal: 30,
          }}
        >
          <Typography
            variant="heading3"
            textAlign="left"
            color="ligth"
            style={{ fontWeight: "bold" }}
          >
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

      {variant === "next" && (
        <Pressable style={styles.swiper}>
          {({ pressed }) => (
            <Swiper
              loop={variant === "next"}
              loadMinimalSize={2}
              loadMinimal={false}
              showsPagination={true}
              renderPagination={renderPagination}
              autoplay={variant === "next" && (!pressed ? true : false)}
              autoplayTimeout={5}
            >
              {(arrayItems.length > 0 ? arrayItems : items).map((item) => (
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
                    <Image
                      resizeMode="contain"
                      style={styles.swiperSvgPopular}
                      source={require("../../../../assets/images/svg-ejem.png")}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 3,
                        marginVertical: 5,
                      }}
                    >
                      <FontAwesome5
                        name="user-alt"
                        size={12}
                        color={palette["ligth"]}
                      />
                      <Typography
                        variant="p13"
                        color="ligth"
                        textAlign="left"
                        style={{ marginLeft: 9, marginTop: 3 }}
                      >
                        Jorge Enrique Avello
                      </Typography>
                    </View>
                    <View>
                      <Button
                        text={auth.session ? "Acceder" : "Ver curso"}
                        variant="sm"
                        color="redPrimary"
                        colorText="ligth"
                        style={{ marginTop: 15 }}
                        onPress={() => navigateToCourse(1)}
                      />
                    </View>
                  </LinearGradient>
                </View>
              ))}
            </Swiper>
          )}
        </Pressable>
      )}

      {variant === "new" && (
        <Carousel
          data={[1, 2, 3, 4, 5]}
          renderItem={itemSlider}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width * 0.6}
          vertical={false}
          loop={true}
        />
      )}

      {variant === "popular" && (
        <Carousel
          data={[1, 2, 3, 4, 5]}
          renderItem={itemSliderPopu}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width * 0.7}
          vertical={false}
          loop={true}
        />
      )}
    </View>
  )
}

export default SliderCourses
