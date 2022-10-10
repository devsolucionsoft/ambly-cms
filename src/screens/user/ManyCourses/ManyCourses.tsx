import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
// Styles compomponent
import { styles } from "./ManyCoursesScreen.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Header } from "../../../components/global"


const HomeScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "ManyCourses">) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require("../../../../assets/images/background-screen.png")}
    >
      <Header icon variant="user" />

     
    </ImageBackground>
  )
}

export default HomeScreen
