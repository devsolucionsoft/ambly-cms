import React from "react"
import { ViewProps, ImageBackground } from "react-native"
// Styles
import { styles } from "./LoyoutAuth.styles"
// components
import { Alert } from "../../../components/global"
// Store
import { useAppSelector } from "../../../store"

interface LoyoutAuthProps {}

type LoyoutAuthAttributes = LoyoutAuthProps & ViewProps

const LoyoutAuth = (props: LoyoutAuthAttributes) => {
  const alertState = useAppSelector((store) => store.Alert)

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require("../../../../assets/images/background-screen.png")}
    >
      {props.children}
      <Alert
        modalVisible={alertState.open}
        title={alertState.data.title}
        text={alertState.data.text}
        icon={alertState.data.icon}
        actionText={alertState.data.actionText}
        action={alertState.data.action}
      />
    </ImageBackground>
  )
}

export default LoyoutAuth
