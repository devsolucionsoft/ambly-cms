import { useEffect, useState } from "react"
import { View, ViewProps, Image, TouchableOpacity } from "react-native"
// Styles
import { styles } from "./Tutors.styles"
// COmponents
import { Typography } from "../../global"
// Api
import { UserApi } from "../../../api"

const Topics = [1, 2, 3, 4]

interface TutorsProps {}
type TutorsAttributes = TutorsProps & ViewProps

const Tutors = (props: TutorsAttributes) => {
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
          Maestros
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

      <View style={styles.topicsList}>
        {[1, 2].map((item: any, index) => (
          <TouchableOpacity key={index} style={styles.topicsItem}>
            <Image
              style={styles.topicImage}
              source={require("../../../../assets/images/course.png")}
            />
            <Typography variant="p3" textAlign="left" color="ligth">
              {"Nombres apellidos"}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Tutors
