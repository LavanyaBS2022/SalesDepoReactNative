import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, FlatList, Alert, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { fetchListData, fetchItemDetails } from '../Services/apiService';
import { FontAwesome } from '@expo/vector-icons';

const ListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [fromDateObj, setFromDateObj] = useState(dayjs());
  const [toDateObj, setToDateObj] = useState(dayjs());
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const currentDate = dayjs().format('DD-MM-YY');
    setFromDate(currentDate);
    setToDate(currentDate);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false);
        return true; // Prevent default back action
      }
      return false; // Default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [modalVisible]);

  const handleRowPress = async (itemCode) => {
    try {
      const result = await fetchItemDetails(itemCode);
      console.log('Item details fetched:', result.data);
      setItemDetails(result.data.packets);
      setSelectedItem(itemCode);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleFetchData = async () => {
    console.log('Submit button pressed');
    console.log(`Fetching data from ${fromDate} to ${toDate}`);
    try {
      const result = await fetchListData(fromDate, toDate);
      console.log('Data fetched:', result.data);
      if (result.data.length === 0) {
        setErrorModalVisible(true);
      } else {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFromDateChange = (params) => {
    setFromDateObj(params.date);
    setFromDate(params.date.format('DD-MM-YY'));
    setShowFromDatePicker(false);
  };

  const handleToDateChange = (params) => {
    setToDateObj(params.date);
    setToDate(params.date.format('DD-MM-YY'));
    setShowToDatePicker(false);
  };

  const toggleFromDatePicker = () => {
    setShowFromDatePicker(!showFromDatePicker);
    if (showToDatePicker) setShowToDatePicker(false);
  };

  const toggleToDatePicker = () => {
    setShowToDatePicker(!showToDatePicker);
    if (showFromDatePicker) setShowFromDatePicker(false);
  };

  const toggleCheckbox = (itemCode) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [itemCode]: !prevState[itemCode]
    }));
  };

  const customStyles = {
    dateText: {
      color: '#3ABEF9',
    },
    placeholderText: {
      color: '#3ABEF9',
    },
    dateIcon: {
      position: 'absolute',
      right: 0,
      top: 4,
      marginLeft: 0,
      color: '#3ABEF9',
    },
  };

  renderItemDetails = () => {
  if (!selectedItem || !itemDetails) {
    return null;
  }

  return (
    <View style={styles.itemDetailsContainer}>
      <Text style={styles.itemDetailsHeader}>Item Details</Text>

      <FlatList
        data={itemDetails}
        keyExtractor={(item) => item.packet_Code.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemDetailsRow}>
            <View style={[styles.itemDetailsCell, { flex: 3 }]}>
              <Text>{item.packetname}</Text>
            </View>
            <View style={[styles.itemDetailsCell, { flex: 1 }]}>
              <Text>{item.qty}</Text>
            </View>
            <View style={[styles.itemDetailsCell, { flex: 2 }]}>
              <Text>{item.disp1}</Text>
            </View>
            <TouchableOpacity
              style={[styles.itemDetailsCell, { alignItems: 'center', justifyContent: 'center' }]}
              onPress={() => toggleCheckbox(item.packet_Code)}
            >
              <FontAwesome
                name={checkedItems[item.packet_Code] ? "check-square" : "square-o"}
                size={24}
                color="#3ABEF9"
              />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.itemDetailsHeaderRow}>
            <Text style={[styles.itemDetailsHeaderCell, { flex: 3 }]}>Item Name</Text>
            <Text style={[styles.itemDetailsHeaderCell, { flex: 1 }]}>Quantity</Text>
            <Text style={[styles.itemDetailsHeaderCell, { flex: 2 }]}>Packing</Text>
            <Text style={[styles.itemDetailsHeaderCell, { flex: 1, textAlign: 'center' }]}>Action</Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
      />
      <Button
        title="Close"
        onPress={() => setModalVisible(false)}
        color="#3ABEF9"
      />
    </View>
  );
};

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInUp" style={styles.title}>
        Day book
      </Animatable.Text>
      <View style={styles.datePickerContainer}>
  <View style={[styles.datePickerItem, { marginRight: 10 }]}>
    <Text style={styles.datePickerLabel}>From:</Text>
    <View style={styles.datePickerWrapper}>
      <TextInput
        style={styles.datePickerInput}
        value={fromDate}
        placeholder="Select date"
        onFocus={toggleFromDatePicker}
        showSoftInputOnFocus={false}
      />
      <TouchableOpacity onPress={toggleFromDatePicker}>
        <FontAwesome name="calendar" size={24} color="#3ABEF9" />
      </TouchableOpacity>
    </View>
  </View>
  <View style={[styles.datePickerItem, { marginRight: 10 }]}>
    <Text style={styles.datePickerLabel}>To:</Text>
    <View style={styles.datePickerWrapper}>
      <TextInput
        style={styles.datePickerInput}
        value={toDate}
        placeholder="Select date"
        onFocus={toggleToDatePicker}
        showSoftInputOnFocus={false}
      />
      <TouchableOpacity onPress={toggleToDatePicker}>
        <FontAwesome name="calendar" size={24} color="#3ABEF9" />
      </TouchableOpacity>
    </View>
  </View>
  <TouchableOpacity
    style={[
      styles.datePickerItem,
      styles.submitButton,
      { backgroundColor: '#3ABEF9' }
    ]}
    onPress={handleFetchData}
  >
    <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
  </TouchableOpacity>
</View>
{showFromDatePicker && (
  <View style={styles.datePickerContainer}>
    <DateTimePicker
      mode="single"
      date={fromDateObj}
      onChange={handleFromDateChange}
      style={{ backgroundColor: '#3ABEF9' }}
      customStyles={customStyles}
    />
  </View>
)}
{showToDatePicker && (
  <View style={styles.datePickerContainer}>
    <DateTimePicker
      mode="single"
      date={toDateObj}
      onChange={handleToDateChange}
      style={{ backgroundColor: '#3ABEF9' }}
      customStyles={customStyles}
    />
  </View>
)}
      {data.length > 0 && (
        <View style={styles.tableContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.TRANSFER_CODE.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleRowPress(item.TRANSFER_CODE)} style={styles.tableRow}>
                <Text style={styles.tableCell}>{dayjs(item.GP_DATE).format('DD-MM-YY')}</Text>
                <Text style={styles.tableCell}>{item.NAME}</Text>
                <Text style={styles.tableCell}>{item.INVOICE_NO}</Text>
                {/* <Text style={styles.tableCell}>{item.INDENT_TYPE}</Text> */}
              </TouchableOpacity>
            )}
            ListHeaderComponent={() => (
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>GP Date</Text>
                <Text style={styles.tableHeaderCell}>Customer Name</Text>
                <Text style={styles.tableHeaderCell}>Invoice No</Text>
                {/* <Text style={styles.tableHeaderCell}>Indent Type</Text> */}
              </View>
            )}
            stickyHeaderIndices={[0]} // Make the header sticky
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      )}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.5}
        style={styles.centeredModal}
      >
        <Animatable.View animation="fadeInUp" duration={500} style={styles.modalView}>
          {renderItemDetails()}
        </Animatable.View>
      </Modal>
      <Modal
        isVisible={errorModalVisible}
        onBackdropPress={() => setErrorModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.5}
        style={styles.centeredModal}
      >
        <Animatable.View animation="fadeInUp" duration={500} style={styles.modalView}>
          <Text style={styles.modalTitle}>No Data Found</Text>
          <Text style={styles.errorText}>No items found for the selected date range. Please select another date range.</Text>
          <Button
            title="Close"
            onPress={() => setErrorModalVisible(false)}
            color="#3ABEF9"
          />
        </Animatable.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3ABEF9',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    borderBottomEndRadius:100,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  datePickerItem: {
    flex: 1,
    marginRight: 10,
  },
  datePickerLabel: {
    fontSize: 16,
    color: '#3ABEF9',
  },
  datePickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3ABEF9',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  datePickerInput: {
    height: 40,
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    marginTop:22
  },
  tableContainer: {
    flex: 1,
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3ABEF9',
    padding: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  centeredModal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalView: {
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
    color: '#3ABEF9',
  },
  itemDetailsContainer: {
    width: '100%',
    marginBottom: 100,
    marginTop: 30,
  },
  itemDetailsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3ABEF9',
    textAlign: 'center',
  },
  itemDetailsHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#3ABEF9',
    padding: 10,
  },
  itemDetailsHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  itemDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 10,
  },
  itemDetailsCell: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 16,
    textAlign: 'center',
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});

export default ListScreen;
