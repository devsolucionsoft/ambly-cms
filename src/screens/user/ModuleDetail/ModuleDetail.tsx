import { useState, useRef } from "react"
import * as ScreenOrientation from "expo-screen-orientation"
import { View, TouchableOpacity } from "react-native"
import { Video, ResizeMode } from "expo-av"
import { Octicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
// Styles compomponent
import { styles } from "./ModuleDetail.styles"
import { palette } from "../../../utils/theme"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Button } from "../../../components/global"
import { Layout, AccordionItem } from "../../../components/user"

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

const ModuleDetailScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "ModuleDetail">) => {
  const [courses, setCourses] = useState([
    { text: "Cuerso 1", active: false },
    { text: "Cuerso 2", active: false },
    { text: "Cuerso 3", active: false },
  ])

  const video = useRef(null)
  const [status, setStatus] = useState({})
  const [orientationLock, setOrientationLock] = useState<"PORTRAIT" | "LANDSCAPE_RIGHT">("PORTRAIT")

  const changeScreenOrientation = async (status:any) => {
    if (status.fullscreenUpdate === 1) {
      setOrientationLock("LANDSCAPE_RIGHT")
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    if (status.fullscreenUpdate === 2) {
      setOrientationLock("PORTRAIT")
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  

  return (
    <Layout
      headerProps={{
        returnAction: true,
        variant: "information",
        title: "Nombre del modulo",
      }}
    >
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://joy.videvo.net/videvo_files/video/free/video0455/large_watermarked/_import_6091143fc4c4b6.26692621_preview.mp4",
        }}
        isLooping={false}
        useNativeControls
        resizeMode={orientationLock === "PORTRAIT" ? ResizeMode.COVER : ResizeMode.CONTAIN}
        onFullscreenUpdate={(status) => changeScreenOrientation(status)}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      {/* Content modules */}
      <View style={styles.content}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={styles.beagle}>
            <Typography
              color="ligth"
              variant="p3"
              textAlign="left"
              style={{ fontWeight: "bold" }}
            >
              Modulo 2
            </Typography>
          </View>
        </View>
        <Typography
          color="ligth"
          variant="heading3"
          textAlign="left"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          Nombre del modulo
        </Typography>
        <Typography
          color="ligth"
          variant="p2"
          textAlign="left"
          style={{ marginBottom: 20 }}
        >
          En este modulo aprenderás algunos conceptos básicos que todo un chef
          en casa debe conocer. en este modulo aprenderás algunos conceptos
          básicos que todo un chef en casa debe conocer.
        </Typography>

        <Button
          color="redPrimary"
          colorText="ligth"
          variant="md"
          text="Continuar estudiando"
          style={{ marginBottom: 30 }}
        />

        <Typography
          color="ligth"
          variant="p"
          textAlign="left"
          style={{ fontWeight: "bold", marginBottom: 20, marginTop: 20 }}
        >
          Descargables
        </Typography>
        <View style={styles.moduleList}>
          {modules.map((item) => (
            <TouchableOpacity style={styles.downloadable}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.downloadableIcon}>
                  <MaterialIcons
                    name="picture-as-pdf"
                    size={40}
                    color={palette["ligth"]}
                  />
                </View>
                <View style={styles.downloadableContent}>
                  <Typography
                    color="ligth"
                    variant="p"
                    textAlign="left"
                    style={{ fontWeight: "bold" }}
                  >
                    Nombre del modulo
                  </Typography>
                  <Typography color="grayText" variant="p3" textAlign="left">
                    Descargado
                  </Typography>
                </View>
              </View>
              <View style={styles.downloadableDown}>
                <Octicons name="download" size={24} color={palette["ligth"]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Typography
          color="ligth"
          variant="p"
          textAlign="left"
          style={{ fontWeight: "bold", marginBottom: 20, marginTop: 20 }}
        >
          Todos lo modulos
        </Typography>
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
    </Layout>
  )
}

export default ModuleDetailScreen