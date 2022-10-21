import React, { createContext } from "react"
import { View, ViewProps, ScrollView } from "react-native"
// Styles
import { styles } from "./Layout.styles"
// Components
import { Header } from "../../global"
import { ButtonAction } from "../../user"
import { ButtonActionAttributes } from "../../user/ButtonAction"
import { HeaderProps } from "../../global/Header/Header"

interface LayoutProps {
  headerProps: HeaderProps
  spaceTop?: boolean
  buttonAction?: ButtonActionAttributes
}

type TemplateAttributes = LayoutProps & ViewProps

const ThemeContext = createContext({})

const Layout = (props: TemplateAttributes) => {
  const { headerProps, children, spaceTop, buttonAction } = props

  return (
    <ThemeContext.Provider
      value={{
        screen: "",
      }}
    >
      <View style={styles.container}>
        <Header {...headerProps} />

        <View style={styles.viewAbsolute}>
          <ScrollView style={{ paddingTop: spaceTop ? 90 : 0 }}>
            {children}
          </ScrollView>
          {buttonAction && (
            <ButtonAction {...buttonAction} text={buttonAction.text} />
          )}
        </View>
      </View>
    </ThemeContext.Provider>
  )
}

export default Layout
