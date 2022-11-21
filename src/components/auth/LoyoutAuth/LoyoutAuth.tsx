import React from "react"
import { ViewProps } from "react-native"
// Styles
import { styles } from "./LoyoutAuth.styles"
// components
import { Alert } from "../../../components/global"
// Store
import { useAppSelector } from "../../../store"
import { LinearGradient } from 'expo-linear-gradient';

interface LoyoutAuthProps {}

type LoyoutAuthAttributes = LoyoutAuthProps & ViewProps

const LoyoutAuth = (props: LoyoutAuthAttributes) => {
  const alertState = useAppSelector((store) => store.Alert)

  return (
    <LinearGradient
      style={styles.container}
      colors={['#101010', '#343434']}
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
    </LinearGradient>
  )
}

export default LoyoutAuth
