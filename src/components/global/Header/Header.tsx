import React from "react"
import { View, ViewProps, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { navigateUser } from "../../../navigation/actions"
// Theme
import AntDesign from "@expo/vector-icons/AntDesign"
import { SimpleLineIcons } from "@expo/vector-icons"
import { palette, paletteGradient } from "../../../utils/theme"
import { navigationBack } from "../../../navigation/actions"
import { Entypo } from '@expo/vector-icons';
// Styles
import { styles } from "./Header.styles"
// Components
import { Typography } from ".."

export interface HeaderProps {
  icon?: boolean
  title?: string
  returnAction?: boolean
  action?: Function
  variant?: "user" | "information"
  fixed?: boolean
}

const Header = (props: HeaderProps) => {
  const { icon, title, returnAction, action, variant, fixed } = props

  const navigationHook = useNavigation<any>()

  const handleAction = () => {
    returnAction && navigationBack()
    action && action()
  }

  return (
    <LinearGradient
      colors={paletteGradient.gradientOpacity}
      {...props}
      style={{
        ...styles.main,
        ...() =>
          fixed
            ? {
                position: "fixed",
                top: 0,
              }
            : {},
      }}
    >
      {variant == "user" && (
        <TouchableOpacity
          onPress={() => navigationHook.openDrawer()}
          style={styles.iconMenu}
        >
          <Entypo name="menu" size={35} color={palette["ligth"]} />
        </TouchableOpacity>
      )}
      {variant !== "user" && (
        <TouchableOpacity onPress={handleAction} style={styles.iconReturn}>
          <AntDesign name="left" color={palette["ligth"]} size={25} />
        </TouchableOpacity>
      )}

      <View style={{ alignItems: "center" }}>
        {icon && (
          <TouchableOpacity onPress={() => navigateUser("Home")}>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require("../../../../assets/images/icon-ambly.png")}
            />
          </TouchableOpacity>
        )}
        {title && (
          <Typography
            variant="p19"
            color="ligth"
            textAlign="center"
            style={{ width: "100%", fontWeight: "600" }}
          >
            {title}
          </Typography>
        )}
      </View>
      <View style={styles.action}>
        {variant == "user" && (
          <TouchableOpacity
            style={styles.user}
            onPress={() => navigateUser("MyAccount")}
          >
            <AntDesign name="user" size={25} color={palette["ligth"]} />
          </TouchableOpacity>
        )}
        {variant == "information" && (
          <TouchableOpacity style={styles.user}>
            <AntDesign
              name="questioncircleo"
              size={22}
              color={palette["ligth"]}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  )
}

export default Header
