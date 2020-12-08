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

export default class HardwareCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      model: '',
      producer: '',
      serial_number: '',
      price: '',
      employee_id: null,
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
    this.fetchData();
  }

  createHardware = async () => {
    const {type} = this.state;
    const {model} = this.state;
    const {producer} = this.state;
    const {serial_number} = this.state;
    const {price} = this.state;
    const {employee_id} = this.state;

    await fetch('https://hiapi.holosystems.net:3000/hardware', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        model: model,
        producer: producer,
        serial_number: serial_number,
        price: price,
        employee_id: employee_id,
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
                  Hardware Create
                </Text>
              </Spacer>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Input
                  label="Typ"
                  onChangeText={type => this.setState({type})}
                />
                <Spacer />
                <Input
                  label="Modell"
                  onChangeText={model => this.setState({model})}
                />
                <Spacer />
                <Input
                  label="Hersteller"
                  onChangeText={producer => this.setState({producer})}
                />
                <Spacer />
                <Input
                  label="Seriennummer"
                  onChangeText={serial_number => this.setState({serial_number})}
                />
                <Spacer />
                <Input
                  label="Peis"
                  keyboardType="numeric"
                  onChangeText={price => this.setState({price})}
                />
                <Picker
                  style={{
                    backgroundColor: 'white',
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                  selectedValue={this.state.employee_id}
                  onValueChange={employee_id => this.setState({employee_id})}>
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
                <Button title="Hinzufügen" onPress={this.createHardware} />
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
