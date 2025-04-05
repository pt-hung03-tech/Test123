import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { MaterialIcons, Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const ProfileScreen = () => {
  // Thông tin người dùng
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987 654 321",
    avatar: require("../assets/images/AV.jpg"), // Thay bằng avatar thực tế
    membership: "VIP Member",
    joinDate: "Thành viên từ 15/03/2022"
  };

  // Các menu chức năng
  const menuItems: { icon: "creditcard" | "shoppingcart" | "hearto" | "setting" | "questioncircleo" | "logout"; name: string; label: string }[] = [
    { icon: "creditcard", name: "Ví tiền", label: "Quản lý tài khoản ngân hàng" },
    { icon: "shoppingcart", name: "Đơn hàng", label: "Lịch sử giao dịch" },
    { icon: "hearto", name: "Yêu thích", label: "Danh sách yêu thích" },
    { icon: "setting", name: "Cài đặt", label: "Cài đặt tài khoản" },
    { icon: "questioncircleo", name: "Trợ giúp", label: "Hỗ trợ và phản hồi" },
    { icon: "logout", name: "Đăng xuất", label: "Thoát khỏi tài khoản" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tài khoản</Text>
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit" size={20} color="#4361ee" />
          </TouchableOpacity>
        </View>

        {/* Thông tin cá nhân */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={user.avatar} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialIcons name="photo-camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.membershipBadge}>
            <Ionicons name="shield-checkmark" size={16} color="#FFD700" />
            <Text style={styles.membershipText}>{user.membership}</Text>
          </View>
          
          <Text style={styles.joinDate}>{user.joinDate}</Text>
        </View>

        {/* Thông tin liên hệ */}
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <MaterialIcons name="email" size={24} color="#4361ee" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoItem}>
            <Feather name="phone" size={24} color="#4361ee" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Điện thoại</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>
        </View>

        {/* Menu chức năng */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <AntDesign name={item.icon} size={24} color="#4361ee" />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#95a5a6" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4361ee',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4361ee',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  membershipText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 6,
  },
  joinDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(67, 97, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 2,
  },
  menuLabel: {
    fontSize: 12,
    color: '#95a5a6',
  },
});

export default ProfileScreen;