import { View } from "react-native"
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
  Tutors,
  Layout,
} from "../../../components/user"

const HomeScreen = ({
  navigation,
  route,
}: DrawerkNavigationProps<UserStackParamList, "Home">) => {
  

  const navigateCourse = (id: number) => {
    navigation.navigate("CourseDetail", {
      id_course: id,
    })
  }

  return (
    <Layout headerProps={{ icon: true, variant: "user" }}>
      {/* Popular courses */}

      <SliderCourses
        variant="next"
        arrayItems={[]}
        navigateToCourse={navigateCourse}
      />

      {/* Popular courses */}
      <View style={styles.content}>
        <SliderCourses
          variant="new"
          header
          title="Cursos populares"
          navigateToCourse={navigateCourse}
        />
        <SliderCourses
          variant="popular"
          header
          title="Trailers"
          navigateToCourse={navigateCourse}
        />
        <Tutors />
        <FavoriteTopics />
        <ContinueClasses />
      </View>
    </Layout>
  )
}

export default HomeScreen
