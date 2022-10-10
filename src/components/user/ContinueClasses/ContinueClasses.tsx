import React from "react"
import { View, ViewProps, TouchableOpacity, Image } from "react-native"
import Swiper from "react-native-swiper"
import Slider from "@react-native-community/slider"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
// Styles
import { styles } from "./ContinueClasses.styles"
// Components
import { Typography } from "../../global"

interface ContinueClassesProps {}

type ContinueClassesAttributes = ContinueClassesProps & ViewProps

const ContinueClasses = (props: ContinueClassesAttributes) => {
  const { style } = props

  const parseStyle = typeof style === "object" ? style : {}
  const items: Array<any> = [1, 2, 3]

  return (
    <View style={{ ...parseStyle, ...styles.main }}>
      <View style={styles.mainTop}>
        <Typography variant="heading2" color="ligth" textAlign="left" style={{marginBottom: 8}}>
          Continuar clase
        </Typography>
        <TouchableOpacity>
          <Typography variant="p" color="yellowPrimary" textAlign="right">
            See all
          </Typography>
        </TouchableOpacity>
      </View>

      <Swiper
        loop={false}
        loadMinimalSize={2}
        loadMinimal={false}
        showsPagination={false}
        style={styles.swiper}
      >
        {items.map((item) => (
          <TouchableOpacity key={item} style={styles.swiperItem}>
            <View style={styles.itemTop}>
              <Image
                style={styles.swiperImage}
                source={require("../../../../assets/images/start-login.png")}
              />
              <Typography
                variant="p"
                color="dark"
                textAlign="left"
                style={{ fontWeight: "bold", width: "60%" }}
              >
                Confianza en si mismo
              </Typography>
            </View>
            <View style={{ width: "100%" }}>
              <Slider
                style={{ width: "100%", height: 10, marginTop: 5 }}
                minimumValue={0}
                maximumValue={100}
                value={60}
                minimumTrackTintColor="#363636"
                maximumTrackTintColor="#373737"
              />
              <Typography variant="p3" color="dark" textAlign="right">
                24 lesson
              </Typography>
            </View>
            <View style={{ width: "100%" }}>
              <Typography variant="p3" color="dark" textAlign="center">
                32 videos - 35 Files - 12 Quiz
              </Typography>
            </View>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  )
}

export default ContinueClasses
