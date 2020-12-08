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

export default class HardwareEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      type: '',
      model: '',
      producer: '',
      serial_number: '',
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
    const hardware = this.props.navigation.state.params.hardware;
    this.setState({
      id: hardware.id,
      type: hardware.type,
      model: hardware.model,
      producer: hardware.producer,
      serial_number: hardware.serial_number,
      price: hardware.price,
      employee_id: hardware.employee_id,
    });
    this.fetchData();
  }

  updateHardware = async () => {
    const hardware = this.props.navigation.state.params.hardware;
    await fetch(`https://hiapi.holosystems.net:3000/hardware/${hardware.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        type: this.state.type,
        model: this.state.model,
        producer: this.state.producer,
        serial_number: this.state.serial_number,
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

    this.props.navigation.navigate('HardwareUsed');
  };

  deleteHardware = async () => {
    const hardware = this.props.navigation.state.params.hardware;
    await fetch(`https://hiapi.holosystems.net:3000/hardware/${hardware.id}`, {
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

    this.props.navigation.navigate('HardwareUsed');
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
                  Hardware Edit
                </Text>
              </Spacer>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Input
                  label="Typ"
                  value={this.state.type}
                  onChangeText={type => this.setState({type: type})}
                />
                <Spacer />
                <Input
                  label="Modell"
                  value={this.state.model}
                  onChangeText={model => this.setState({lastname: model})}
                />
                <Spacer />
                <Input
                  label="Hersteller"
                  value={this.state.producer}
                  onChangeText={producer =>
                    this.setState({producer: producer})
                  }
                />
                <Spacer />
                <Input
                  label="Seriennummer"
                  value={this.state.serial_number}
                  onChangeText={serial_number =>
                    this.setState({serial_number: serial_number})
                  }
                />
                <Spacer />
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
                <Button title="Speichern" onPress={this.updateHardware} />
                <Button
                  color="#fc3d39"
                  title="Löschen"
                  onPress={this.deleteHardware}
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
