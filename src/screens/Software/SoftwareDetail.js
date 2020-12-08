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

export default class SoftwareDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  fetchData = async () => {
    const softwareId = this.props.navigation.state.params.item;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/software/${softwareId.id}`,
    );
    const softwareEmp = await response.json();
    this.setState({data: softwareEmp});
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const software = this.props.navigation.state.params.item;
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
              {software.name} ({software.producer})
            </Text>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginBottom: 16,
                marginRight: 16,
              }}
              onPress={() =>
                this.props.navigation.navigate('SoftwareEdit', {software})
              }>
              <Entypo name="edit" size={30} color="#161924" />
            </TouchableOpacity>
            <Text style={styles.label}>Name: {software.name}</Text>
            <Text style={styles.label}>
              Beschreibung: {software.description}
            </Text>
            <Text style={styles.label}>Hersteller: {software.producer}</Text>
            <Text style={styles.label}>Lizenzart: {software.license_type}</Text>
            <Text style={styles.label}>Preis: {software.price} €</Text>
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
