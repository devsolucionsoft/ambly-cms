import { useEffect, useState } from "react"
import { View, ImageBackground, Pressable } from "react-native"
import Swiper from "react-native-swiper"
// Styles
import { styles } from "./StartScreen.styles"
// Types
import {
  StackNavigationProps,
  AuthStackParamList,
} from "../../../../src/navigation/types"
// Components
import { Typography, Button } from "../../../components/global"
import { LoyoutAuth } from "../../../components/auth"
// Api
import { ConfigApi } from "../../../api"
import { loop } from "react-native-reanimated/lib/types/lib/reanimated2/animation/repeat"

const StartScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Start">) => {
  const [splash, setSplash] = useState([])
  const ConfigApiModel = new ConfigApi()

  const [run, setRun] = useState(true)

  useEffect(() => {
    ;(async () => {
      const response = await ConfigApiModel.Splash()
      response.status == 200 && setSplash(response.data)
    })()
  }, [])

  const renderPagination = (current: number, total: number) => {
    return (
      <View style={styles.swiperPagination}>
        {Array(total)
          .fill(0)
          .map((item: any, index: number) => (
            <View
              key={index}
              style={{
                ...styles.swiperPaginationItem,
                backgroundColor: current === index ? "#FFFFFF" : "#787878",
              }}
            />
          ))}
      </View>
    )
  }

  return (
    <LoyoutAuth style={styles.container}>
      <View style={styles.swiper}>
        <Swiper renderPagination={renderPagination} loop={true} autoplay={run} autoplayTimeout={5}>
          {splash.map((item: any) => (
            <Pressable key={item.createdAt} style={styles.swiperItem} onPressIn={() => {
              //setRun(!run)
            }}>
              <ImageBackground
                style={styles.image}
                source={require("../../../../assets/images/start-login.png")}
              />
              <View style={styles.swiperContent}>
                <Typography variant="h5" textAlign="center" color="ligth">
                  {item.title}
                </Typography>
                <Typography variant="p16" textAlign="center" color="grayText" style={{marginTop: 10}}>
                  {item.description}
                </Typography>
              </View>
            </Pressable>
          ))}
          {splash.map((item: any) => (
            <Pressable key={item.createdAt} style={styles.swiperItem} 
            onPressIn={() => {
              //setRun(!run)
            }}>
              <ImageBackground
                style={styles.image}
                source={require("../../../../assets/images/start-login.png")}
              />
              <View style={styles.swiperContent}>
                <Typography variant="h5" textAlign="center" color="ligth">
                  {item.title}
                </Typography>
                <Typography variant="p16" textAlign="center" color="grayText" style={{marginTop: 10}}>
                  {item.description}
                </Typography>
              </View>
            </Pressable>
          ))}
        </Swiper>
      </View>
      <View style={styles.content}>
        <View>
          <Button variant="sm" text="EXPLORAR" color="ligth" colorText="dark"  onPress={() => navigation.navigate("Explore")} />
          <Button
            variant="sm"
            text="INGRESAR"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigate("Ingress")}
          />
        </View>
      </View>
    </LoyoutAuth>
  )
}

export default StartScreen
