import "react-native-gesture-handler"
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"

import useCachedResources from "./src/hooks/useCachedResources"
import Navigation from "./src/navigation"

import store from "./src/store"
import { Provider } from "react-redux"

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    )
  }
}
