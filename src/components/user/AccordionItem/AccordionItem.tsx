import React, { useState } from "react"
import { View, ViewProps, TouchableOpacity, Image } from "react-native"
// Theme
import { palette } from "../../../utils/theme"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
// Styles
import { styles } from "./AccordionItem.styles"
// Components
import { Typography } from "../../global"
// Navigation
import { navigateUser } from "../../../navigation/actions"

interface AccordionItemProps {
  title: string
  duration: string
  description: string
  items: Array<any>
}

type AccordionItemAttributes = AccordionItemProps & ViewProps

const AccordionItem = (props: AccordionItemAttributes) => {
  const { style, title, duration, description, items } = props

  const [active, setActive] = useState(false)

  const parseStyle = typeof style === "object" ? style : {}

  return (
    <View style={{ ...parseStyle, ...styles.main }}>
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
          {items.map((item) => (
            <TouchableOpacity style={styles.videos} onPress={() => navigateUser("ModuleDetail")}>
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
                  {item.title}
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
