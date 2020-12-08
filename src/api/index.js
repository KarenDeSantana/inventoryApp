import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let url;
if (__DEV__) {
  url = 'http://88.99.170.42:3000';
}

const instance = axios.create({
  baseURL: url,
});

export default instance;
