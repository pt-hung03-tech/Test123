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
  ActivityIndicator,
  ImageBackground,
  ScrollView
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from "../server_urls";
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  text: string;
  time: string;
  isAI: boolean;
}

const COLORS = {
  primary: '#4361ee',
  primaryLight: '#4895ef',
  secondary: '#3f37c9',
  accent: '#f72585',
  background: '#f8f9fa',
  cardBackground: '#ffffff',
  textDark: '#212529',
  textLight: '#ffffff',
  aiBubble: '#FFFACD',
  userBubble: '#4361ee',
  border: '#dee2e6',
  shadow: 'rgba(0,0,0,0.1)',
};

const QUICK_QUESTIONS = [
  "Cách tiết kiệm tiền?",
  "Đầu tư như thế nào?",
  "Cách quản lý chi tiêu?",
  "Gợi ý kế hoạch tài chính"
];

const MenuScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Xin chào! Tôi là trợ lý tài chính AI. Bạn cần hỗ trợ gì về quản lý chi tiêu, đầu tư hay tiết kiệm?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      isAI: true 
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      }
    };
    loadToken();
  }, []);

  const handleSend = async () => {
    if (!inputText.trim() || !token) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AICHATBOT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        const aiResponse: Message = {
          id: Date.now().toString(),
          text: data.text,
          time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAI: true,
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(data.error || 'Lỗi không xác định');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Có lỗi xảy ra, vui lòng thử lại',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer, 
      item.isAI ? styles.aiMessageContainer : styles.userMessageContainer
    ]}>
      {item.isAI ? (
        <FontAwesome5 name="robot" size={20} color={COLORS.primary} style={styles.avatar} />
      ) : (
        <MaterialIcons name="person" size={20} color={COLORS.textLight} style={styles.avatar} />
      )}
      <View style={[
        styles.messageBubble,
        item.isAI ? styles.aiMessageBubble : styles.userMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isAI ? styles.aiMessageText : styles.userMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timeText,
          item.isAI ? styles.aiTimeText : styles.userTimeText
        ]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../assets/images/bgmain.png')} // Replace with your background image
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <FontAwesome5 name="robot" size={24} color={COLORS.textLight} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Trợ Lý Tài Chính AI</Text>
              <Text style={styles.headerSubtitle}>Hỏi tôi về tiết kiệm, đầu tư và quản lý chi tiêu</Text>
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={messages.reverse()}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          inverted
          showsVerticalScrollIndicator={false}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        )}

        <View style={styles.quickActions}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          >
            {QUICK_QUESTIONS.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickButton}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickButtonText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.inputContainer, { height: '15%' }]} // Thêm height 15% ở đây
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <TextInput
            style={[styles.input,{ height: '80%' }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Nhập câu hỏi về tài chính..."
            placeholderTextColor="#95a5a6"
            multiline
          />
          <TouchableOpacity 
            onPress={handleSend} 
            style={styles.sendButton}
            disabled={!inputText.trim()}
          >
            <MaterialIcons 
              name="send" 
              size={24} 
              color={inputText.trim() ? COLORS.textLight : COLORS.border} 
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 30 : 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    maxWidth: '90%',
    bottom: 20,
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  avatar: {
    marginRight: 8,
    marginTop: 4,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aiMessageBubble: {
    backgroundColor: COLORS.aiBubble,
    borderTopLeftRadius: 0,
  },
  userMessageBubble: {
    backgroundColor: COLORS.userBubble,
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiMessageText: {
    color: COLORS.textDark,
  },
  userMessageText: {
    color: COLORS.textLight,
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
  aiTimeText: {
    color: '#95a5a6',
  },
  userTimeText: {
    color: 'rgba(255,255,255,0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 12,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 120,
    color: COLORS.textDark,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  quickButton: {
    backgroundColor: '#f1f3f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  quickButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 8,
    alignItems: 'center',
  },
});

export default MenuScreen;