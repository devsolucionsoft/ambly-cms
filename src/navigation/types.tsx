import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp, ParamListBase } from "@react-navigation/native"

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: NativeStackNavigationProp<ParamList, RouteName>
  route: RouteProp<ParamList, RouteName>
}

export type AppStackParamList = {
  Auth: { screen: undefined }
  User: { screen: undefined }
}

export type AuthStackParamList = {
  Start: undefined
  Ingress: undefined
  Login: {
    action: "login" | "registry"
  }
  Registry: undefined
}

export type UserStackParamList = {
  Home: undefined
  ManyCourses: undefined
}
