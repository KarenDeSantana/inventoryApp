import React from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Text, Input} from 'react-native-elements';
import Spacer from '../../components/Spacer';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

export default class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      birthday: '',
      email: '',
      role: '',
      hired_since: '',
    };
  }

  createEmployee = async () => {
    const {firstname} = this.state;
    const {lastname} = this.state;
    const {birthday} = this.state;
    const {email} = this.state;
    const {role} = this.state;
    const {hired_since} = this.state;

    await fetch('https://hiapi.holosystems.net:3000/employees', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        email: email,
        role: role,
        hired_since: hired_since,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
    this.props.navigation.navigate('EmployeeDashboard');
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity
            style={{alignItems: 'flex-end', margin: 16}}
            onPress={this.props.navigation.openDrawer}>
            <AntDesign name="bars" size={35} color="#161924" />
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <SafeAreaView style={{flex: 1}}>
              <Spacer>
                <Text style={{marginBottom: 15}} h3>
                  Employee Create
                </Text>
              </Spacer>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Input
                  label="Vorname"
                  onChangeText={firstname => this.setState({firstname})}
                />
                <Spacer />
                <Input
                  label="Nachname"
                  onChangeText={lastname => this.setState({lastname})}
                />
                <Spacer />
                <Input
                  label="Geburtstag"
                  onChangeText={birthday => this.setState({birthday})}
                />
                <Spacer />
                <Input
                  label="Email"
                  onChangeText={email => this.setState({email})}
                />
                <Spacer />
                <Input
                  label="Rolle"
                  onChangeText={role => this.setState({role})}
                />
                <Spacer />
                <Input
                  label="Angestellt seit:"
                  onChangeText={hired_since => this.setState({hired_since})}
                />
                <Spacer />
              </ScrollView>
              <Spacer>
                <Button title="Hinzufügen" onPress={this.createEmployee} />
              </Spacer>
            </SafeAreaView>
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
    fontSize: 20,
    fontWeight: '500',
  },
});
