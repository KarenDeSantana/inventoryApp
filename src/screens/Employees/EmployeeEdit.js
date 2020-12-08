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

export default class EmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstname: '',
      lastname: '',
      birthday: '',
      email: '',
      role: '',
      hired_since: '',
    };
  }

  componentDidMount() {
    const employee = this.props.navigation.state.params.employee;
    this.setState({
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      birthday: employee.birthday,
      email: employee.email,
      role: employee.role,
      hired_since: employee.hired_since,
    });
  }

  updateEmployee = async () => {
    const employee = this.props.navigation.state.params.employee;
    await fetch(`https://hiapi.holosystems.net:3000/employees/${employee.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        birthday: this.state.birthday,
        email: this.state.email,
        role: this.state.role,
        hired_since: this.state.hired_since,
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

  deleteEmployee = async () => {
    const employee = this.props.navigation.state.params.employee;
    await fetch(`https://hiapi.holosystems.net:3000/employees/${employee.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
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
                  Employee Edit
                </Text>
              </Spacer>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Input
                  label="Vorname"
                  value={this.state.firstname}
                  onChangeText={firstname =>
                    this.setState({firstname: firstname})
                  }
                />
                <Spacer />
                <Input
                  label="Nachname"
                  value={this.state.lastname}
                  onChangeText={lastname => this.setState({lastname: lastname})}
                />
                <Spacer />
                <Input
                  label="Geburtstag"
                  value={this.state.birthday}
                  onChangeText={birthday => this.setState({birthday: birthday})}
                />
                <Spacer />
                <Input
                  label="Email"
                  value={this.state.email}
                  onChangeText={email => this.setState({email: email})}
                />
                <Spacer />
                <Input
                  label="Rolle"
                  value={this.state.role}
                  onChangeText={role => this.setState({role: role})}
                />
                <Spacer />
                <Input
                  label="Angestellt seit"
                  value={this.state.hired_since}
                  onChangeText={hired_since =>
                    this.setState({hired_since: hired_since})
                  }
                />
                <Spacer />
              </ScrollView>
              <Spacer>
                <Button title="Speichern" onPress={this.updateEmployee} />
                <Button
                  color="#fc3d39"
                  title="Löschen"
                  onPress={this.deleteEmployee}
                />
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
