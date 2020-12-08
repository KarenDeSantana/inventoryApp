import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons.loadFont();
import {ListItem, SearchBar} from 'react-native-elements';

export default class EmployeeDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      fullData: [],
      error: null,
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({isLoading: true});

    await fetch('https://hiapi.holosystems.net:3000/employees')
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          data: resJson,
          error: null,
          isLoading: false,
        });
        this.arrayholder = resJson;
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#279cb1',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.role.toUpperCase()}   
    ${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({data: newData});
  };

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
            <Text style={styles.text}>Employee Screen</Text>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginBottom: 16,
                marginRight: 16,
              }}
              onPress={() => this.props.navigation.navigate('EmployeeCreate')}>
              <AntDesign name="plus" size={35} color="#161924" />
            </TouchableOpacity>
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate('EmployeeProfile', {
                      item,
                    })
                  }
                  title={`${item.firstname} ${item.lastname}`}
                  titleStyle={{fontWeight: 'bold', marginLeft: '2%'}}
                  rightTitle="Angestellt seit:"
                  rightSubtitle={item.hired_since}
                  subtitle={item.role}
                  subtitleStyle={{marginLeft: '2%'}}
                  containerStyle={{borderBottomWidth: 0}}
                />
              )}
              refreshing={this.state.isLoading}
              onRefresh={this.makeRemoteRequest}
              keyExtractor={item => `key-${item.id}`}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

EmployeeDashboard.navigationOptions = () => {
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
