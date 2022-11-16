import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { DrawerNavigationProp } from "@react-navigation/drawer"

import { RouteProp, ParamListBase } from "@react-navigation/native"

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: NativeStackNavigationProp<ParamList, RouteName>
  route: RouteProp<ParamList, RouteName>
}

export interface DrawerkNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: DrawerNavigationProp<ParamList, RouteName>
  route: RouteProp<ParamList, RouteName>
}

export type AuthStackParamList = {
  Start: undefined
  Ingress: undefined
  Login: undefined
  Registry: undefined
  Terms: undefined
  Explore: undefined
  CourseDetail: undefined
}

export type UserStackParamList = {
  Home: undefined
  ManyCourses: undefined
  ChooseCourses: undefined
  CheckIn: undefined
  CourseDetail: {
    id_course: number
  }
  MyCourses: undefined
  ModuleDetail: undefined
}

export type AppStackParamList = {
  Auth: { screen: keyof AuthStackParamList }
  User: { screen: keyof UserStackParamList }
}
