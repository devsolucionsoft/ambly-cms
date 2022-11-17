import { useState, useRef } from "react"
import { View, TouchableOpacity, Image } from "react-native"
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
import { Layout, AccordionItem, VideoItem } from "../../../components/user"
// Store
import { useAppDispatch } from "../../../store"
import { onLoader } from "../../../store/Loader/actions"

const modules = [
  {
    title: "Nombre del video 1",
    duration: "5:00",
    video:
      "https://joy.videvo.net/videvo_files/video/free/video0455/large_watermarked/_import_6091143fc4c4b6.26692621_preview.mp4",
    description:
      "description video 1 description video 1 description video 1 description video 1 description video 1 description video 1.",

  },
  {
    title: "Nombre del video 2",
    duration: "5:00",
    video:
      "https://cdn.videvo.net/videvo_files/video/premium/video0037/large_watermarked/docklands_clocks00_preview.mp4",
    description:
      "description video 2 description video 2 description video 2 description video 2 description video 2 description video 2description video 2.",
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
  {
    title: "Nombre del video 3",
    duration: "5:00",
    video:
      "https://joy.videvo.net/videvo_files/video/free/video0453/large_watermarked/_121__import_preview.mp4",
    description:
      "description video 3 description video 3 description video 3 description video 3 description video 3 description video 3description video 3.",
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
    { text: "Curso 1", active: false },
    { text: "Curso 2", active: false },
    { text: "Curso 3", active: false },
  ])

  const [currentModule, setCurrentModule] = useState(0)

  const dispatch = useAppDispatch()

  const setModule = (module: number) => {
    dispatch(onLoader(true))

    setTimeout(() => {
      setCurrentModule(module)
    }, 1000)

    setTimeout(() => {
      dispatch(onLoader(false))
    }, 2000)
  }

  return (
    <Layout
      headerProps={{
        returnAction: true,
        variant: "information",
        title: "Nombre del modulo",
      }}
      navCourse={true}
    >
      <VideoItem style={styles.video} url={modules[currentModule].video} />

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
              Modulo 1
            </Typography>
          </View>
        </View>
        <Typography
          color="ligth"
          variant="heading3"
          textAlign="left"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          {modules[currentModule].title}
        </Typography>
        <Typography
          color="ligth"
          variant="p2"
          textAlign="left"
          style={{ marginBottom: 20 }}
        >
          {modules[currentModule].description}
        </Typography>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            color="redPrimary"
            colorText="ligth"
            variant="sm"
            text="Anterior"
            disabled={currentModule === 0}
            style={{
              marginBottom: 30,
              width: 150,
              opacity: currentModule === 0 ? 0.5 : 1,
            }}
            onPress={() => setModule(currentModule - 1)}
            iconLeft
          />

          <Button
            color="redPrimary"
            colorText="ligth"
            variant="sm"
            text="Siguiente"
            disabled={currentModule === modules.length - 1}
            style={{
              marginBottom: 30,
              width: 150,
              opacity: currentModule === modules.length - 1 ? 0.5 : 1,
            }}
            onPress={() => setModule(currentModule + 1)}
            iconRight
          />
        </View>

        <Typography
          color="ligth"
          variant="p"
          textAlign="left"
          style={{ fontWeight: "bold", marginBottom: 20, marginTop: 20 }}
        >
          Descargables
        </Typography>
        <View style={styles.moduleList}>
          {[1,2].map((item) => (
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
                    Documento pdf
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
          Videos del modulo
        </Typography>

        <View style={{ marginBottom: 20 }}>
          {modules.map((item, index) => (
            <TouchableOpacity
              style={{
                ...styles.videos,
                borderColor:
                  currentModule === index
                    ? palette["redPrimary"]
                    : palette["ligth"],
              }}
              onPress={() => setModule(index)}
            >
              <Image
                style={styles.imageVideo}
                source={require("../../../../assets/images/mariana.jpg")}
              />
              <View>
                <Typography
                  variant="p2"
                  textAlign="left"
                  color="dark"
                  style={{ fontWeight: "bold" }}
                >
                  {item.title}
                </Typography>
                <Typography variant="p3" textAlign="left" color="grayText">
                  {item.duration} minutes
                </Typography>
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
