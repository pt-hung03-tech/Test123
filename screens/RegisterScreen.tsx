import React, { useState } from "react";
import { RootStackParamList } from "@/Navigation/Navigation";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "RegisterScreen">;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, "RegisterScreen">;

interface Props {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
}

const { width, height } = Dimensions.get("window");

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <View style={styles.container}>
      {/* Phần trên (Header - Màu đen) */}
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create a new account</Text>
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

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#B0B0B0"
                secureTextEntry={secureTextConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setSecureTextConfirm(!secureTextConfirm)} style={styles.eyeIcon}>
                <Icon name={secureTextConfirm ? "eye-off" : "eye"} size={22} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Agree Terms & Conditions */}
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)} style={styles.rememberMe}>
              <Checkbox.Android status={agreeTerms ? "checked" : "unchecked"} color="#FF6600" />
              <Text style={styles.rememberMeText}>I agree to the Terms & Conditions</Text>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>SIGN UP</Text>
          </TouchableOpacity>

          {/* Already have an account */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.signUpLink}> LOG IN</Text>
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
    height: height * 0.35,
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 10,
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

export default RegisterScreen;
