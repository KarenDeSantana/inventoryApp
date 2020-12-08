import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
import Entypo from 'react-native-vector-icons/Entypo';
Entypo.loadFont();

export default class EmployeeProfile extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Profil',
  });

  render() {
    const employee = this.props.navigation.state.params.item;
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity
            style={{alignItems: 'flex-end', margin: 16}}
            onPress={this.props.navigation.openDrawer}>
            <AntDesign name="bars" size={35} color="#161924" />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>
              {employee.firstname} {employee.lastname}
            </Text>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginBottom: 16,
                marginRight: 16,
              }}
              onPress={() =>
                this.props.navigation.navigate('EmployeeEdit', {employee})
              }>
              <Entypo name="edit" size={30} color="#161924" />
            </TouchableOpacity>
            <Text style={styles.label}>Vorname: {employee.firstname}</Text>
            <Text style={styles.label}>Nachname: {employee.lastname}</Text>
            <Text style={styles.label}>Geburtstag: {employee.birthday}</Text>
            <Text style={styles.label}>Email: {employee.email}</Text>
            <Text style={styles.label}>Rolle: {employee.role}</Text>
            <Text style={styles.label}>
              Angestellt seit: {employee.hired_since}
            </Text>
            <Button
              title="Inventar"
              onPress={() =>
                this.props.navigation.navigate('EmployeeInventory', {
                  employee,
                })
              }
            />
            <Button
              title="Kostenübersicht"
              onPress={() =>
                this.props.navigation.navigate('EmployeeCosts', {
                  employee,
                })
              }
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    color: '#161924',
    fontSize: 25,
    fontWeight: '800',
    marginBottom: '5%',
    textAlign: 'center',
  },
  label: {
    color: '#161924',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
});
