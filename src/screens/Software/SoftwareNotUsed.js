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

export default class SoftwareNotUsed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  fetchData = async () => {
    this.setState({isLoading: true});
    const response = await fetch('https://hiapi.holosystems.net:3000/software');
    const software = await response.json();
    this.setState({data: software, isLoading: false});
  };

  componentDidMount() {
    this.fetchData();
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
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity
            style={{alignItems: 'flex-end', margin: 16}}
            onPress={this.props.navigation.openDrawer}>
            <AntDesign name="bars" size={35} color="#161924" />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>Software Dashboard</Text>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginBottom: 16,
                marginRight: 16,
              }}
              onPress={() => this.props.navigation.navigate('SoftwareCreate')}>
              <AntDesign name="plus" size={35} color="#161924" />
            </TouchableOpacity>
            <FlatList
              keyExtractor={item => `key-${item.id}`}
              data={this.state.data}
              renderItem={({item}) => {
                if (item.employee_id == null) {
                  return (
                    <ListItem
                      onPress={() =>
                        this.props.navigation.navigate('SoftwareDetail', {
                          item,
                        })
                      }
                      title={`${item.name} (${item.producer})`}
                      titleStyle={{fontWeight: 'bold', marginLeft: '2%'}}
                      rightTitle="Preis:"
                      rightSubtitle={`${item.price}`}
                      subtitle={item.license_type}
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

SoftwareNotUsed.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

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
