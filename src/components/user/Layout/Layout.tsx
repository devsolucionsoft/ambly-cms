import React, { createContext } from "react"
import { View, ViewProps, ScrollView, ActivityIndicator } from "react-native"
// Styles
import { styles } from "./Layout.styles"
// Components
import { Header, Alert } from "../../global"
import { ButtonAction, NavCourse } from "../../user"
import { ButtonActionAttributes } from "../../user/ButtonAction"
import { HeaderProps } from "../../global/Header/Header"
import { palette } from "../../../utils/theme"
// Store
import { useAppSelector } from "../../../store"

interface LayoutProps {
  headerProps?: HeaderProps
  spaceTop?: boolean
  buttonAction?: ButtonActionAttributes
  navCourse?: boolean
}

type TemplateAttributes = LayoutProps & ViewProps

const ThemeContext = createContext({})

const Layout = (props: TemplateAttributes) => {
  const { headerProps, children, spaceTop, buttonAction, navCourse } = props

  const alertState = useAppSelector((store) => store.Alert)
  const loaderState = useAppSelector((store) => store.Loader)

  return (
    <ThemeContext.Provider value={{}}>
      <View style={styles.container}>
        <Header {...headerProps} />

        <View style={styles.viewAbsolute}>
          <ScrollView style={{ paddingTop: spaceTop ? 90 : 0 }}>
            {children}
          </ScrollView>
          {loaderState && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={palette["redPrimary"]} />
            </View>
          )}
          {buttonAction && (
            <ButtonAction
              {...buttonAction}
              text={buttonAction.text}
              style={navCourse ? { bottom: 80 } : {}}
            />
          )}
          {navCourse && <NavCourse />}
        </View>

        <Alert
          modalVisible={alertState.open}
          title={alertState.data.title}
          text={alertState.data.text}
          icon={alertState.data.icon}
          actionText={alertState.data.actionText}
          action={alertState.data.action}
        />
      </View>
    </ThemeContext.Provider>
  )
}

export default Layout
