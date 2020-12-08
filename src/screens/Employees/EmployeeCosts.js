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

export default class EmployeeCosts extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Kosten',
  });

  constructor(props) {
    super(props);
    this.state = {
      hardware: [],
      softwareOnce: [],
      softwareYear: [],
      softwareMonth: [],
      isLoading: false,
    };
  }

  fetchHardwareCosts = async () => {
    this.setState({isLoading: true});
    const employee = this.props.navigation.state.params.employee;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/employees/hardware/costs/${employee.id}`,
    );
    const hardware = await response.json();
    this.setState({hardware: hardware, isLoading: false});
  };

  fetchSoftwareCostsOnce = async () => {
    this.setState({isLoading: true});
    const employee = this.props.navigation.state.params.employee;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/employees/software/costs/once/${employee.id}`,
    );
    const softwareOnce = await response.json();
    this.setState({softwareOnce: softwareOnce, isLoading: false});
  };

  fetchSoftwareCostsYear = async () => {
    this.setState({isLoading: true});
    const employee = this.props.navigation.state.params.employee;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/employees/software/costs/year/${employee.id}`,
    );
    const softwareYear = await response.json();
    this.setState({softwareYear: softwareYear, isLoading: false});
  };

  fetchSoftwareCostsMonth = async () => {
    this.setState({isLoading: true});
    const employee = this.props.navigation.state.params.employee;
    const response = await fetch(
      `https://hiapi.holosystems.net:3000/employees/software/costs/month/${employee.id}`,
    );
    const softwareMonth = await response.json();
    this.setState({softwareMonth: softwareMonth, isLoading: false});
  };

  componentDidMount() {
    this.fetchHardwareCosts();
    this.fetchSoftwareCostsOnce();
    this.fetchSoftwareCostsYear();
    this.fetchSoftwareCostsMonth();
  }

  render() {
    const employee = this.props.navigation.state.params.employee;
    const hardwareSum = this.state.hardware.map(hardware => {
      if (hardware.HardwareSum !== null) {
        return `${hardware.HardwareSum.toFixed(2)} €`;
      } else {
        const msg = 'Keine Hardware vorhanden.';
        return msg;
      }
    });
    const softwareSumOnce = this.state.softwareOnce.map(softwareOnce => {
      if (softwareOnce.SoftwareOnceSum !== null) {
        return `${softwareOnce.SoftwareOnceSum.toFixed(2)} €`;
      } else {
        const msg = 'Keine Software mit Einmallizenz vorhanden.';
        return msg;
      }
    });
    const softwareSumYear = this.state.softwareYear.map(softwareYear => {
      if (softwareYear.SoftwareYearSum !== null) {
        return `${softwareYear.SoftwareYearSum.toFixed(2)} €`;
      } else {
        const msg = 'Keine Software mit Jahreslizenz vorhanden.';
        return msg;
      }
    });
    const softwareSumMonth = this.state.softwareMonth.map(softwareMonth => {
      if (softwareMonth.SoftwareMonthSum !== null) {
        return `${softwareMonth.SoftwareMonthSum.toFixed(2)} €`;
      } else {
        const msg = 'Keine Software mit Monatslizenz vorhanden.';
        return msg;
      }
    });
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
            <Text style={styles.text}>
              {employee.firstname} {employee.lastname}
            </Text>
            <Text
              style={{
                marginLeft: 16,
                fontWeight: '700',
                fontSize: 25,
                marginBottom: 10,
              }}>
              Hardware Kosten
            </Text>
            <Text style={{fontSize: 20, marginBottom: 25}}>{hardwareSum}</Text>
            <Text
              style={{
                marginLeft: 16,
                fontWeight: '700',
                fontSize: 25,
                marginBottom: 10,
              }}>
              Software Kosten Einmalig
            </Text>
            <Text style={{fontSize: 20, marginBottom: 25}}>
              {softwareSumOnce}
            </Text>
            <Text
              style={{
                marginLeft: 16,
                fontWeight: '700',
                fontSize: 25,
                marginBottom: 10,
              }}>
              Software Kosten Jahreslizenzen
            </Text>
            <Text style={{fontSize: 20, marginBottom: 25}}>
              {softwareSumYear}
            </Text>
            <Text
              style={{
                marginLeft: 16,
                fontWeight: '700',
                fontSize: 25,
                marginBottom: 10,
              }}>
              Software Kosten Monatslizenzen
            </Text>
            <Text style={{fontSize: 20, marginBottom: 25}}>
              {softwareSumMonth}
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
    fontSize: 30,
    fontWeight: '800',
    marginBottom: '5%',
    textAlign: 'center',
  },
});
