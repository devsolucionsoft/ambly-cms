import { useState, useEffect } from "react";
import { View, ImageBackground } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
// API
import { UserApi } from "../../../api"
// Styles compomponent
import { styles } from "./CourseDetail.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Button } from "../../../components/global"
import { Layout, AccordionItem, NavCourse } from "../../../components/user"
import { palette, paletteGradient } from "../../../utils/theme"
// Utils
import { thousandPoints } from "../../../utils/functions";
const CourseDetail = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "CourseDetail">) => {
  const { id_course } = route.params

  const userApiModel = new UserApi()
  const [courseInfo, setCourseInfo] = useState<any>()

  useEffect(() => {
    ;(async () => {
      const response = await userApiModel.GetCourse(id_course)
      if (response.status === 200) {
        setCourseInfo(response.data)
      }
    })()
  }, [])
  const modules = [
    {
      title: "intoducción",
      duration: "5:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videos: [
        {
          title: "intoducción",
          duration: "5:00",
          sub: "Due in 1 day",
        },
        {
          title: "intoducción",
          duration: "5:00",
          sub: "Due in 1 day",
        },
      ],
    },
    {
      title: "intoducción",
      duration: "5:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videos: [
        {
          title: "intoducción",
          duration: "5:00",
        },
        {
          title: "intoducción",
          duration: "5:00",
        },
      ],
    },
  ]

  return (
    <Layout
      headerProps={{
        returnAction: true,
      }}
      // navCourse={<NavCourse page={route.name}  />}
      buttonAction={{
        text: "Iniciar curso",
        onPress: () => navigation.navigate("ModuleDetail"),
      }}
      navCourse={true}
    >
      <ImageBackground
        style={styles.image}
        source={require("../../../../assets/images/mariana.jpg")}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.8 }}
          end={{ x: 0.5, y: 0 }}
          colors={paletteGradient.gradientOpacity}
          style={styles.imageContent}
        >
          <Typography
            variant="h2"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 0, fontWeight: "normal" }}
          >
            {courseInfo?.name_course}
          </Typography>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="user-alt" size={16} color={palette["ligth"]} />
            <Typography
              variant="p18"
              color="ligth"
              textAlign="left"
              style={{ marginLeft: 10, fontWeight: "normal", marginTop: 5 }}
            >
              {courseInfo?.instructor.name_instructor}
            </Typography>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles?.content}>
        {/* Content description */}
        <Typography
          variant="p2"
          textAlign="left"
          color="grayText"
          style={{ marginBottom: 20 }}
        >
          {courseInfo?.instructor.description_instructor}
        </Typography>

        <Typography
          variant="heading2"
          textAlign="left"
          color="ligth"
          style={{ marginBottom: 30 }}
        >
          Por solo ${thousandPoints(courseInfo?.price_course)}
        </Typography>

        {/* Content price */}
        <View style={styles.caracteristics}>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Duración
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              4 horas
            </Typography>
          </View>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Outcome
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              Lorem Ipsum is simply dummy
            </Typography>
          </View>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Feedback from
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              Lorem Ipsum is simply dummy
            </Typography>
          </View>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Structure
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              Lorem Ipsum is simply dummy
            </Typography>
          </View>
          <View style={{ ...styles.caracteristicsItem, width: "100%" }}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Dificulty
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              All levels
            </Typography>
          </View>
        </View>

        {/* Content price */}
        <View style={styles.cirriculum}>
          <Typography
            variant="heading3"
            textAlign="center"
            color="ligth"
            style={{ fontWeight: "bold" }}
          >
            Explore the curriculum
          </Typography>
          <Typography variant="p2" textAlign="center" color="ligth">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </Typography>

          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ fontWeight: "bold", marginTop: 20 }}
          >
            Lesson
          </Typography>

          {/* Content modules */}
          <View style={styles.moduleList}>
            {modules.map((item) => (
              <AccordionItem
                title={item.title}
                duration={item.duration}
                description={item.description}
                items={item.videos}
              />
            ))}
          </View>
        </View>

        {/* Content price */}
        <View style={{ marginTop: 20 }}>
          <Typography
            variant="heading3"
            textAlign="center"
            color="ligth"
            style={{ fontWeight: "bold", marginBottom: 15 }}
          >
            Que vas a aprender
          </Typography>

          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 5 }}
          >
            - Lorem Ipsum is simply dummy text of the printing.
          </Typography>
          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 5 }}
          >
            - Lorem Ipsum is simply dummy text of the printing.
          </Typography>
          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 5 }}
          >
            - Lorem Ipsum is simply dummy text of the printing.
          </Typography>
        </View>
      </View>
    </Layout>
  )
}

export default CourseDetail
