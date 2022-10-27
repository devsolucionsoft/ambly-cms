import {
  View,
} from "react-native"
// Styles compomponent
import { styles } from "./HomeScreen.styles"
// Types
import {
  DrawerkNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import {
  SliderCourses,
  FavoriteTopics,
  ContinueClasses,
  Layout,
} from "../../../components/user"

const HomeScreen = ({
  navigation,
  route,
}: DrawerkNavigationProps<UserStackParamList, "Home">) => {

  return (
    <Layout headerProps={{ icon: true, variant: "user" }}>
      {/* Popular courses */}

      <SliderCourses variant="next" />

      {/* Popular courses */}
      <View style={styles.content}>
        <SliderCourses variant="new" header title="Nuevos cursos" />
        <SliderCourses variant="popular" header title="Cursos populares" />
        <FavoriteTopics />

        <ContinueClasses />
      </View>
    </Layout>
  )
}

export default HomeScreen
