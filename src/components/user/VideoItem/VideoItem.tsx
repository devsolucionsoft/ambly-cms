import React, { useState, useRef, useEffect } from "react"
import { View, ViewProps, TouchableOpacity } from "react-native"
import * as ScreenOrientation from "expo-screen-orientation"
import { AntDesign } from "@expo/vector-icons"
import { styles } from "./VideoItem.styles"
import { Video, ResizeMode } from "expo-av"
import Slider from "@react-native-community/slider"
// Api
import { CourseApi } from "../../../api"

interface VideoProps {
  url?: string
  saved?: boolean
  moduleId?: any
  videoId?: any
  startTime?: any
}

const defaultUrl =
  "https://joy.videvo.net/videvo_files/video/free/video0455/large_watermarked/_import_6091143fc4c4b6.26692621_preview.mp4"

type VideoAttributes = VideoProps & ViewProps

const VideoItem = (props: VideoAttributes) => {
  const { style, url, saved, moduleId, videoId, startTime } = props
  const CourseApiModel = new CourseApi()
  const video = useRef<any>(null)

  const parseStyle = typeof style === "object" ? style : {}

  const [currentVideoTime, setCurrentVideoTime] = useState(startTime)
  const [currentStatus, setCurrentStatus] = useState<any>({})
  const [orientationLock, setOrientationLock] = useState<
    "PORTRAIT" | "LANDSCAPE_RIGHT"
  >("PORTRAIT")

  useEffect(() => {
    setCurrentVideoTime(parseInt(startTime))
  }, [startTime])

  useEffect(() => {
    if (saved && currentStatus.positionMillis !== 0) {
      ;(async () => {
        await CourseApiModel.saveVideoTrailer({
          time_seen: currentStatus.positionMillis,
          modules_id: moduleId,
          video_id: videoId,
        })
      })()
    }
  }, [currentStatus.positionMillis])

  useEffect(() => {
    if (currentStatus.isPlaying) {
      setCurrentVideoTime(currentStatus.positionMillis)
    }
  }, [currentStatus.isPlaying])

  const changeScreenOrientation = async (localStatus: any) => {
    if (localStatus.fullscreenUpdate === 1) {
      setOrientationLock("LANDSCAPE_RIGHT")
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      )
    }
    if (localStatus.fullscreenUpdate === 2) {
      setOrientationLock("PORTRAIT")
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      )
    }
  }

  useEffect(() => {
    currentStatus.isPlaying && setCurrentVideoTime(currentStatus.positionMillis)
    orientationLock === "PORTRAIT" && video.current.pauseAsync()
    setTimeout(() => {
      orientationLock === "LANDSCAPE_RIGHT" && video.current.playAsync()
    }, 500)
  }, [orientationLock])

  return (
    <View style={{ ...styles.main }}>
      <Video
        ref={video}
        style={{ ...parseStyle }}
        source={{
          uri: url ? url : defaultUrl,
        }}
        isLooping={false}
        progressUpdateIntervalMillis={3000}
        resizeMode={
          orientationLock === "PORTRAIT" ? ResizeMode.COVER : ResizeMode.CONTAIN
        }
        positionMillis={currentVideoTime}
        onFullscreenUpdate={(status) => changeScreenOrientation(status)}
        onPlaybackStatusUpdate={(status) => setCurrentStatus(status)}
      />

      <View style={{ ...styles.layer }}>
        <TouchableOpacity
          onPress={() => {
            video.current.presentFullscreenPlayer()
          }}
        >
          <AntDesign name="play" size={70} color="#DDB63D" />
        </TouchableOpacity>
        <Slider
          style={{
            width: "100%",
            height: 10,
            marginBottom: 5,
            position: "absolute",
            bottom: 0,
          }}
          minimumValue={0}
          maximumValue={currentStatus.durationMillis}
          disabled={true}
          value={
            currentStatus.isPlaying
              ? currentStatus.positionMillis
              : currentVideoTime
          }
          minimumTrackTintColor="#FF3437"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FF3437"
        />
      </View>
    </View>
  )
}

export default VideoItem
