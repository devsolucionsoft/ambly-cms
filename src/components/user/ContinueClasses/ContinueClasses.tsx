import React from "react"
import { View, ViewProps, TouchableOpacity, Image } from "react-native"
import Slider from "@react-native-community/slider"
import { MaterialIcons } from "@expo/vector-icons"
import { navigateUser } from "../../../navigation/actions"

// Theme
import { palette } from "../../../utils/theme"
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
          variant="heading3"
          textAlign="left"
          color="ligth"
          style={{ fontWeight: "bold" }}
        >
          Continuar clase
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

      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.swiperItem}
          onPress={() => navigateUser("ModuleDetail")}
        >
          <Image
            style={styles.swiperImage}
            source={require("../../../../assets/images/cocina.png")}
          />

          <View style={styles.swiperContent}>
            <View style={styles.swiperTop}>
              <Typography
                variant="p"
                color="ligth"
                textAlign="left"
                style={{ fontWeight: "bold", width: "60%", lineHeight: 20 }}
              >
                Cocina española
              </Typography>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={35}
                color={palette["ligth"]}
              />
            </View>

            <View style={{ width: "100%" }}>
              <Typography variant="p10" color="grayText" textAlign="left">
                32 videos - 35 Files - 12 Quiz
              </Typography>
            </View>
            <View style={{ width: "100%", marginTop: 10 }}>
              <Slider
                style={{ width: "100%", height: 10, marginBottom: 5 }}
                minimumValue={0}
                maximumValue={100}
                value={60}
                minimumTrackTintColor="#FF3437"
                maximumTrackTintColor="#686868"
                thumbTintColor="#FF3437"
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p10" color="grayText" textAlign="right">
                  24 lesson
                </Typography>
                <Typography variant="p10" color="grayText" textAlign="right">
                  24 lesson
                </Typography>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ContinueClasses
