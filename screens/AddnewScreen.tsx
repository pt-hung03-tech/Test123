import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const AddNewScreen = () => {
  const [name, setName] = useState(""); 
  const [color, setColor] = useState(""); 
  const [type, setType] = useState("expense"); // Thêm state để chọn loại danh mục

  // Hàm xử lý thêm danh mục
  const handleAddCategory = async () => {
    if (!name || !color) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch("http://192.168.1.13:8000/api/categories/create/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          color, 
          type,  // Thêm trường type vào request body
        }),
      });

      if (response.ok) {
        Alert.alert("Thành công", "Danh mục đã được thêm thành công");
        setName("");
        setColor("");
        setType("expense"); // Reset về mặc định
      } else {
        const errorData = await response.json();
        Alert.alert("Lỗi", errorData.error || "Không thể thêm danh mục");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi kết nối với server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Danh Mục Mới</Text>

      {/* Dropdown chọn loại danh mục */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(value) => setType(value)}
        >
          <Picker.Item label="Chi tiêu" value="expense" />
          <Picker.Item label="Thu nhập" value="income" />
        </Picker>
      </View>

      {/* Trường nhập tên danh mục */}
      <TextInput
        style={styles.input}
        placeholder="Tên danh mục"
        value={name}
        onChangeText={setName}
      />

      {/* Trường nhập màu sắc */}
      <TextInput
        style={styles.input}
        placeholder="Màu sắc (ví dụ: #3498db)"
        value={color}
        onChangeText={setColor}
      />

      {/* Nút thêm danh mục */}
      <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
        <Text style={styles.buttonText}>Thêm Danh Mục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2ecc71",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddNewScreen;