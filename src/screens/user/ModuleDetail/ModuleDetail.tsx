import { useState, useRef, useEffect } from "react"
import { View, TouchableOpacity, Image } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import { WebView } from "react-native-webview"

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
import { useAppSelector, useAppDispatch } from "../../../store"
import { onLoader } from "../../../store/Loader/actions"

const ModuleDetailScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "ModuleDetail">) => {
  // Store
  const courseInfo = useAppSelector((store) => store.User.selectCourse)
  const dispatch = useAppDispatch()

  const [currentModule, setCurrentModule] = useState(0)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [currentVideoTime, setCurrentVideoTime] = useState(0)

  const [disableNext, setDisableNext] = useState(false)
  const [disablePrev, setDisablePrev] = useState(false)

  // Efecto para actualizar el state con los parametros recividos
  useEffect(() => {
    setCurrentModule(route.params?.module)
    setCurrentVideo(route.params?.video)
  }, [route.params])

  // Efecto para desactivar los botones prev/next cuando lleguen al primer y ultimo video
  useEffect(() => {
    const idVideo = courseInfo.modules[currentModule].videos[currentVideo].id
    // Buscar progreso de video seleccionado dentro de las lista de save
    const saved = courseInfo.modules[currentModule].save.find(
      (item: any) => item.videos.id === idVideo
    )
    // En caso de que encuentre un progreso edita el tiempo de vista cuando se cambia el video
    saved ? setCurrentVideoTime(saved.time_seen) : setCurrentVideoTime(0)

    // Condicion para habilitar y desahabilitar el boton de next
    if (
      currentVideo === courseInfo.modules[currentModule].videos.length - 1 &&
      currentModule === courseInfo.modules.length - 1
    ) {
      setDisableNext(true)
    } else {
      setDisableNext(false)
    }
    // Condicion para habilitar y desahabilitar el boton de prev
    if (currentVideo === 0 && currentModule === 0) {
      setDisablePrev(true)
    } else {
      setDisablePrev(false)
    }
  }, [currentModule, currentVideo])

  // Animacion de cambio de modulo
  const setModule = (module: number) => {
    dispatch(onLoader(true))
    setTimeout(() => {
      setCurrentModule(module)
    }, 1000)
    setTimeout(() => {
      dispatch(onLoader(false))
    }, 2000)
  }

  // Cambiar video actual
  const setVideo = (video: number) => {
    // Activar loader
    dispatch(onLoader(true))
    // Video proximo
    if (video > currentVideo) {
      // Comprobar si el video es el ultimo del modulo.
      if (video === courseInfo.modules[currentModule].videos.length) {
        // En caso de que sí se pasa al siguiente modulo en el video 0
        setCurrentVideo(0)
        setModule(currentModule + 1)
      } else {
        // En caso de que no se pasa el siguiente video del modulo
        setTimeout(() => {
          setCurrentVideo(video)
        }, 1000)
      }
    }
    // Video previo
    if (video < currentVideo) {
      // Comprobar si el video es el primero del modulo.
      if (video < 0) {
        // En caso de que sí se pasa al modulo anterior en su ultimo video
        setCurrentVideo(0)
        setModule(currentModule - 1)
      } else {
        // En caso de que no se pasa el video anterior del modulo
        setTimeout(() => {
          setCurrentVideo(video)
        }, 1000)
      }
    }
    // Desactivar loader
    setTimeout(() => {
      dispatch(onLoader(false))
    }, 2000)
  }

  const handleNavigateVideo = (module: number, video: number) => {
    setVideo(0)
    setModule(module)
    setVideo(video)
  }

  useEffect(() => {
    /*Sharing.isAvailableAsync().then((available) => {
      if (available) {
        console.log("Sharing is available")
      } else {
        console.log("Sharing is NOT available")
      }
    })*/
  }, [])

  const callback = (downloadProgress: any) => {
    /*const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite
    console.log(progress)*/
  }

  const handleDownload = async (uri: string) => {
    /*console.log("handleDownload")

    const downloadResumable = FileSystem.createDownloadResumable(
      "https://www.proturbiomarspa.com/files/_pdf-prueba.pdf",
      FileSystem.documentDirectory + "pdf-prueba.pdf",
      {},
      callback
    )

    try {
      const { uri }: any = await downloadResumable.downloadAsync()
      console.log("Finished downloading to ", uri)
      Sharing.shareAsync(uri)
    } catch (e) {
      console.error(e)
    }*/
  }

  return (
    <Layout
      headerProps={{
        action: () => {
          navigation.navigate("CourseDetail", {
            id_course: courseInfo.id,
          })
        },
        returnAction: false,
        variant: "information",
        title: "Nombre del modulo",
      }}
      navCourse={true}
    >
      <WebView
        style={{ height: 0, width: "100%" }}
        source={{
          uri: "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540solucionsoft%252Fambly-app/pdf-prueba.pdf",
        }}
      />
      <VideoItem
        style={styles.video}
        url={courseInfo.modules[currentModule].videos[currentVideo].video}
        saved={true}
        moduleId={courseInfo.modules[currentModule].id}
        videoId={courseInfo.modules[currentModule].videos[currentVideo].id}
        startTime={currentVideoTime}
      />

      {/* Content courseInfo.modules */}
      <View style={styles.content}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={styles.beagle}>
            <Typography
              color="ligth"
              variant="p3"
              textAlign="left"
              style={{ fontWeight: "bold" }}
            >
              Modulo {currentModule + 1}
            </Typography>
          </View>
        </View>
        <Typography
          color="ligth"
          variant="heading3"
          textAlign="left"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          {courseInfo.modules[currentModule].name_module}
        </Typography>
        <Typography
          color="ligth"
          variant="p2"
          textAlign="left"
          style={{ marginBottom: 20 }}
        >
          {courseInfo.modules[currentModule].description}
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
            disabled={disablePrev}
            style={{
              marginBottom: 30,
              width: 150,
              opacity: disablePrev ? 0.5 : 1,
            }}
            onPress={() => setVideo(currentVideo - 1)}
            iconLeft={true}
          />

          <Button
            color="redPrimary"
            colorText="ligth"
            variant="sm"
            text="Siguiente"
            disabled={disableNext}
            style={{
              marginBottom: 30,
              width: 150,
              opacity: disableNext ? 0.5 : 1,
            }}
            onPress={() => setVideo(currentVideo + 1)}
            iconRight={true}
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
          {courseInfo.modules[currentModule].file.map((item: any) => (
            <TouchableOpacity
              style={styles.downloadable}
              onPress={() => handleDownload(item.link_file)}
            >
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
                    {item.name_file}
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
          {courseInfo.modules[currentModule].videos.map(
            (item: any, index: number) => (
              <TouchableOpacity
                style={[
                  styles.videos,
                  {
                    borderColor:
                      currentVideo === index
                        ? palette["redPrimary"]
                        : palette["ligth"],
                  },
                ]}
                onPress={() => setVideo(index)}
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
                    {item.name_video}
                  </Typography>
                  <Typography variant="p3" textAlign="left" color="grayText">
                    {item.duration} minutes
                  </Typography>
                </View>
              </TouchableOpacity>
            )
          )}
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
          {courseInfo.modules.map((item: any, index: number) => (
            <AccordionItem
              title={item.name_module}
              duration={item.time_module}
              description={item.description}
              videos={item.videos}
              activeItem={index === currentModule && currentVideo}
              handleNavigateVideo={(video: number) =>
                handleNavigateVideo(index, video)
              }
            />
          ))}
        </View>
      </View>
    </Layout>
  )
}

export default ModuleDetailScreen
