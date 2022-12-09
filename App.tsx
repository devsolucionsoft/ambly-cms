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
import { Video, ResizeMode } from "expo-av"

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
    Poppins: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    Inter: require("./assets/fonts/Inter/static/Inter-Medium.ttf"),
  })

  return (
    <Provider store={store}>
      <AnimatedAppLoader image={{ uri: "https://i.imgur.com/2v8cMRN.gif" }}>
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
  const animation: any = useMemo(() => new Animated.Value(0), [])
  const scale = useMemo(() => new Animated.Value(1), [])

  const [isAppReady, setAppReady] = useState(false)
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 800,
        delay: 5000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(false))

      Animated.timing(scale, {
        toValue: 0.6,
        duration: 600,
        useNativeDriver: true,
      }).start()
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
      {!isSplashAnimationComplete && (
        <LinearGradient
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              height: "100%",
              width: "100%",
            },
          ]}
          colors={["#101010", "#343434"]}
        >
          <Video
            style={{ height: "100%", width: "100%" }}
            useNativeControls={false}
            source={require("./assets/animations/splash.mp4")}
            isLooping={false}
            shouldPlay={true}
            resizeMode={ResizeMode.COVER}
            onLoad={() => onImageLoaded()}
          />
        </LinearGradient>
      )}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: animation,
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  )
}
