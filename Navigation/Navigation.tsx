import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"; 
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AddnewScreen from "../screens/AddnewScreen";
import BottomTabNavigator from "./BottomTabNavigator"; // ✅ Thêm thanh điều hướng dưới 

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  AddnewScreen: undefined;
  MenuScreen: undefined;
  NotificationScreen: undefined;
  Home: undefined;
  ProfileScreen : undefined;
  DetailsScreen : undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} /> 
        <Stack.Screen 
          name="AddnewScreen" 
          component={AddnewScreen} 
          options={{ presentation: "modal", animation: "slide_from_bottom" }} 
        />
        <Stack.Screen name="MenuScreen" component={BottomTabNavigator} />
        <Stack.Screen name="NotificationScreen" component={BottomTabNavigator}/>
        <Stack.Screen name="ProfileScreen" component={BottomTabNavigator}/>
        <Stack.Screen name="DetailsScreen" component={BottomTabNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
