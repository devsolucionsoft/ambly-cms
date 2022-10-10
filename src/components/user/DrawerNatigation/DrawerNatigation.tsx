import React from "react"
import { View, ViewProps } from "react-native"
// Styles
import { styles } from "./DrawerNatigation.styles"
// Components
import { Button, Header } from "../../global"

interface DrawerNatigationProps {}

const DrawerNatigation = (props: DrawerNatigationProps) => {
  const {} = props

  return (
    <View style={styles.main}>
      <Header />

      <View>
        <Button
          variant="lg"
          text="Mis cursos"
          color="redPrimary"
          colorText="ligth"
        />
        <Button
          variant="lg"
          text="Mis cursos"
          color="redPrimary"
          colorText="ligth"
        />
        <Button
          variant="lg"
          text="Mis cursos"
          color="redPrimary"
          colorText="ligth"
        />
      </View>
    </View>
  )
}

export default DrawerNatigation
