import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
import {ListItem, SearchBar} from 'react-native-elements';

console.disableYellowBox = true;

export default class EmployeeInventory extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Ausstattung',
  });

  constructor(props) {
    super(props);
    this.state = {
      hardware: [],
      software: [],
      isLoading: false,
      data: [],
    };
  }

  fetchHardware = async () => {
    this.setState({isLoading: true});
    const employee = this.props.navigation.state.params.employee;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/employees/hardware/${employee.id}`,
    );
    const hardware = await response.json();
    this.setState({hardware: hardware, isLoading: false});
  };

  fetchSoftware = async () => {
    this.setState({isLoading: true});
    const employee = this.props.navigation.state.params.employee;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/employees/software/${employee.id}`,
    );
    const software = await response.json();
    this.setState({software: software, isLoading: false});
  };

  componentDidMount() {
    this.fetchHardware();
    this.fetchSoftware();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '90%',
          backgroundColor: '#279cb1',
          marginLeft: '5%',
        }}
      />
    );
  };

  render() {
    const employee = this.props.navigation.state.params.employee;
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
              Ausstattung {employee.firstname} {employee.lastname}
            </Text>
            <Text
              style={{
                marginLeft: 16,
                fontWeight: '700',
                fontSize: 25,
                marginBottom: 10,
              }}>
              Hardware
            </Text>
            <FlatList
              keyExtractor={item => `key-${item.id}`}
              data={this.state.hardware}
              renderItem={({item}) => {
                return (
                  <ListItem
                    onPress={() =>
                      this.props.navigation.navigate('HardwareDetail', {
                        item,
                      })
                    }
                    title={`${item.model} (${item.type})`}
                    titleStyle={{fontWeight: 'bold', marginLeft: '2%'}}
                    rightTitle="Price:"
                    rightSubtitle={`${item.price} €`}
                    subtitle={item.producer}
                    subtitleStyle={{marginLeft: '2%'}}
                    containerStyle={{borderBottomWidth: 0}}
                  />
                );
              }}
              refreshing={this.state.isLoading}
              onRefresh={this.fetchData}
              ItemSeparatorComponent={this.renderSeparator}
            />
            <Text
              style={{
                marginLeft: 16,
                fontWeight: '700',
                fontSize: 25,
                marginBottom: 10,
                marginTop: 30,
              }}>
              Software
            </Text>
            <FlatList
              keyExtractor={item => `key-${item.id}`}
              data={this.state.software}
              renderItem={({item}) => {
                if (item.employee_id !== null) {
                  return (
                    <ListItem
                      onPress={() =>
                        this.props.navigation.navigate('SoftwareDetail', {
                          item,
                        })
                      }
                      title={`${item.name} (${item.producer})`}
                      titleStyle={{fontWeight: 'bold', marginLeft: '2%'}}
                      rightTitle="License_type:"
                      rightSubtitle={`${item.license_type}`}
                      subtitle={item.description}
                      subtitleStyle={{marginLeft: '2%'}}
                      containerStyle={{borderBottomWidth: 0}}
                    />
                  );
                }
              }}
              refreshing={this.state.isLoading}
              onRefresh={this.fetchData}
              ItemSeparatorComponent={this.renderSeparator}
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
});
