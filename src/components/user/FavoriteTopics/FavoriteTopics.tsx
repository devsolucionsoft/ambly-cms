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

  const itmes = [
    {
      createdAt: "2022-10-21T21:19:34.513Z",
      id: 1,
      image:
        "https://cartel-urbano-s3.s3.amazonaws.com/static/uploads/2cdd73c1d0a206c114c8-WhatsApp+Image+2022-11-11+at+11.30.13+AM.jpeg.webp",
      name: "Arte",
      updateAt: "2022-11-11T16:32:20.000Z",
    },
    {
      createdAt: "2022-11-11T16:32:47.451Z",
      id: 2,
      image:
        "https://cartel-urbano-s3.s3.amazonaws.com/static/uploads/03212e74e9f86a9468c0-WhatsApp+Image+2022-11-11+at+11.30.39+AM.jpeg.webp",
      name: "Negocios",
      updateAt: "2022-11-11T16:32:47.451Z",
    },
    {
      createdAt: "2022-11-11T16:33:12.147Z",
      id: 3,
      image:
        "https://cartel-urbano-s3.s3.amazonaws.com/static/uploads/64687ebcfa0e1b0055a7-WhatsApp+Image+2022-11-11+at+11.31.25+AM.jpeg.webp",
      name: "Estilo de vida",
      updateAt: "2022-11-11T16:33:12.147Z",
    },
    {
      createdAt: "2022-11-11T16:33:35.028Z",
      id: 4,
      image:
        "https://cartel-urbano-s3.s3.amazonaws.com/static/uploads/937cb6d6da57c030c476-WhatsApp+Image+2022-11-11+at+11.32.01+AM.jpeg.webp",
      name: "Cocina",
      updateAt: "2022-11-11T16:33:35.028Z",
    },
    {
      createdAt: "2022-10-21T21:19:34.513Z",
      id: 1,
      image:
        "https://cartel-urbano-s3.s3.amazonaws.com/static/uploads/2cdd73c1d0a206c114c8-WhatsApp+Image+2022-11-11+at+11.30.13+AM.jpeg.webp",
      name: "Arte",
      updateAt: "2022-11-11T16:32:20.000Z",
    },
    {
      createdAt: "2022-11-11T16:32:47.451Z",
      id: 2,
      image:
        "https://cartel-urbano-s3.s3.amazonaws.com/static/uploads/03212e74e9f86a9468c0-WhatsApp+Image+2022-11-11+at+11.30.39+AM.jpeg.webp",
      name: "Negocios",
      updateAt: "2022-11-11T16:32:47.451Z",
    },
  ]

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
        {itmes.map((item: any, index) => (
          <TouchableOpacity key={index} style={styles.topicsItem}>
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
