import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  // Dữ liệu thông báo mẫu
  type MaterialIconName = "check-circle" | "alarm" | "local-offer" | "system-update";

  const notifications: {
    id: number;
    title: string;
    message: string;
    time: string;
    icon: MaterialIconName;
    iconColor: string;
    read: boolean;
  }[] = [
    {
      id: 1,
      title: "Giao dịch thành công",
      message: "Bạn đã nhận được 500.000đ từ Nguyễn Văn A",
      time: "10 phút trước",
      icon: "check-circle",
      iconColor: "#4CAF50",
      read: false
    },
    {
      id: 2,
      title: "Nhắc nhở thanh toán",
      message: "Hóa đơn điện tháng này sắp đến hạn thanh toán",
      time: "2 giờ trước",
      icon: "alarm",
      iconColor: "#FF9800",
      read: false
    },
    {
      id: 3,
      title: "Khuyến mãi mới",
      message: "Giảm 20% khi thanh toán hóa đơn qua ví điện tử",
      time: "1 ngày trước",
      icon: "local-offer",
      iconColor: "#E91E63",
      read: true
    },
    {
      id: 4,
      title: "Cập nhật ứng dụng",
      message: "Phiên bản mới 2.1.0 đã có trên cửa hàng",
      time: "2 ngày trước",
      icon: "system-update",
      iconColor: "#2196F3",
      read: true
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity>
          <Text style={styles.headerAction}>Đánh dấu đã đọc</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách thông báo */}
      <ScrollView contentContainerStyle={styles.notificationList}>
        {notifications.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.notificationCard,
              !item.read && styles.unreadNotification
            ]}
          >
            <View style={styles.notificationIcon}>
              <MaterialIcons 
                name={item.icon} 
                size={24} 
                color={item.iconColor} 
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.unreadBadge} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="notifications" size={24} color="#4361ee" />
          <Text style={styles.tabTextActive}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#95a5a6" />
          <Text style={styles.tabText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="wallet-outline" size={24} color="#95a5a6" />
          <Text style={styles.tabText}>Ví tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#95a5a6" />
          <Text style={styles.tabText}>Cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerAction: {
    fontSize: 14,
    color: '#4361ee',
  },
  notificationList: {
    padding: 16,
    paddingBottom: 80,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#4361ee',
  },
  notificationIcon: {
    marginRight: 16,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4361ee',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  tabTextActive: {
    fontSize: 12,
    color: '#4361ee',
    marginTop: 4,
    fontWeight: '600',
  },
});

export default NotificationScreen;