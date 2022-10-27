import { useEffect, useState } from "react"
import { View, ImageBackground } from "react-native"
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
// Api
import { ConfigApi } from "../../../api"

const StartScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Start">) => {
  const [splash, setSplash] = useState([])
  const ConfigApiModel = new ConfigApi()

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
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper renderPagination={renderPagination} loop={false}>
          {splash.map((item: any) => (
            <View key={item.createdAt} style={styles.swiperItem}>
              <ImageBackground
                style={styles.image}
                source={require("../../../../assets/images/start-login.png")}
              />
              <View style={styles.swiperContent}>
                <Typography variant="heading" textAlign="center" color="ligth">
                  {item.title}
                </Typography>
                <Typography variant="p" textAlign="center" color="ligth">
                  {item.description}
                </Typography>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.content}>
        <View>
          <Button variant="lg" text="EXPLORAR" color="ligth" colorText="dark" />
          <Button
            variant="lg"
            text="INGRESAR"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigate("Ingress")}
          />
        </View>
      </View>
    </View>
  )
}

export default StartScreen
