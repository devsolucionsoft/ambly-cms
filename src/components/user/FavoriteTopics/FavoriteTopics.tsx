import React from "react"
import { View, ViewProps, Image, TouchableOpacity } from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
// Styles
import { styles } from "./FavoriteTopics.styles"
// COmponents
import { Typography } from "../../global"

const Topics = [1, 2, 3, 4]

interface FavoriteTopicsProps {}
type FavoriteTopicsAttributes = FavoriteTopicsProps & ViewProps

const FavoriteTopics = (props: FavoriteTopicsAttributes) => {
  const { style } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={{ ...parseStyle, ...styles.main }}>
      <Typography
        variant="heading3"
        color="ligth"
        textAlign="center"
        style={{ fontWeight: "bold", marginBottom: 20 }}
      >
        Personaliza tu experiencia      
      </Typography>
      <Typography variant="p" color="ligth" textAlign="center">
        Escoge tu TEMA FAVORITO y encuentra el curso que mas te guste
      </Typography>

      <View style={styles.topicsList}>
        {Topics.map((item) => (
          <TouchableOpacity key={item} style={styles.topicsItem}>
            <Image
              style={styles.topicImage}
              source={require("../../../../assets/images/tema.png")}
            />
            <Typography
              variant="p"
              textAlign="left"
              color="ligth"
            >
              Arte
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FavoriteTopics
