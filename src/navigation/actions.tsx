import { NavigationContainerRef } from "@react-navigation/core"
import React, { createRef } from "react"
import { AuthStackParamList } from "../navigation/types"

export const navigationRef: React.RefObject<NavigationContainerRef> =
  createRef()

export const navigate = (name: any, params?: any) =>
  navigationRef.current?.navigate(name, params)

export const goBack = () => navigationRef.current?.goBack()
