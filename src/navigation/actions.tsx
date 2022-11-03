import { NavigationContainerRef } from "@react-navigation/core"
import React, { createRef } from "react"
import {
  AppStackParamList,
  AuthStackParamList,
  UserStackParamList,
} from "../navigation/types"

export const navigationRef: React.RefObject<
  NavigationContainerRef<AppStackParamList>
> = createRef()

export const navigateAuth = (screen: keyof AuthStackParamList) =>
  navigationRef.current?.navigate("Auth", { screen })

export const navigateUser = (screen: keyof UserStackParamList) =>
  navigationRef.current?.navigate("User", { screen })

export const navigationBack = () => {
  navigationRef.current?.goBack()
}
