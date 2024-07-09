import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Checkbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {checked ? (
        <FontAwesome name="check-square-o" size={24} color="#4CAF50" />
      ) : (
        <FontAwesome name="square-o" size={24} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

// import React, {useState} from 'react';
// import {CheckBox, Text, StyleSheet, View} from 'react-native';

// const Checkbox = () => {
//   const [isSelected, setSelection] = useState(false);

//   return (
//     <View style={styles.container}>
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={isSelected}
//           onValueChange={setSelection}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>Do you like React Native?</Text>
//       </View>
//       <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   checkbox: {
//     alignSelf: 'center',
//   },
//   label: {
//     margin: 8,
//   },
// });

// export default Checkbox;
