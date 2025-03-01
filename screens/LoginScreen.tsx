import { RootStackParamList } from "@/Navigation/Navigation";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginScreen">;
type LoginScreenRouteProp = RouteProp<RootStackParamList, "LoginScreen">;

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      {/* Phần trên (Header - Màu đen) */}
      <View style={styles.header}>
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>Please sign in to your existing account</Text>
      </View>

      {/* Phần dưới (Form - Màu trắng) */}
      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#B0B0B0"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#B0B0B0"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
                <Icon name={secureText ? "eye-off" : "eye"} size={22} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMe}>
              <Checkbox.Android status={rememberMe ? "checked" : "unchecked"} color="#FF6600" />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate("Home")}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>

          {/* Sign Up */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={styles.signUpLink}> SIGN UP</Text>
            </TouchableOpacity>
          </View>

          {/* Social Login */}
          <Text style={styles.orText}>Or</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, styles.twitter]}>
              <Icon name="twitter" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, styles.apple]}>
              <Icon name="apple" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    height: height * 0.4, // ✅ Giữ chiều cao phần đen
    backgroundColor: "#1A1A2E",
    justifyContent: "center",
    alignItems: "center",  
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#CCC",
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 50,
    paddingBottom: 150,
    position: "absolute",  // ✅ Đặt phần trắng chồng lên phần đen
    bottom: 0,             // ✅ Đưa về sát đáy màn hình
    left: 0,
    right: 0,
    borderTopLeftRadius: 40,  // ✅ Bo góc phía trên
    borderTopRightRadius: 40, // ✅ Bo góc phía trên
    elevation: 10,  // ✅ Tạo hiệu ứng đổ bóng nếu cần
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },  
  scrollView: {
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#EEE",
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  rowContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#555",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#FF6600",
    fontWeight: "bold",
  },
  loginButton: {
    width: "90%",
    backgroundColor: "#FF6600",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: "#555",
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6600",
  },
  orText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  socialButton: {
    backgroundColor: "#3b5998",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  twitter: {
    backgroundColor: "#1DA1F2",
  },
  apple: {
    backgroundColor: "#000",
  },
});

export default LoginScreen;
