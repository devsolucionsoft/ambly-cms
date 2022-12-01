import { useState, useEffect, useCallback, useMemo } from "react"
import "react-native-gesture-handler"
import { StatusBar, View, Animated, StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Navigation from "./src/navigation"
import store from "./src/store"
import { Provider } from "react-redux"
import * as SplashScreen from "expo-splash-screen"
import { Asset } from "expo-asset"
import { LinearGradient } from "expo-linear-gradient"
import * as Font from "expo-font"
import { useFonts } from "expo-font"

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const LayoutApp = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  )
}

export default function App() {
  useFonts({
    poppins: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    inter: require("./assets/fonts/Inter/static/Inter-Medium.ttf"),
  })
  
  return (
    <Provider store={store}>
      <AnimatedAppLoader image={{ uri: "https://i.imgur.com/U1aNgeU.png" }}>
        <LayoutApp />
      </AnimatedAppLoader>
    </Provider>
  )
}

function AnimatedAppLoader({ children, image }: any) {
  const [isSplashReady, setSplashReady] = useState(false)
  
  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri).downloadAsync()
      setSplashReady(true)
    }

    prepare()
  }, [image])

  if (!isSplashReady) {
    return null
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}

function AnimatedSplashScreen({ children, image }: any) {
  const animation = useMemo(() => new Animated.Value(1), [])
  const scale = useMemo(() => new Animated.Value(1), [])

  const [isAppReady, setAppReady] = useState(false)
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))

      Animated.timing(scale, {
        toValue: 0.8,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))
    }
  }, [isAppReady])

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync()
      await Promise.all([])
    } catch (e) {
    } finally {
      setAppReady(true)
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: animation,
            },
          ]}
        >
          <LinearGradient
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
            colors={["#101010", "#343434"]}
          >
            <Animated.Image
              style={{
                width: "50%",
                height: 100,
                resizeMode: "contain",
                transform: [
                  {
                    scale: scale,
                  },
                ],
              }}
              source={image}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  )
}
