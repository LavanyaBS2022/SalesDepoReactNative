import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ImageBackground, Button } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { loginUser } from '../Services/apiService';
import ListScreen from './ListScreen';

const LoginScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting login with:', code, password);
      const response = await loginUser(code, password);
      console.log('Login response:', response);

      if (response && response.token) { // Assuming your token is in 'response.token'
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ' ' }], // Replace 'HomeScreen' with your target screen
          })
        );
      } else {
        setErrorMessage('Invalid Credentials');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setModalVisible(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to salesDepo</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Code"
            value={code}
            onChangeText={setCode}
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.toggleButton} onPress={togglePasswordVisibility}>
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Invalid Credentials</Text>
              <Text style={styles.modalText}>{errorMessage}</Text>
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color="#3ABEF9"
              />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3ABEF9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
});

export default LoginScreen;
