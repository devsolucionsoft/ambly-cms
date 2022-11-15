import React, { useState, useRef } from "react"
import { View, ViewProps, TouchableOpacity } from "react-native"
import * as ScreenOrientation from "expo-screen-orientation"
import { AntDesign } from "@expo/vector-icons"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
// Styles
import { styles } from "./VideoItem.styles"
// Components
import { Typography } from "../../global"
import { Video, ResizeMode } from "expo-av"

interface VideoProps {}

type VideoAttributes = VideoProps & ViewProps

const VideoItem = (props: VideoAttributes) => {
  const { style } = props

  const parseStyle = typeof style === "object" ? style : {}

  const video = useRef<any>(null)
  const [status, setStatus] = useState<any>({})
  const [orientationLock, setOrientationLock] = useState<
    "PORTRAIT" | "LANDSCAPE_RIGHT"
  >("PORTRAIT")


  const changeScreenOrientation = async (status: any) => {
    if (status.fullscreenUpdate === 1) {
      setOrientationLock("LANDSCAPE_RIGHT")
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      )
    }
    if (status.fullscreenUpdate === 2) {
      setOrientationLock("PORTRAIT")
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      )
    }
  }

  return (
    <View style={{ ...styles.main }}>
      <Video
        ref={video}
        style={{ ...parseStyle }}
        source={{
          uri: "https://joy.videvo.net/videvo_files/video/free/video0455/large_watermarked/_import_6091143fc4c4b6.26692621_preview.mp4",
        }}
        isLooping={false}
        useNativeControls={status.isPlaying}
        resizeMode={
          orientationLock === "PORTRAIT" ? ResizeMode.COVER : ResizeMode.CONTAIN
        }
        onFullscreenUpdate={(status) => changeScreenOrientation(status)}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {!status.isPlaying && (
        <View style={{ ...styles.layer }}>
          <TouchableOpacity
            onPress={() => {
              video.current.presentFullscreenPlayer()
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }}
          >
            <AntDesign name="play" size={70} color="#DDB63D" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default VideoItem
