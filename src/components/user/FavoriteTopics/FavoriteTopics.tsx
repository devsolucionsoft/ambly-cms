import { useEffect, useState } from "react"
import { View, ViewProps, Image, TouchableOpacity } from "react-native"
// Styles
import { styles } from "./FavoriteTopics.styles"
// COmponents
import { Typography } from "../../global"
// Api
import { UserApi } from "../../../api"

const Topics = [1, 2, 3, 4]

interface FavoriteTopicsProps {
  handlePress: any
}
type FavoriteTopicsAttributes = FavoriteTopicsProps & ViewProps

const FavoriteTopics = (props: FavoriteTopicsAttributes) => {
  const { style, handlePress } = props
  const parseStyle = typeof style === "object" ? style : {}

  const UserApiModel = new UserApi()
  const [topics, setTopics] = useState([])
  
  useEffect(() => {
    ;(async () => {
      const response = await UserApiModel.GetCategories()
      response.status === 200 && setTopics(response.data)
    })()
  }, [])

  return (
    <View style={{ ...parseStyle, ...styles.main }}>
      <View
        style={{
          ...styles.swiperTop,
          marginBottom: 20,
          paddingHorizontal: 0,
        }}
      >
        <Typography
          variant="heading3"
          textAlign="left"
          color="ligth"
          style={{ fontWeight: "bold" }}
        >
          Categorías
        </Typography>
        <TouchableOpacity style={{ justifyContent: "center", marginTop: 5 }}>
        </TouchableOpacity>
      </View>

      <View style={styles.topicsList}>
        {topics.map((item: any, index) => (
          <TouchableOpacity key={index} style={styles.topicsItem} onPress={() => handlePress(index)}>
            <Image
              style={styles.topicImage}
              source={{uri: item.image}}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FavoriteTopics
