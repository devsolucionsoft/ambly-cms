import React from "react"
import { View, ViewProps, Image, TouchableOpacity } from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
// Styles
import { styles } from "./FavoriteTopics.styles"
// COmponents
import { Typography } from "../../global"

const Topics = [1, 2, 3, 4, 5, 6]

interface FavoriteTopicsProps {}
type FavoriteTopicsAttributes = FavoriteTopicsProps & ViewProps

const FavoriteTopics = (props: FavoriteTopicsAttributes) => {
  const { style } = props

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={{ ...parseStyle, ...styles.main }}>
      <Typography variant="p" color="ligth" textAlign="center">
        Escoge tu{" "}
        <Typography
          variant="p"
          color="ligth"
          textAlign="center"
          style={{ fontWeight: "bold" }}
        >
          TEMA FAVORITO
        </Typography>{" "}
        y encuentra el curso que mas te guste
      </Typography>

      <View style={styles.topicsList}>
        {Topics.map((item) => (
          <TouchableOpacity key={item} style={styles.topicsItem}>
            <Image
              style={styles.topicImage}
              source={require("../../../../assets/images/start-login.png")}
            />
            <Typography variant="p2" textAlign="left" color="ligth">Arte</Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FavoriteTopics
