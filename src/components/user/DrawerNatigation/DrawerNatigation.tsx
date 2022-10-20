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
import { DrawerNavigationOptions } from '@react-navigation/drawer'

const DrawerNatigation = (navigation:any) => {
  return (
    <View style={styles.main}>
      <Header action={() => navigation.navigation.closeDrawer()} title="Menú" />
      <SafeAreaView style={styles.content}>
        <View>
          <Button
            variant="lg"
            text="Home"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigation.navigate("Home")}
          />
          <Button
            variant="lg"
            text="Mis cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigation.navigate("MyCourses")}
          />
          <Button
            variant="lg"
            text="Mis cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigation.navigate("ManyCourses")}
          />
          <Button
            variant="lg"
            text="Escoge cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigation.navigate("ChooseCourses")}
          />
          <Button
            variant="lg"
            text="CheckIn"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigation.navigate("CheckIn")}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DrawerNatigation
