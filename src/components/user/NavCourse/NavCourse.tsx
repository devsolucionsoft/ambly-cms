import React from "react"
import { View, TouchableOpacity } from "react-native"
// Theme
import { palette, paletteTypes } from "../../../utils/theme"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
// Styles
import { styles } from "./NavCourse.styles"
// Components
import { Typography } from "../../global"

interface NavCourseProps {
  page?: "HomeScreen" | "MyCourses" | ".."
}

const NavCourse = (props: NavCourseProps) => {
  const {} = props

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.itemNav}>
        <Feather name="home" size={25} color={palette["redPrimary"]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemNav}>
        <Feather name="book-open" size={25} color={palette["redPrimary"]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemNav}>
        <FontAwesome5 name="user-circle" size={25} color={palette["redPrimary"]} />
      </TouchableOpacity>
    </View>
  )
}

export default NavCourse
