import "react-native-gesture-handler"
import { StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import useCachedResources from "./src/hooks/useCachedResources"
import Navigation from "./src/navigation"
import store from "./src/store"
import { Provider } from "react-redux"
import { useFonts } from "expo-font"

const LayoutApp = () => {


  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    poppins: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
  })

  if (!fontsLoaded) {
    return null
  } else {
    return (
      <Provider store={store}>
        <LayoutApp />
      </Provider>
    )
  }
}
