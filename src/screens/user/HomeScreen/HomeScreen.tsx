import { useRef } from "react"
import { View, Dimensions } from "react-native"
// Styles compomponent
import { styles, stylesNew } from "./HomeScreen.styles"
import { palette, paletteGradient } from "../../../utils/theme"
import { LinearGradient } from "expo-linear-gradient"
import { FontAwesome5 } from "@expo/vector-icons"

import {
  ViewProps,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native"

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
import Carousel from "react-native-snap-carousel"
// COmponents
import { Typography, Button } from "../../../components/global"
const data = [
  {
    title: "Aenean leo",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: "https://picsum.photos/id/11/200/300",
  },
  {
    title: "In turpis",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: "https://picsum.photos/id/10/200/300",
  },
  {
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://picsum.photos/id/12/200/300",
  },
]

const HomeScreen = ({
  navigation,
  route,
}: DrawerkNavigationProps<UserStackParamList, "Home">) => {
  const navigateCourse = (id: number) => {
    navigation.navigate("CourseDetail", {
      id_course: id,
    })
  }

  const inputEl = useRef(null)

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
      <Tutors />
      <View style={styles.content}>
        <FavoriteTopics />
        <ContinueClasses />
      </View>
    </Layout>
  )
}

export default HomeScreen
