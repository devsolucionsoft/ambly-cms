import React from "react"
import { View, ViewProps, TouchableOpacity, Image } from "react-native"
import Swiper from "react-native-swiper"
import Slider from "@react-native-community/slider"
import { MaterialIcons } from "@expo/vector-icons"
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
        <Typography
          variant="heading2"
          color="ligth"
          textAlign="left"
          style={{ marginBottom: 8 }}
        >
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
            <Image
              style={styles.swiperImage}
              source={require("../../../../assets/images/start-login.png")}
            />

            <View style={styles.swiperContent}>
              <View style={styles.swiperTop}>
                <Typography
                  variant="p"
                  color="ligth"
                  textAlign="left"
                  style={{ fontWeight: "bold", width: "60%" }}
                >
                  Confianza en si mismo
                </Typography>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={palette["ligth"]}
                />
              </View>

              <View style={{ width: "100%" }}>
                <Typography variant="p4" color="grayText" textAlign="left">
                  32 videos - 35 Files - 12 Quiz
                </Typography>
              </View>
              <View style={{ width: "100%", marginTop: 10 }}>
                <Slider
                  style={{ width: "100%", height: 10, marginVertical: 5 }}
                  minimumValue={0}
                  maximumValue={100}
                  value={60}
                  minimumTrackTintColor="#FF3437"
                  maximumTrackTintColor="#686868"
                />
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <Typography variant="p4" color="grayText" textAlign="right">
                    24 lesson
                  </Typography>
                  <Typography variant="p4" color="grayText" textAlign="right">
                    24 lesson
                  </Typography>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  )
}

export default ContinueClasses
