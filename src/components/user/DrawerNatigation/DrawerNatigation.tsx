import React from "react"
import { View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { useNavigation } from "@react-navigation/native"
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

const DrawerNatigation = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.main}>
      <Header action={() => false} />
      <SafeAreaView style={styles.content}>
        <View>
          <Button
            variant="lg"
            text="Home"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigateUser("Home")}
          />
          <Button
            variant="lg"
            text="Mis cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigateUser("ManyCourses")}
          />
          <Button
            variant="lg"
            text="Escoge cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigateUser("ChooseCourses")}
          />
          <Button
            variant="lg"
            text="CheckIn"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigateUser("CheckIn")}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DrawerNatigation
