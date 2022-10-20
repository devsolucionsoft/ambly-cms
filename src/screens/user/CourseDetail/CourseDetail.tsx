import { View, Image } from "react-native"
// Styles compomponent
import { styles } from "./CourseDetail.styles"
// Types
import {
  StackNavigationProps,
  UserStackParamList,
} from "../../../navigation/types"
// UI Components
import { Typography, Divider } from "../../../components/global"
import { Layout, AccordionItem } from "../../../components/user"
import { palette } from "../../../utils/theme"
import { AntDesign } from "@expo/vector-icons"

const CourseDetailScreen = ({
  navigation,
  route,
}: StackNavigationProps<UserStackParamList, "CourseDetail">) => {
  const modules = [
    {
      title: "intoducción",
      duration: "5:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videos: [
        {
          title: "intoducción",
          duration: "5:00",
          sub: "Due in 1 day",
        },
        {
          title: "intoducción",
          duration: "5:00",
          sub: "Due in 1 day",
        },
      ],
    },
    {
      title: "intoducción",
      duration: "5:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videos: [
        {
          title: "intoducción",
          duration: "5:00",
        },
        {
          title: "intoducción",
          duration: "5:00",
        },
      ],
    },
  ]

  return (
    <Layout
      headerProps={{
        returnAction: true,
        variant: "information",
      }}
    >
      <Image
        style={styles.image}
        source={require("../../../../assets/images/mariana.jpg")}
      />
      <View style={styles.content}>
        {/* Content top */}
        <Typography
          variant="heading"
          textAlign="center"
          color="ligth"
          style={{ marginBottom: 10 }}
        >
          Mariana Pajon
        </Typography>
        <Divider
          color="blueText"
          width={30}
          boder={2}
          marginTop={5}
          marginBottom={6}
        />
        <Typography
          variant="heading3"
          textAlign="center"
          color="ligth"
          style={{ marginBottom: 10 }}
        >
          Fuerza mental
        </Typography>

        {/* Content price */}
        <View style={styles.contentPrice}>
          <Typography
            variant="p2"
            textAlign="center"
            color="grayText"
            style={{ marginBottom: 10 }}
          >
            <AntDesign
              name="clockcircleo"
              size={15}
              color={palette["blueText"]}
            />{" "}
            7 modulos
          </Typography>
          <Typography
            variant="p"
            textAlign="center"
            color="blueText"
            style={{ fontWeight: "bold", marginBottom: 10 }}
          >
            $ 43.000
          </Typography>
        </View>

        {/* Content description */}
        <Typography
          variant="p2"
          textAlign="center"
          color="grayText"
          style={{ width: "90%", marginLeft: "5%" }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>

        {/* Content price */}
        <View style={styles.caracteristics}>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Duración
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              4 horas
            </Typography>
          </View>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Outcome
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              Lorem Ipsum is simply dummy
            </Typography>
          </View>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Feedback from
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              Lorem Ipsum is simply dummy
            </Typography>
          </View>
          <View style={styles.caracteristicsItem}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Structure
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              Lorem Ipsum is simply dummy
            </Typography>
          </View>
          <View style={{ ...styles.caracteristicsItem, width: "100%" }}>
            <Typography
              variant="p"
              textAlign="center"
              color="ligth"
              style={{ fontWeight: "bold" }}
            >
              Dificulty
            </Typography>
            <Typography variant="p2" textAlign="center" color="redPrimary">
              All levels
            </Typography>
          </View>
        </View>

        {/* Content price */}
        <View style={styles.cirriculum}>
          <Typography
            variant="heading3"
            textAlign="center"
            color="ligth"
            style={{ fontWeight: "bold" }}
          >
            Explore the curriculum
          </Typography>
          <Typography variant="p2" textAlign="center" color="ligth">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </Typography>

          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ fontWeight: "bold", marginTop: 20 }}
          >
            Lesson
          </Typography>

          {/* Content modules */}
          <View style={styles.moduleList}>
            {modules.map((item) => (
              <AccordionItem
                title={item.title}
                duration={item.duration}
                description={item.description}
                items={item.videos}
              />
            ))}
          </View>
        </View>

        {/* Content price */}
        <View style={{ marginTop: 20 }}>
          <Typography
            variant="heading3"
            textAlign="center"
            color="ligth"
            style={{ fontWeight: "bold", marginBottom: 15 }}
          >
            Que vas a aprender
          </Typography>

          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 5 }}
          >
            - Lorem Ipsum is simply dummy text of the printing.
          </Typography>
          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 5 }}
          >
            - Lorem Ipsum is simply dummy text of the printing.
          </Typography>
          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ marginBottom: 5 }}
          >
            - Lorem Ipsum is simply dummy text of the printing.
          </Typography>
        </View>
      </View>
    </Layout>
  )
}

export default CourseDetailScreen
