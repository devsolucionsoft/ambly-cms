import React from "react"
import { View, ViewProps, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
// Theme
import AntDesign from "@expo/vector-icons/AntDesign"
import { palette } from "../../../utils/theme"
// Styles
import { styles } from "./Header.styles"
// Components
import { Typography } from ".."

interface HeaderProps {
  icon?: boolean
  title?: string
  returnAction?: boolean
  action?: Function
  variant?: "user" | "information"
}

type HeaderAttributes = HeaderProps & ViewProps

const Header = (props: HeaderAttributes) => {
  const { icon, title, returnAction, action, variant } = props

  const navigationHook = useNavigation()

  const handleAction = () => {
    returnAction && navigationHook.goBack()
    action && action()
  }

  return (
    <View {...props} style={styles.main}>
      {variant !== "user" && (
        <TouchableOpacity onPress={handleAction} style={styles.iconReturn}>
          <AntDesign name="left" color={palette["ligth"]} size={25} />
        </TouchableOpacity>
      )}

      <View>
        {icon && (
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={require("../../../../assets/images/icon-ambly.png")}
          />
        )}
        {title && (
          <Typography variant="heading3" color="ligth" textAlign="right">
            {title}
          </Typography>
        )}
      </View>
      <View style={styles.action}>
        {variant == "user" && (
          <TouchableOpacity style={styles.user}>
            <AntDesign name="user" size={25} color={palette["ligth"]} />
          </TouchableOpacity>
        )}
        {variant == "information" && (
          <TouchableOpacity style={styles.user}>
            <AntDesign name="questioncircleo" size={22} color={palette["ligth"]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Header
