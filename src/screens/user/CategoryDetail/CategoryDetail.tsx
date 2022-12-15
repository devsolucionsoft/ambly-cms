import { ScrollView, ImageBackground, View } from "react-native"
// Styles
import { styles } from "./CategoryDetail.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// Components
import { Typography } from "../../../components/global"
import { Layout, SliderCourses } from "../../../components/user"
import { LinearGradient } from "expo-linear-gradient"
import { paletteGradient } from "../../../utils/theme"

const CategoryDetail = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "CategoryDetail">) => {

  return (
    <Layout
      headerProps={{
        returnAction: true,
        variant: "information",
        title: "Categoría",
      }}
      navCourse={true}
    >
      <ScrollView style={{ paddingBottom: 100 }}>
        <ImageBackground
          style={styles.image}
          source={require("../../../../assets/images/pintura.webp")}
        >
          <LinearGradient
            start={{ x: 0.5, y: 0.8 }}
            end={{ x: 0.5, y: 0 }}
            colors={paletteGradient.gradientOpacity}
            style={styles.imageContent}
          >
            <Typography
              variant="h1"
              textAlign="left"
              color="ligth"
              style={{ fontWeight: "600", width: "60%" }}
            >
              {"Ártes plasticas"}
            </Typography>
            <View style={styles.beagle}>
              <Typography variant="p14" color="ligth" textAlign="left">
                {"+17 cursos"}
              </Typography>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.content}>
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
        </View>

        <SliderCourses
          variant="category"
          header
          title="Curos Populares"
          hideSeeAll
        />
        <SliderCourses
          variant="categoryList"
          header
          title="Todos los cursos"
          hideSeeAll
        />
      </ScrollView>
    </Layout>
  )
}

export default CategoryDetail
