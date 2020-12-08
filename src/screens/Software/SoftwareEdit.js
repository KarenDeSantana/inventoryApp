import React from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {Text, Input} from 'react-native-elements';
import Spacer from '../../components/Spacer';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

export default class SoftwareEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      producer: '',
      license_type: '',
      price: '',
      employee_id: '',
      data: [],
    };
  }

  fetchData = async () => {
    const response = await fetch(
      'https://hiapi.holosystems.net:3000/employees',
    );
    const employees = await response.json();
    this.setState({data: employees});
  };

  componentDidMount() {
    const software = this.props.navigation.state.params.software;
    this.setState({
      id: software.id,
      name: software.name,
      description: software.description,
      producer: software.producer,
      license_type: software.license_type,
      price: software.price,
      employee_id: software.employee_id,
    });
    this.fetchData();
  }

  updateSoftware = async () => {
    const software = this.props.navigation.state.params.software;
    await fetch(`https://hiapi.holosystems.net:3000/software/${software.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        producer: this.state.producer,
        license_type: this.state.license_type,
        price: this.state.price,
        employee_id: this.state.employee_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

    this.props.navigation.navigate('SoftwareUsed');
  };

  deleteSoftware = async () => {
    const software = this.props.navigation.state.params.software;
    await fetch(`https://hiapi.holosystems.net:3000/software/${software.id}`, {
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

    this.props.navigation.navigate('SoftwareUsed');
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
                  Software Edit
                </Text>
              </Spacer>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Input
                  label="Name"
                  value={this.state.name}
                  onChangeText={name => this.setState({name: name})}
                />
                <Spacer />
                <Input
                  label="Beschreibung"
                  value={this.state.description}
                  onChangeText={description =>
                    this.setState({lastname: description})
                  }
                />
                <Spacer />
                <Input
                  label="Hersteller"
                  value={this.state.producer}
                  onChangeText={producer => this.setState({producer: producer})}
                />
                <Spacer />
                <Picker
                  style={{
                    backgroundColor: 'white',
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                  selectedValue={this.state.license_type}
                  onValueChange={license_type => this.setState({license_type: license_type})}>
                  <Picker.Item label={'Lizenzart auswählen'} value={-1} />
                  <Picker.Item label={'Einmallizenz'} value={'Einmallizenz'} />
                  <Picker.Item label={'Jahreslizenz'} value={'Jahreslizenz'} />
                  <Picker.Item label={'Monatslizenz'} value={'Monatslizenz'} />
                </Picker>
                <Input
                  label="Preis"
                  keyboardType="numeric"
                  value={`${this.state.price}`}
                  onChangeText={price => this.setState({price: price})}
                />
                <Picker
                  style={{
                    backgroundColor: 'white',
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                  selectedValue={this.state.employee_id}
                  onValueChange={employee_id =>
                    this.setState({employee_id: employee_id})
                  }>
                  <Picker.Item label={'Mitarbeiter auswählen'} value={-1} />
                  {this.state.data.map(item => {
                    return (
                      <Picker.Item
                        label={`${item.firstname} ${item.lastname}`}
                        value={item.id}
                        key={item.id}
                      />
                    );
                  })}
                </Picker>
                <Spacer />
              </ScrollView>
              <Spacer>
                <Button title="Speichern" onPress={this.updateSoftware} />
                <Button
                  color="#fc3d39"
                  title="Löschen"
                  onPress={this.deleteSoftware}
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
