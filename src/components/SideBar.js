import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

export default Sidebar = props => (
  <ScrollView>
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{width: undefined, padding: 16, paddingTop: 100}}>
      <Text style={styles.text}>Welcome to holosystems Inventory!</Text>
    </ImageBackground>
    <View style={styles.container}>
      <DrawerNavigatorItems {...props} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
});
