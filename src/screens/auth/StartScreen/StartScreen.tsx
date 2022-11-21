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
      <Pressable style={styles.swiper}>
        {({ pressed }) => (
          <Swiper
            renderPagination={renderPagination}
            loop={true}
            autoplay={!pressed}
            autoplayTimeout={4}
            
          >
            {[1, 2, 3].map((item: any) => (
              <View key={item.createdAt} style={styles.swiperItem}>
                <ImageBackground
                  style={styles.image}
                  source={require("../../../../assets/images/start-login.png")}
                />
                <View style={styles.swiperContent}>
                  <Typography variant="h5" textAlign="center" color="ligth">
                    {"Lorem Ipsum es simplemente el texto"}
                  </Typography>
                  <Typography
                    variant="p16"
                    textAlign="center"
                    color="grayText"
                    style={{ marginTop: 10 }}
                  >
                    {
                      "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto"
                    }
                  </Typography>
                </View>
              </View>
            ))}
          </Swiper>
        )}
      </Pressable>
      <View style={styles.content}>
        <View>
          <Button
            variant="sm"
            text="EXPLORAR"
            color="ligth"
            colorText="dark"
            onPress={() => navigation.navigate("Explore")}
          />
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
