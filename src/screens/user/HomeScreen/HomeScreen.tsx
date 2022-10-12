import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
// Styles compomponent
import { styles } from "./HomeScreen.styles"
// Types
import {
  DrawerkNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
import { navigateUser } from "../../../navigation/actions";
// UI Components
import { Typography, Header, Divider } from "../../../components/global"
import {
  SliderCourses,
  FavoriteTopics,
  ContinueClasses,
  ButtonAction
} from "../../../components/user"

const HomeScreen = ({
  navigation,
  route,
}: DrawerkNavigationProps<UserStackParamList, "Home">) => {

  setTimeout(() => {
    navigateUser("ManyCourses")
  }, 500);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require("../../../../assets/images/background-screen.png")}
    >
      <Header icon variant="user" />

      <ScrollView>
        {/* Popular courses */}
        <View style={styles.content}>
          <Typography variant="heading2" textAlign="center" color="ligth">
            Cursos Populares
          </Typography>
          <Typography variant="heading3" textAlign="center" color="ligth">
            No te pierdas los mejores cursos de la academia
          </Typography>
          <SliderCourses variant="popular" />
        </View>

        {/* Popular courses */}
        <View style={styles.content}>
          <Typography variant="heading2" textAlign="left" color="ligth">
            Nuevos cursos
          </Typography>
          <SliderCourses variant="new" />
        </View>

        <Divider width="100%" boder={1} color="ligth" marginBottom={20} />

        {/* Popular courses */}
        <View style={styles.content}>
          <Typography variant="heading2" textAlign="left" color="ligth">
            Próximos cursos
          </Typography>
          <SliderCourses variant="next" />
        </View>

        <Divider width="100%" boder={1} color="ligth" marginBottom={20} />

        <View style={styles.content}>
          <FavoriteTopics />
        </View>

        <Divider width="100%" boder={1} color="ligth" marginBottom={20} />

        <View style={styles.content}>
          <ContinueClasses />
        </View>
      </ScrollView>

      <ButtonAction text="INICIA TU CLASE" onPress={() => navigation.navigate("ManyCourses")} />
    </ImageBackground>
  )
}

export default HomeScreen
