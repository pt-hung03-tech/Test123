import { useEffect } from "react";
import { View, ImageBackground, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated";

const Splash = () => {
  const navigation = useNavigation();
  const opacity = useSharedValue(1); // ✅ Bắt đầu với opacity 1 (hiển thị đầy đủ)

  useEffect(() => {
    // ✅ Sau 1.5 giây, chạy animation fade-out
    setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: 1000, // ✅ Mờ dần trong 1 giây
        easing: Easing.inOut(Easing.ease),
      });

      setTimeout(() => {
        navigation.navigate("Onboarding" as never);
      }, 1000);
    }, 1500);
  }, [navigation]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <ImageBackground
        source={require("../assets/images/Sochitieu.jpg")}
        style={styles.image}
        resizeMode="cover"
      >
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    bottom: 50,
  },
});

export default Splash;
