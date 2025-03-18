import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MenuScreen = () => {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: 'Xin chào! Tôi là trợ lý tài chính AI. Bạn cần hỗ trợ gì về quản lý chi tiêu, đầu tư hay tiết kiệm?', 
      time: '8:10', 
      isAI: true 
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Thêm tin nhắn người dùng
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Giả lập phản hồi AI
    setTimeout(() => {
      const aiResponse = {
        id: Date.now().toString(),
        text: `Tôi đã nhận được câu hỏi: "${inputText}". Đây là một số gợi ý từ AI:\n1. Phân tích chi tiêu hàng tháng\n2. Đầu tư quỹ ETF\n3. Tối ưu hóa lãi suất tiết kiệm`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer, 
      item.isAI ? styles.aiMessage : styles.userMessage
    ]}>
      <View style={styles.messageHeader}>
        <Text style={styles.senderName}>
          {item.isAI ? 'Trợ lý AI' : 'Bạn'}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.messageText}>{item.text}</Text>
      
      {item.isAI && (
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickButton}>
            <Text style={styles.quickButtonText}>Phân tích chi tiêu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton}>
            <Text style={styles.quickButtonText}>Gợi ý đầu tư</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tư vấn Tài chính AI</Text>
        <Text style={styles.headerSubtitle}>Hỗ trợ 24/7 - Bảo mật tuyệt đối</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      {loading && <ActivityIndicator size="small" color="#2ecc71" style={styles.loading} />}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Điều chỉnh offset
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nhập câu hỏi về tài chính..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e8f5e9',
    textAlign: 'center',
    marginTop: 4,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2ecc71',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3498db',
  },
  timeText: {
    fontSize: 10,
    color: '#95a5a6',
  },
  messageText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12, // Thêm paddingBottom
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    bottom: 60,
  },
  input: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: '#2ecc71',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  quickButton: {
    backgroundColor: '#f1f2f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  quickButtonText: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: '500',
  },
  loading: {
    marginVertical: 10,
  },
});

export default MenuScreen;