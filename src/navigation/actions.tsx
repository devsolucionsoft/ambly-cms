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

export const navigateAuth = (name: any, params?: any) =>
  navigationRef.current?.navigate("User", { screen: "Home" })

export const navigateUser = (screen: keyof UserStackParamList) =>
  navigationRef.current?.navigate("User", { screen })
