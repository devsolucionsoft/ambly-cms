import "react-native-gesture-handler"
import { StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import useCachedResources from "./src/hooks/useCachedResources"
import Navigation from "./src/navigation"
import store from "./src/store"
import { Provider } from "react-redux"
// components
import { Alert } from "./src/components/global"
// Store
import { useAppSelector } from "./src/store"
import { useFonts } from "expo-font"

const LayoutApp = () => {
  const alertState = useAppSelector((store) => store.Alert)

  return (
    <SafeAreaProvider>
      <Navigation />
      <Alert
        modalVisible={alertState.open}
        title={alertState.data.title}
        text={alertState.data.text}
        icon={alertState.data.icon}
      />
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
