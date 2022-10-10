import { View, TouchableOpacity, ImageBackground } from "react-native"
// Styles compomponent
import { styles } from "./SIngress.styles"
// Types
import {
  StackNavigationProps,
  AuthStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Button, Header } from "../../../components/global"

const IngressScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Ingress">) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require("../../../../assets/images/background-screen.png")}
    >
      <Header icon returnAction />

      <View style={styles.content}>
        <Typography variant="heading2" textAlign="center" color="ligth">
          Crea una cuenta
        </Typography>
        <Typography variant="heading2" textAlign="center" color="ligth">
          {" "}
          para continuar
        </Typography>

        <View style={{ ...styles.containButtons, marginTop: 50 }}>
          <Button color="ligth" colorText="dark" variant="md" text="Google" />
          <Button
            color="ligth"
            colorText="dark"
            variant="md"
            text="Facebook"
          />
          <Button
            color="ligth"
            colorText="dark"
            variant="md"
            text="Apple ID"
          />
        </View>

        <Typography variant="heading2" textAlign="center" color="ligth">
          o
        </Typography>
        <View style={styles.containButtons}>
          <Button
            color="redPrimary"
            colorText="ligth"
            variant="md"
            text="Crear un correo electrónico"
            onPress={() =>
              navigation.navigate("Login", {
                action: "registry",
              })
            }
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Login", {
              action: "login",
            })
          }
        >
          <Typography
            variant="p"
            textAlign="center"
            color="ligth"
            textDecorationLine="underline"
          >
            Accede a tu cuenta
          </Typography>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default IngressScreen
