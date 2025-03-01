import React, { useState, useRef } from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/Navigation"; 

// ✅ Định nghĩa kiểu dữ liệu cho navigation và route
type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, "Onboarding">;
type OnboardingScreenRouteProp = RouteProp<RootStackParamList, "Onboarding">;

interface Props {
  navigation: OnboardingScreenNavigationProp;
  route: OnboardingScreenRouteProp;
}

// ✅ Lấy kích thước màn hình để set full-screen
const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/Onboarding1.png"), 
    title: "Giải Pháp Quản Lí Chi tiêu",
    description: "Hãy Cùng Mình Chi Tiêu Hợp lý Và Tiết Kiệm Ngay Hôm Nay nhá",
  },
  {
    id: "2",
    image: require("../assets/images/Onboarding3.png"),
    title: "Trợ Lý AI",
    description: "Người Bạn Luôn Bên Cạnh Mỗi khi Bạn Gặp Vấn Đề Về Tài Chính",
  },
  {
    id: "3",
    image: require("../assets/images/Onboarding2.png"),
    title: "Và Còn Nhiều Hơn Thế Nữa",
    description: "Hãy Cùng Bọn Mình Khám Phá Nha !",
  },
];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef<PagerView | null>(null); // ✅ Xác định kiểu cho pagerRef

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      if (pagerRef.current) { // ✅ Kiểm tra nếu pagerRef không null
        pagerRef.current.setPage(currentIndex + 1);
      }
    } else {
      navigation.replace("LoginScreen"); // Điều hướng đến màn hình chính
    }
  };

  return (
    <View style={styles.container}>
      <PagerView 
        style={styles.pagerView} 
        initialPage={0} 
        ref={pagerRef} 
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        {slides.map((item) => (
          <View style={styles.slide} key={item.id}>
            <ImageBackground source={item.image} style={styles.imageBackground} resizeMode="cover">
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </PagerView>

      {/* Indicator */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.indicator, currentIndex === index && styles.activeIndicator]} />
        ))}
      </View>

      {/* Nút Next & Skip */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // ✅ Đảm bảo không có viền trắng
  },
  pagerView: {
    flex: 1,
    width: "100%",
  },
  slide: {
    flex: 1, // ✅ Đảm bảo ảnh full màn hình
  },
  imageBackground: {
    flex: 1, // ✅ Toàn màn hình
    width: "100%",
    height: "100%",
    justifyContent: "flex-end", // ✅ Đẩy text xuống dưới
    alignItems: "center",
  },
  overlay: {
    width: "90%",
    position: "absolute",
    bottom: height * 0.20,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // ✅ Làm mờ nền để chữ dễ đọc
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#DDD",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 80,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#FF6F00",
    width: 12,
    height: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
  },
  nextButton: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  nextText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipText: {
    fontSize: 16,
    color: "#FFF",
  },
});

export default OnboardingScreen;
