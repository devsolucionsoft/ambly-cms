import {
  ScrollView,
  ImageBackground,
  Image,
  View,
  Dimensions,
} from "react-native"
// Styles
import { styles } from "./ProfessorDetail.styles"
import { Ionicons, AntDesign } from "@expo/vector-icons"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// Components
import { Typography, Divider, Header, Button } from "../../../components/global"
import { Layout } from "../../../components/user"
import Carousel from "react-native-snap-carousel"

const ProfessorDetail = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "ProfessorDetail">) => {
  const itemSlider = ({ item, index }: { item: any; index: any }) => {
    return (
      <View style={styles.imtemSlider}>
        <AntDesign name="book" size={55} color="white" />
        <View style={{marginLeft: 10}}>
          <Typography
            color="ligth"
            textAlign="left"
            variant="p20"
            style={{ fontWeight: "700" }}
          >
            Artes plasticas
          </Typography>
          <Typography
            color="grayText"
            textAlign="left"
            variant="p13"
          >
            Universidad de los Andes
          </Typography>
          <Typography
            color="grayText"
            textAlign="left"
            variant="p13"
            style={{marginBottom: 5 }}
          >
            2008
          </Typography>
        </View>
      </View>
    )
  }

  return (
    <Layout
      headerProps={{
        returnAction: true,
        variant: "information",
        title: "Maestros",
      }}
      navCourse={true}
    >
      <ScrollView style={{paddingBottom: 150}}>
        <ImageBackground
          style={styles.imageHeader}
          source={require("../../../../assets/images/lago.jpg")}
        />
        <View style={styles.content}>
          <Image
            style={styles.imageUser}
            source={require("../../../../assets/images/profesor.png")}
          />
          <Typography color="ligth" textAlign="left" variant="h4">
            Javier Sandoval
          </Typography>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="school" size={22} color="white" />
            <Typography
              color="ligth"
              textAlign="left"
              variant="p16"
              style={{ marginLeft: 6, fontWeight: "200" }}
            >
              Fotografía
            </Typography>
          </View>

          <Divider
            color="grayText"
            width={"100%"}
            boder={1}
            align="center"
            marginTop={20}
            marginBottom={20}
          />

          <Typography
            color="ligth"
            textAlign="left"
            variant="p20"
            style={{ marginBottom: 10, fontWeight: "900" }}
          >
            Sobre Javier:
          </Typography>

          <Typography
            color="ligth"
            textAlign="left"
            variant="p16"
            style={{ marginBottom: 15 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et
            odio placerat nisi mattis malesuada. Phasellus a augue sagittis,
            accumsan erat eu, commodo velit.
          </Typography>
          <Typography
            color="ligth"
            textAlign="left"
            variant="p16"
            style={{ marginBottom: 15 }}
          >
            Maecenas quis lorem a sem vehicula elementum id at ex. Sed turpis
            dolor. Ultrices felis metus pharetra lorem. Fusce sit amet lacus eu
            arcu vehicula pretium. Pellentesque vitae vestibulum sapien.
            Pellentesque facilisis dolor augue.
          </Typography>

          <Typography
            color="ligth"
            textAlign="left"
            variant="p20"
            style={{ marginBottom: 10, fontWeight: "900", marginTop: 10 }}
          >
            Sus estudios
          </Typography>
        </View>
        <Carousel
          data={[1, 2, 3, 4, 5]}
          renderItem={itemSlider}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width * 0.65}
          vertical={false}
          loop={true}
        />
      </ScrollView>
    </Layout>
  )
}

export default ProfessorDetail
