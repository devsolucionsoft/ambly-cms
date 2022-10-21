import React from "react"
import { View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { DrawerActions } from "@react-navigation/native"
import {
  DrawerkNavigationProps,
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
import { navigateUser } from "../../../navigation/actions"
// Styles
import { styles } from "./DrawerNatigation.styles"
// Components
import { Button, Header } from "../../global"
import { DrawerContentComponentProps } from '@react-navigation/drawer'

const DrawerNatigation = ({state, navigation, descriptors}:DrawerContentComponentProps) => {
  return (
    <View style={styles.main}>
      <Header action={() => navigation.closeDrawer()} title="Menú" />
      <SafeAreaView style={styles.content}>
        <View>
          <Button
            variant="lg"
            text="Home"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigate("home")}
          />
          <Button
            variant="lg"
            text="Mis cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigate("MyCourses")}
          />
          <Button
            variant="lg"
            text="Escoger cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigate("ManyCourses")}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DrawerNatigation
