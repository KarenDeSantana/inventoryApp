import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
import Entypo from 'react-native-vector-icons/Entypo';
Entypo.loadFont();

export default class HardwareDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  fetchData = async () => {
    const hardwareId = this.props.navigation.state.params.item;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/hardware/${hardwareId.id}`,
    );
    const hardwareEmp = await response.json();
    this.setState({data: hardwareEmp});
  };

  componentDidMount() {
    this.fetchData();
  }
  
  render() {
    const hardware = this.props.navigation.state.params.item;
    const firstname = this.state.data.map(data => {
      return data.firstname;
    });
    const lastname = this.state.data.map(data => {
      return data.lastname;
    });
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
              {hardware.model} ({hardware.producer})
            </Text>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginBottom: 16,
                marginRight: 16,
              }}
              onPress={() =>
                this.props.navigation.navigate('HardwareEdit', {hardware})
              }>
              <Entypo name="edit" size={30} color="#161924" />
            </TouchableOpacity>
            <Text style={styles.label}>Modell: {hardware.model}</Text>
            <Text style={styles.label}>Hersteller: {hardware.producer}</Text>
            <Text style={styles.label}>Typ: {hardware.type}</Text>
            <Text style={styles.label}>
              Seriennummer: {hardware.serial_number}
            </Text>
            <Text style={styles.label}>Preis: {`${hardware.price}`} €</Text>
            <Text style={styles.label}>
              Benutzer: {firstname} {lastname}
            </Text>
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
