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

export default class SoftwareCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      producer: '',
      license_type: '',
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

  createSoftware = async () => {
    const {name} = this.state;
    const {description} = this.state;
    const {producer} = this.state;
    const {license_type} = this.state;
    const {price} = this.state;
    const {employee_id} = this.state;

    await fetch('https://hiapi.holosystems.net:3000/software', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        producer: producer,
        license_type: license_type,
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
                  Software Create
                </Text>
              </Spacer>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Input
                  label="Name"
                  onChangeText={name => this.setState({name})}
                />
                <Spacer />
                <Input
                  label="Beschreibung"
                  onChangeText={description => this.setState({description})}
                />
                <Spacer />
                <Input
                  label="Hersteller"
                  onChangeText={producer => this.setState({producer})}
                />
                <Picker
                  style={{
                    backgroundColor: 'white',
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                  selectedValue={this.state.license_type}
                  onValueChange={license_type => this.setState({license_type})}>
                  <Picker.Item label={'Lizenzart auswählen'} value={-1} />
                  <Picker.Item label={'Einmallizenz'} value={'Einmallizenz'} />
                  <Picker.Item label={'Jahreslizenz'} value={'Jahreslizenz'} />
                  <Picker.Item label={'Monatslizenz'} value={'Monatslizenz'} />
                </Picker>
                <Input
                  label="Preis"
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
                <Button title="Hinzufügen" onPress={this.createSoftware} />
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
