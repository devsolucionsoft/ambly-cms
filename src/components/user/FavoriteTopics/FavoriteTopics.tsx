import { useEffect, useState } from "react"
import { View, ViewProps, Image, TouchableOpacity } from "react-native"
// Styles
import { styles } from "./FavoriteTopics.styles"
// COmponents
import { Typography } from "../../global"
// Api
import { UserApi } from "../../../api"

const Topics = [1, 2, 3, 4]

interface FavoriteTopicsProps {}
type FavoriteTopicsAttributes = FavoriteTopicsProps & ViewProps

const FavoriteTopics = (props: FavoriteTopicsAttributes) => {
  const { style } = props
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
      <Typography
        variant="h5"
        color="ligth"
        textAlign="center"
        style={{ fontWeight: "normal", marginBottom: 20 }}
      >
        Personaliza tu experiencia
      </Typography>
      <Typography variant="p16" color="ligth" textAlign="center" style={{ fontWeight: "300"}}>
        Escoge tu TEMA FAVORITO y encuentra el curso que mas te guste
      </Typography>

      <View style={styles.topicsList}>
        {topics.map((item: any) => (
          <TouchableOpacity key={item.createdAt} style={styles.topicsItem}>
            <Image
              style={styles.topicImage}
              source={{uri: item.image}}
            />
            <Typography variant="p" textAlign="left" color="ligth">
              {item.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FavoriteTopics
