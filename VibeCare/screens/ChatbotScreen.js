import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Keyboard,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [historyVisible, setHistoryVisible] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const flatListRef = useRef(null);

  // Dummy send message
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, sender: 'user', timestamp: new Date() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput('');
    Keyboard.dismiss();

    setLoading(true);

    setTimeout(() => {
      const botMessage = {
        text: "This is a dummy response from Dodo 😊",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  // Dummy chat history
  const handleOpenHistory = async () => {
    setLoadingHistory(true);
    setTimeout(() => {
      setChatHistory([
        { text: "Hi Dodo!", sender: "user", timestamp: new Date() },
        { text: "Hello! How can I help you today?", sender: "bot", timestamp: new Date() }
      ]);
      setLoadingHistory(false);
      setHistoryVisible(true);
    }, 800);
  };

  const deleteChatHistory = () => {
    setChatHistory([]);
    setShowDeleteAlert(false);
    setShowSuccessAlert(true);
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setInfoVisible(true)}>
          <Image source={require('../assets/images/logo.png')} style={styles.infoIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenHistory}>
          <Image source={require('../assets/images/history.png')} style={styles.historyIcon} />
        </TouchableOpacity>
      </View>

      {messages.length < 5 && (
        <View style={styles.chatbotImageContainer}>
          <Image source={require('../assets/images/dodo.png')} style={styles.chatbotImage} />
        </View>
      )}

      {/* Welcome */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {username}!</Text>
        <Text style={styles.subtitle}>Let's have fun with Dodo!</Text>
      </View>

      {/* Chat messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={userInput}
          onChangeText={setUserInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity 
          style={[styles.sendButton, loading && styles.sendButtonDisabled]} 
          onPress={sendMessage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Image source={require('../assets/images/logo.png')} style={styles.sendIcon} />
          )}
        </TouchableOpacity>
      </View>

      {/* Info Modal */}
      <Modal visible={infoVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.infoModalContent}>
            <Image source={require('../assets/images/logo.png')} style={styles.infoImage} />
            <Text style={styles.infoTitle}>About Dodo</Text>
            <Text style={styles.infoText}>
              This is a dummy version of Dodo chatbot. 
              {"\n\n"}It shows how the UI works without connecting to backend.
            </Text>
            <TouchableOpacity onPress={() => setInfoVisible(false)} style={styles.infoCloseButton}>
              <Text style={styles.infoCloseText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* History Modal */}
      <Modal visible={historyVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chat History</Text>
            {loadingHistory ? (
              <ActivityIndicator size="large" color="#6a51af" style={styles.loadingIndicator} />
            ) : (
              <>
                <FlatList
                  data={showFullHistory ? chatHistory : chatHistory.slice(-15)}
                  renderItem={({ item }) => (
                    <View style={[
                      styles.historyMessage, 
                      item.sender === 'user' ? styles.historyUserMessage : styles.historyBotMessage
                    ]}>
                      <Text style={styles.historyMessageText}>
                        <Text style={styles.historySender}>
                          {item.sender === 'user' ? 'You: ' : 'Dodo: '}
                        </Text>
                        {item.text}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.historyList}
                  contentContainerStyle={styles.historyContent}
                />
                {chatHistory.length > 0 && (
                  <TouchableOpacity onPress={() => setShowDeleteAlert(true)} style={styles.delete}>
                    <Text style={styles.deleteText}>Delete All History</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => setShowFullHistory(!showFullHistory)} style={styles.toggleHistoryButton}>
                  <Text style={styles.toggleHistoryButtonText}>
                    {showFullHistory ? 'Show Recent' : 'View Full History'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => setHistoryVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Alert */}
      <Modal transparent visible={showDeleteAlert}>
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>Delete Chat History</Text>
            <Text style={styles.alertMessage}>Are you sure you want to delete all your chat history?</Text>
            <View style={styles.alertButtonContainer}>
              <TouchableOpacity style={[styles.alertButton, styles.cancelButton]} onPress={() => setShowDeleteAlert(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.alertButton, styles.deleteButton]} onPress={deleteChatHistory}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Alert */}
      <Modal transparent visible={showSuccessAlert}>
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>Success</Text>
            <Text style={styles.alertMessage}>Your chat history has been deleted successfully!</Text>
            <TouchableOpacity 
              style={[styles.alertButton, styles.successButton]}
              onPress={() => setShowSuccessAlert(false)}
            >
              <Text style={styles.successButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    // backgroundColor: '#6a51af',
    top:50,
    paddingHorizontal:30,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
    // tintColor: '#fff'
  },
  historyIcon: {
    width: 28,
    height: 28,
    // tintColor: '#fff'
  },
  infoIcon: {
    width: 28,
    height: 38,
    // tintColor: '#fff'
  },
  chatbotImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  chatbotImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#6a51af'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a3c8f',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 15
  },
  chatContent: {
    paddingBottom: 15
  },
  message: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  userMessage: {
    backgroundColor: '#e3f2fd',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0
  },
  botMessage: {
    backgroundColor: '#ede7f6',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 10
  },
  sendButton: {
    backgroundColor: '#6a51af',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonDisabled: {
    backgroundColor: '#b39ddb'
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: windowWidth * 0.9,
    maxHeight: windowHeight * 0.8,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  infoModalContent: {
    width: windowWidth * 0.85,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a51af',
    marginBottom: 15,
    textAlign: 'center'
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a51af',
    marginVertical: 15,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  infoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#6a51af'
  },
  historyList: {
    flexGrow: 1,
    marginBottom: 15
  },
  historyContent: {
    paddingBottom: 10
  },
  historyMessage: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  historyUserMessage: {
    backgroundColor: '#e3f2fd',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0
  },
  historyBotMessage: {
    backgroundColor: '#ede7f6',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0
  },
  historyMessageText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20
  },
  historySender: {
    fontWeight: 'bold',
    color: '#6a51af'
  },
  historyTime: {
    fontSize: 11,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end'
  },
  delete: {
    // backgroundColor: '#ff5252',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center'
  },
  deleteText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    right:120,
    top:20,
  },
  toggleHistoryButton: {
    backgroundColor: '#6a51af',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center'
  },
  toggleHistoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  closeButton: {
    backgroundColor: '#6a51af',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },
  infoCloseButton: {
    backgroundColor: '#6a51af',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  infoCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  loadingIndicator: {
    marginVertical: 30
  },
  alertContainer: {
    backgroundColor: '#f5f7ff',
    borderRadius: 15,
    padding: 20
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a51af',
    marginBottom: 10
  },
  alertMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20
  },
  alertButton: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5
  },



alertOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
alertContainer: {
  width: '80%',
  backgroundColor: 'white',
  borderRadius: 15,
  padding: 20,
  alignItems: 'center',
},
alertTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#6a51af',
  marginBottom: 10,
},
alertMessage: {
  fontSize: 16,
  color: '#555',
  marginBottom: 20,
  textAlign: 'center',
},
alertButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
alertButton: {
  padding: 12,
  borderRadius: 8,
  width: '45%',
  alignItems: 'center',
},
cancelButton: {
  backgroundColor: '#e0e0e0',
},
deleteButton: {
  backgroundColor: '#ff5252',
},
cancelButtonText: {
  color: '#333',
  fontWeight: 'bold',
},
deleteButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
successButton: {
  backgroundColor: '#6a51af',
  width: '100%',
},
successButtonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default ChatBotScreen;