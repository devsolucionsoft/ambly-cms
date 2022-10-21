import { useState, useRef } from "react"
import { View, Image, ImageBackground } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Video } from "expo-av"

// Styles compomponent
import { styles } from "./CourseDetail.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Divider } from "../../../components/global"
import { Layout, AccordionItem, ButtonAction } from "../../../components/user"
import { palette, paletteGradient } from "../../../utils/theme"
import { AntDesign } from "@expo/vector-icons"

const CourseDetailScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "CourseDetail">) => {
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

  const video = useRef(null)
  const [status, setStatus] = useState({})

  return (
    <Layout
      headerProps={{
        returnAction: true,
        variant: "information",
        title: "Profesores",
      }}
      buttonAction={{
        text: "Iniciar curso",
        onPress: () => navigation.navigate("ModuleDetail"),
      }}
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
            variant="headingLg"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 10 }}
          >
            Fuerza mental
          </Typography>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="user-alt" size={18} color={palette["ligth"]} />
            <Typography
              variant="p"
              color="ligth"
              textAlign="left"
              style={{ marginLeft: 10 }}
            >
              Jorge Enrique Avello
            </Typography>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.content}>
        {/* Content top */}

        {/* Content price */}
        <View style={styles.contentPrice}></View>

        {/* Content description */}
        <Typography
          variant="p2"
          textAlign="left"
          color="grayText"
          style={{ marginBottom: 20 }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>

        <Typography
          variant="heading2"
          textAlign="left"
          color="ligth"
          style={{ marginBottom: 30 }}
        >
          Por solo $43.000
        </Typography>

        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://joy.videvo.net/videvo_files/video/free/video0455/large_watermarked/_import_6091143fc4c4b6.26692621_preview.mp4",
          }}
          positionMillis={10000}
          resizeMode="cover"
          useNativeControls
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

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

export default CourseDetailScreen
