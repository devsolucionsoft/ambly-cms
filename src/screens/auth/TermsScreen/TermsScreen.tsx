import { ScrollView } from "react-native"
// Styles
import { styles } from "./TermsScreen.styles"
// Types
import {
  StackNavigationProps,
  AuthStackParamList,
} from "../../../navigation/types"
// Components
import { Typography, Header, Button } from "../../../components/global"
import { LoyoutAuth } from "../../../components/auth"

const TermsScreen = ({
  navigation,
  route,
}: StackNavigationProps<AuthStackParamList, "Terms">) => {
  return (
    <LoyoutAuth>
      <Header returnAction />
      <ScrollView style={styles.container}>
        <Typography color="ligth" textAlign="center" variant="heading3" style={{marginBottom: 20}}>
          Terminos y condiciones del servicio
        </Typography>
        <Typography color="grayText" textAlign="left" variant="p3" style={{marginBottom: 15}}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen.
        </Typography>
        <Typography color="grayText" textAlign="left" variant="p3" style={{marginBottom: 15}}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen.
        </Typography>
        <Button
          variant="lg"
          text="Aceptar"
          color="redPrimary"
          colorText="ligth"
          style={{marginTop: 40}}
          onPress={() => navigation.navigate("Registry", {
            check: true
          })}
        />

      </ScrollView>
    </LoyoutAuth>
  )
}

export default TermsScreen
