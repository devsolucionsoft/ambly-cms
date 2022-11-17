import React, { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { navigateUser } from "../../../navigation/actions"
// Styles
import { styles } from "./DrawerNatigation.styles"
// Components
import { Button, Header, Typography, ModalForgotPassword } from "../../global"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import {
  AntDesign,
  Feather,
  Fontisto,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons"

const DrawerNatigation = ({
  state,
  navigation,
  descriptors,
}: DrawerContentComponentProps) => {
  const [loading, setLoading] = useState(false)
  const [modalForgotPassword, setModalForgotPassword] = useState(false)

  const forgotPasswordResponse = (response: any) => {
    setTimeout(() => {
      //dispatch(openAlert(response))
    }, 400)
  }

  return (
    <View style={styles.main}>
      <Header action={() => navigation.closeDrawer()} title="Menú" />
      <SafeAreaView style={styles.content}>
        <View>
          <ModalForgotPassword
            modalVisible={modalForgotPassword}
            setModalVisible={(value: boolean) => setModalForgotPassword(value)}
            ForgotPasswordResponse={forgotPasswordResponse}
          />
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("MyCourses")}
          >
            <AntDesign name="play" size={22} color="white" />
            <Typography
              variant="p3"
              color="ligth"
              textAlign="left"
              style={{ marginTop: 3, marginLeft: 20 }}
            >
              Mis cursos
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigateUser("MyAccount")}
          >
            <Feather name="user" size={22} color="white" />
            <Typography
              variant="p3"
              color="ligth"
              textAlign="left"
              style={{ marginTop: 3, marginLeft: 20 }}
              
            >
              Mi perfil
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => setModalForgotPassword(true)}>
            <Feather name="help-circle" size={22} color="white" />
            <Typography
              variant="p3"
              color="ligth"
              textAlign="left"
              style={{ marginTop: 3, marginLeft: 20 }}
            >
              Cambiar contraseña
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Feather name="help-circle" size={22} color="white" />
            <Typography
              variant="p3"
              color="ligth"
              textAlign="left"
              style={{ marginTop: 3, marginLeft: 20 }}
            >
              Ayuda y soporte
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Fontisto name="world-o" size={22} color="white" />
            <Typography
              variant="p3"
              color="ligth"
              textAlign="left"
              style={{ marginTop: 3, marginLeft: 20 }}
            >
              Términos y condiciones
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <MaterialIcons name="local-police" size={22} color="white" />
            <Typography
              variant="p3"
              color="ligth"
              textAlign="left"
              style={{ marginTop: 3, marginLeft: 20 }}
            >
              Políticas de privacidad
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="exit-outline" size={22} color="white" />
            <Typography
              variant="p3"
              color="ligth"
              textAlign="left"
              style={{ marginTop: 3, marginLeft: 20 }}
            >
              Cerrar sesión
            </Typography>
          </TouchableOpacity>
          {/*<Button
            variant="lg"
            text="Escoger cursos"
            color="redPrimary"
            colorText="ligth"
            onPress={() => navigation.navigate("ManyCourses")}
  />*/}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DrawerNatigation
