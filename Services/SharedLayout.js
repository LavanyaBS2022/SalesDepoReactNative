import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal,Button } from 'react-native';
import { AuthContext } from './AuthContext';
import { FontAwesome } from '@expo/vector-icons'; 

const SharedLayout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>App Title</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome name="user-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>User Options</Text>
            <TouchableOpacity style={styles.option} onPress={handleLogout}>
              <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    height: 60,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
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
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SharedLayout;
