import { useEffect, useRef } from "react"
import { View } from "react-native"
// Styles compomponent
import { styles } from "./HomeScreen.styles"
// Types
import { UserApi } from "../../../api"
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
// Store
import { useAppSelector, useAppDispatch } from "../../../store"
import { loadCourses } from "../../../store/User/actions"

const UserpiModel = new UserApi()

const HomeScreen = ({
  navigation,
  route,
}: DrawerkNavigationProps<UserStackParamList, "Home">) => {
  const navigateCourse = (id: number) => {
    navigation.navigate("CourseDetail", {
      id_course: id,
    })
  }

  const dispatch = useAppDispatch()
  const userAuth = useAppSelector((store) => store.Auth)

  useEffect(() => {
    ;(async () => {
      if (userAuth.user.id) {
        const response = await UserpiModel.GetMyCourses(userAuth.user.id)
        response.status === 200 && dispatch(loadCourses(response.data.courses))
      }
    })()
  }, [])

  return (
    <Layout headerProps={{ icon: true, variant: "user" }}>
      {/* Popular courses */}
      <SliderCourses
        variant="next"
        arrayItems={[]}
        navigateToCourse={navigateCourse}
      />

      <SliderCourses
        variant="new"
        header
        title="Populares"
        navigateToCourse={navigateCourse}
      />
      <SliderCourses
        variant="popular"
        header
        title="Trailers"
        navigateToCourse={navigateCourse}
      />

      {/* Popular courses */}
      <Tutors handlePress={(id:any) => navigation.navigate("ProfessorDetail")} />
      <View style={styles.content}>
        <FavoriteTopics />
        <ContinueClasses />
      </View>
    </Layout>
  )
}

export default HomeScreen
