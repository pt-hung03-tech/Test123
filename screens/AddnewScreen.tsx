import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { API_ENDPOINTS } from '../server_urls';

interface Category {
  id: string;
  name: string;
  color: string;
  type: string;
}

const COLORS = {
  primary: '#4361ee',
  primaryLight: '#3a86ff',
  secondary: '#3f37c9',
  success: '#4cc9f0',
  expense: '#f72585',
  income: '#4cc9f0',
  background: '#f8f9fa',
  cardBackground: '#ffffff',
  textDark: '#212529',
  textLight: '#f8f9fa',
  border: '#dee2e6',
  shadow: 'rgba(0,0,0,0.1)',
};

const MinimalAddNewScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [categoryId, setCategoryId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [type]);

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Lỗi', 'Chưa đăng nhập');
        return;
      }

      const response = await fetch(`${API_ENDPOINTS.LIST_CATEGORIES}?type=${type}`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data: Category[] = await response.json();

      if (response.ok) {
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0].id.toString());
        }
      } else {
        Alert.alert('Lỗi', 'Không thể tải danh mục');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối máy chủ');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ');
      return;
    }
    if (categories.length === 0) {
      Alert.alert('Lỗi', 'Chưa có danh mục nào, vui lòng thêm danh mục trước');
      return;
    }
    if (!categoryId) {
      Alert.alert('Lỗi', 'Vui lòng chọn danh mục');
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Lỗi', 'Chưa đăng nhập');
        return;
      }

      const transactionData = {
        amount: parseFloat(amount),
        type,
        category_id: parseInt(categoryId),
        date: new Date().toISOString().split('T')[0],
        description,
      };

      const response = await fetch(API_ENDPOINTS.CREATE_TRANSACTION, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      const responseData = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'Đã thêm giao dịch');
        setAmount('');
        setDescription('');
        setCategoryId(categories[0]?.id.toString() || '');
      } else {
        Alert.alert('Lỗi', responseData.error || 'Thêm giao dịch thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối máy chủ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên danh mục');
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Lỗi', 'Chưa đăng nhập');
        return;
      }

      const categoryData = {
        name: newCategoryName.trim(),
        color: '#4361ee',
        type,
      };

      const response = await fetch(API_ENDPOINTS.CREATE_CATEGORY, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      const responseData = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'Đã thêm danh mục');
        setNewCategoryName('');
        await fetchCategories();
      } else {
        Alert.alert('Lỗi', responseData.error || 'Thêm danh mục thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối máy chủ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.headerTitle}>Thêm Mới</Text>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        {/* Transaction Section */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <MaterialIcons 
              name="attach-money" 
              size={24} 
              color={COLORS.primary} 
            />
            <Text style={styles.sectionTitle}>Thêm Giao Dịch</Text>
          </View>

          <Text style={styles.label}>Số tiền</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="payment" 
              size={20} 
              color={COLORS.textDark} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Nhập số tiền"
              placeholderTextColor="#adb5bd"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <Text style={styles.label}>Loại giao dịch</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.expenseActive,
              ]}
              onPress={() => {
                setType('expense');
                setCategoryId(categories[0]?.id.toString() || '');
              }}
            >
              <Text style={[
                styles.typeButtonText,
                type === 'expense' && styles.typeButtonTextActive
              ]}>
                Chi tiêu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.incomeActive,
              ]}
              onPress={() => {
                setType('income');
                setCategoryId(categories[0]?.id.toString() || '');
              }}
            >
              <Text style={[
                styles.typeButtonText,
                type === 'income' && styles.typeButtonTextActive
              ]}>
                Thu nhập
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Danh mục</Text>
          {isLoadingCategories ? (
            <ActivityIndicator color={COLORS.primary} size="small" />
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryButton,
                      categoryId === cat.id.toString() && styles.categoryButtonActive,
                    ]}
                    onPress={() => setCategoryId(cat.id.toString())}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      categoryId === cat.id.toString() && styles.categoryButtonTextActive
                    ]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noDataText}>Chưa có danh mục</Text>
              )}
            </ScrollView>
          )}

          <Text style={styles.label}>Mô tả</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="description" 
              size={20} 
              color={COLORS.textDark} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ghi chú (tùy chọn)"
              placeholderTextColor="#adb5bd"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleAddTransaction}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.textLight} size="small" />
            ) : (
              <Text style={styles.buttonText}>
                <MaterialIcons name="add-circle" size={18} color="white" /> Thêm Giao Dịch
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Category Section */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <MaterialIcons 
              name="category" 
              size={24} 
              color={COLORS.primary} 
            />
            <Text style={styles.sectionTitle}>Thêm Danh Mục</Text>
          </View>

          <Text style={styles.label}>Tên danh mục</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="create" 
              size={20} 
              color={COLORS.textDark} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập tên danh mục"
              placeholderTextColor="#adb5bd"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
          </View>

          <Text style={styles.label}>Loại danh mục</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.expenseActive,
              ]}
              onPress={() => setType('expense')}
            >
              <Text style={[
                styles.typeButtonText,
                type === 'expense' && styles.typeButtonTextActive
              ]}>
                Chi tiêu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.incomeActive,
              ]}
              onPress={() => setType('income')}
            >
              <Text style={[
                styles.typeButtonText,
                type === 'income' && styles.typeButtonTextActive
              ]}>
                Thu nhập
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleAddCategory}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.textLight} size="small" />
            ) : (
              <Text style={styles.buttonText}>
                <MaterialIcons name="add-box" size={18} color="white" /> Thêm Danh Mục
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 120,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.cardBackground,
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    color: COLORS.textDark,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f1f3f5',
  },
  typeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  expenseActive: {
    backgroundColor: COLORS.expense,
  },
  incomeActive: {
    backgroundColor: COLORS.income,
  },
  typeButtonText: {
    color: COLORS.textDark,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: COLORS.textLight,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    backgroundColor: COLORS.cardBackground,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    color: COLORS.textDark,
  },
  categoryButtonTextActive: {
    color: COLORS.textLight,
  },
  noDataText: {
    color: COLORS.textDark,
    fontSize: 14,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default MinimalAddNewScreen;