import React, { useState } from "react"
import { View, ViewProps, TouchableOpacity, Image } from "react-native"
// Theme
import { palette } from "../../../utils/theme"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
// Styles
import { styles } from "./AccordionItem.styles"
// Components
import { Typography } from "../../global"

interface AccordionItemProps {
  title: string
  duration: string
  description: string
  videos: any
  handleNavigateVideo?: any
  activeItem?: any
}

type AccordionItemAttributes = AccordionItemProps & ViewProps

const AccordionItem = (props: AccordionItemAttributes) => {
  const {
    style,
    title,
    duration,
    description,
    videos,
    handleNavigateVideo,
    activeItem,
  } = props
  const [active, setActive] = useState(false)
  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View
      style={[
        parseStyle,
        styles.main,
        {
          borderColor: !isNaN(parseInt(activeItem))
            ? palette["redPrimary"]
            : palette["dark"],
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="play" size={40} color={palette["ligth"]} />
        </TouchableOpacity>
        <View style={{ width: "60%" }}>
          <Typography
            variant="p"
            textAlign="left"
            color="ligth"
            style={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="p2" textAlign="left" color="grayText">
            {duration} minutes
          </Typography>
        </View>
        <TouchableOpacity onPress={() => setActive(!active)}>
          <MaterialIcons
            name={active ? "keyboard-arrow-down" : "keyboard-arrow-right"}
            size={35}
            color={palette["ligth"]}
          />
        </TouchableOpacity>
      </View>
      {active && (
        <View style={styles.details}>
          <Typography
            variant="p2"
            textAlign="center"
            color="grayText"
            style={{ marginVertical: 10 }}
          >
            {description}
          </Typography>
          {videos.map((item: any, index: number) => (
            <TouchableOpacity
              style={[
                styles.videos,
                {
                  borderWidth: 2,
                  borderColor:
                    activeItem === index
                      ? palette["redPrimary"]
                      : palette["ligth"],
                },
              ]}
              onPress={() => handleNavigateVideo(index)}
            >
              <Image
                style={styles.image}
                source={require("../../../../assets/images/mariana.jpg")}
              />
              <View>
                <Typography
                  variant="p2"
                  textAlign="left"
                  color="dark"
                  style={{ fontWeight: "bold" }}
                >
                  {item.name_video}
                </Typography>
                <Typography variant="p3" textAlign="left" color="grayText">
                  {item.duration} minutes
                </Typography>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

export default AccordionItem
