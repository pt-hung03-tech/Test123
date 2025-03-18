import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
}

interface ChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const HomeScreen = () => {
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    checkTokenAndFetchData();
  }, []);

  const checkTokenAndFetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Lỗi", "Bạn cần đăng nhập để xem dữ liệu");
        return;
      }
      await fetchData(token);
    } catch (error) {
      console.error("Error checking token:", error);
      Alert.alert("Lỗi", "Không thể kiểm tra token");
      setLoading(false);
    }
  };

  const fetchData = async (token: string) => {
    try {
      // Fetch tổng quan tài chính
      const overviewResponse = await fetch(
        "http://192.168.1.13:8000/api/finance-overview/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Fetch giao dịch
      const transactionsResponse = await fetch(
        "http://192.168.1.13:8000/api/transactions/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Fetch dữ liệu biểu đồ
      const chartResponse = await fetch(
        "http://192.168.1.13:8000/api/expense-categories/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Xử lý lỗi HTTP
      if (!overviewResponse.ok || !transactionsResponse.ok || !chartResponse.ok) {
        throw new Error("Lỗi kết nối server");
      }

      // Parse dữ liệu JSON
      const overviewData = await overviewResponse.json();
      const transactionsData = await transactionsResponse.json();
      const chartData = await chartResponse.json();

      // Cập nhật state
      setBalance(overviewData.balance || 0);
      setIncome(overviewData.income || 0);
      setExpense(overviewData.expense || 0);
      setTransactions(transactionsData);

      // Chuyển đổi định dạng dữ liệu biểu đồ
      const formattedChartData = chartData.map((item: any) => ({
        name: item.name,
        amount: item.amount,
        color: item.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        legendFontColor: "#333",
        legendFontSize: 14,
      }));

      setChartData(formattedChartData);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Lỗi", "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("userToken");
    if (token) await fetchData(token);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tổng số dư</Text>
        <Text style={styles.balance}>{balance.toLocaleString()}₫</Text>
        
        <View style={styles.incomeExpenseContainer}>
          <View style={styles.incomeBox}>
            <Text style={styles.incomeExpenseLabel}>Thu nhập</Text>
            <Text style={styles.incomeExpenseValue}>
              {income.toLocaleString()}₫
            </Text>
          </View>
          
          <View style={styles.expenseBox}>
            <Text style={styles.incomeExpenseLabel}>Chi tiêu</Text>
            <Text style={styles.incomeExpenseValue}>
              {expense.toLocaleString()}₫
            </Text>
          </View>
        </View>
      </View>

      {/* Biểu đồ */}
      <View style={styles.chartContainer}>
        {chartData.length > 0 ? (
          <PieChart
            data={chartData}
            width={width - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
          />
        ) : (
          <View style={styles.chartPlaceholder}>
            <Text>Không có dữ liệu biểu đồ</Text>
          </View>
        )}
      </View>

      {/* Danh sách giao dịch */}
      <ScrollView
        style={styles.transactionsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
        
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <MaterialIcons
                  name={
                    transaction.type === "income" ? "arrow-upward" : "arrow-downward"
                  }
                  size={24}
                  color={transaction.type === "income" ? "#2ecc71" : "#e74c3c"}
                />
              </View>
              
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>
                  {transaction.description}
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString("vi-VN")}
                </Text>
              </View>
              
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === "income"
                    ? styles.income
                    : styles.expense,
                ]}
              >
                {transaction.type === "income" ? "+" : "-"}
                {transaction.amount.toLocaleString()}₫
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactions}>Chưa có giao dịch nào</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Giữ nguyên các style như code gốc và thêm
  chartPlaceholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2ecc71",
    textAlign: "center",
    marginVertical: 10,
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  incomeBox: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  expenseBox: {
    flex: 1,
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  incomeExpenseLabel: {
    fontSize: 14,
    color: "#666",
  },
  incomeExpenseValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chartContainer: {
      backgroundColor: "#fff",
      borderRadius: 20, // Bo góc mạnh hơn
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 }, // Bóng dài hơn
      shadowOpacity: 0.15,
      shadowRadius: 10, // Độ mờ tăng
      elevation: 10,
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  income: {
    color: "#2ecc71",
  },
  expense: {
    color: "#e74c3c",
  },
  noTransactions: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default HomeScreen;