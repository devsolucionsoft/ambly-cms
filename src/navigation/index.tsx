/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { navigationRef } from "./actions"
// Store
import { useAppSelector } from "../store"
// Params navigation stacks
import {
  AppStackParamList,
  AuthStackParamList,
  UserStackParamList,
} from "./types"
// Screens
import {
  StartScreen,
  IngressScreen,
  LoginScreen,
  RegistryScreen,
  TermsScreen,
  ExploreScreen,
  CourseDetailScreen
} from "../screens/auth"
import {
  HomeScreen,
  ManyCourses,
  ChooseCourses,
  CheckIn,
  CourseDetail,
  MyCourses,
  ModuleDetail,
  MyAccount
} from "../screens/user"
// Drawer
import { DrawerNatigation } from "../components/user"
// components
import { Alert } from "../components/global"

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  )
}

const AppStack = createNativeStackNavigator<AppStackParamList>()

const AppNavigator = () => {
  const auth = useAppSelector((store) => store.Auth)

  return (
    <AppStack.Navigator initialRouteName="Auth">
      {!auth.session ? (
        <AppStack.Screen
          name="User"
          component={UserNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <AppStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </AppStack.Navigator>
  )
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator = () => {
  const alertState = useAppSelector((store) => store.Alert)
  return (
    <AuthStack.Navigator initialRouteName="Start">
      <AuthStack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Ingress"
        component={IngressScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Registry"
        component={RegistryScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}

const UserStack = createDrawerNavigator<UserStackParamList>()
const UserNavigator = () => {
  return (
    <UserStack.Navigator
      initialRouteName="Home"
      drawerContent={DrawerNatigation}
      backBehavior="history"
    >
      <UserStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="ManyCourses"
        component={ManyCourses}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="ChooseCourses"
        component={ChooseCourses}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="CheckIn"
        component={CheckIn}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="MyCourses"
        component={MyCourses}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="ModuleDetail"
        component={ModuleDetail}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{ headerShown: false }}
      />
    </UserStack.Navigator>
  )
}
