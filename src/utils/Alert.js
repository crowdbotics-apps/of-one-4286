import { Alert } from 'react-native';

export const alert = (text) => {
  Alert.alert('Oops!', text, [{ text: 'OK' }], { cancelable: false });
};

export const success = (text) => {
  Alert.alert('Success!', text, [{ text: 'OK' }], { cancelable: false });
};

export const info = (text) => {
  Alert.alert('Info!', text, [{ text: 'OK' }], { cancelable: false });
};

