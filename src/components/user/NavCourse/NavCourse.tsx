import React from "react"
import { View, TouchableOpacity } from "react-native"
// Theme
import { palette } from "../../../utils/theme"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
// Styles
import { styles } from "./NavCourse.styles"
import { navigateUser } from "../../../navigation/actions"

interface NavCourseProps {
  page?: "HomeScreen" | "MyCourses"
}

const NavCourse = (props: NavCourseProps) => {
  const {} = props

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.itemNav}
        onPress={() => navigateUser("Home")}
      >
        <Feather name="home" size={25} color={palette["redPrimary"]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemNav}
        onPress={() => navigateUser("MyCourses")}
      >
        <Feather name="book-open" size={25} color={palette["redPrimary"]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemNav}
        onPress={() => navigateUser("MyAccount")}
      >
        <FontAwesome5
          name="user-circle"
          size={25}
          color={palette["redPrimary"]}
        />
      </TouchableOpacity>
    </View>
  )
}

export default NavCourse
