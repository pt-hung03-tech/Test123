import React from "react";
import { createBottomTabNavigator, BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AddNewScreen from "../screens/AddnewScreen";
import MenuScreen from "../screens/MenuScreen";

const Tab = createBottomTabNavigator();

const CustomTabBarButton: React.FC<BottomTabBarButtonProps> = ({ children, onPress }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress ?? (() => {})}> 
    <View style={styles.plusButton}>{children}</View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
    <Tab.Screen 
      name="HomeTab"  
      component={HomeScreen} 
      options={{ tabBarIcon: ({ color }) => <Icon name="grid" size={24} color={color} style={styles.tabIcon} /> }} 
    />

    <Tab.Screen 
      name="MenuScreen" 
      component={MenuScreen} 
      options={{ tabBarIcon: ({ color }) => <Icon name="menu" size={24} color={color} style={styles.tabIcon} /> }} 
    />

    <Tab.Screen 
      name="AddNewScreen" 
      component={AddNewScreen}
      options={{ 
        tabBarIcon: ({ color }) => <Icon name="plus" size={28} color={color} />, // ✅ Nút Plus không cần chỉnh
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }} 
    />

    <Tab.Screen 
      name="NotificationScreen" 
      component={NotificationScreen} 
      options={{ tabBarIcon: ({ color }) => <Icon name="bell" size={24} color={color} style={styles.tabIcon} /> }} 
    />

    <Tab.Screen 
      name="ProfileScreen" 
      component={ProfileScreen} 
      options={{ tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} style={styles.tabIcon} /> }} 
    />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute", 
    bottom: 10,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    flexDirection: "row",   // ✅ Đảm bảo icon được căn ngang
    alignItems: "center",   // ✅ Căn giữa icon theo chiều dọc
    justifyContent: "space-around", // ✅ Dàn đều các icon
    paddingHorizontal: 10,  // ✅ Để tránh icon bị sát mép
  },
  customButton: {
    top: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  plusButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#FF6600",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  tabIcon: {
    marginBottom: -30, // ✅ Kéo icon xuống một chút để căn giữa
  }
});

export default BottomTabNavigator;
