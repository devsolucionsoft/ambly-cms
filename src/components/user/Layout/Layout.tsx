import React, { createContext, useEffect } from "react"
import { View, ViewProps, ScrollView } from "react-native"
// Styles
import { styles } from "./Layout.styles"
// Components
import { Header, Alert } from "../../global"
import { ButtonAction } from "../../user"
import { ButtonActionAttributes } from "../../user/ButtonAction"
import { HeaderProps } from "../../global/Header/Header"
// Store
import { useAppSelector } from "../../../store"


interface LayoutProps {
  headerProps?: HeaderProps
  spaceTop?: boolean
  buttonAction?: ButtonActionAttributes
  navCourse?: JSX.Element
}

type TemplateAttributes = LayoutProps & ViewProps

const ThemeContext = createContext({})

const Layout = (props: TemplateAttributes) => {
  const { headerProps, children, spaceTop, buttonAction, navCourse } = props

  return (
    <ThemeContext.Provider value={{}}>
      <View style={styles.container}>
        <Header {...headerProps} />

        <View style={styles.viewAbsolute}>
          <ScrollView style={{ paddingTop: spaceTop ? 90 : 0 }}>
            {children}
          </ScrollView>
          {buttonAction && (
            <ButtonAction {...buttonAction} text={buttonAction.text} />
          )}
          {navCourse && navCourse}
        </View>
      </View>
    </ThemeContext.Provider>
  )
}

export default Layout
