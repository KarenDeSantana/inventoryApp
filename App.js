import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Dimensions} from 'react-native';

import Dashboard from './src/screens/Dashboard';
import SoftwareUsed from './src/screens/Software/SoftwareUsed';
import SoftwareNotUsed from './src/screens/Software/SoftwareNotUsed';
import SoftwareDetail from './src/screens/Software/SoftwareDetail';
import SoftwareCreate from './src/screens/Software/SoftwareCreate';
import SoftwareEdit from './src/screens/Software/SoftwareEdit';

import HardwareUsed from './src/screens/Hardware/HardwareUsed';
import HardwareNotUsed from './src/screens/Hardware/HardwareNotUsed';
import HardwareDetail from './src/screens/Hardware/HardwareDetail';
import HardwareCreate from './src/screens/Hardware/HardwareCreate';
import HardwareEdit from './src/screens/Hardware/HardwareEdit';

import EmployeeDashboard from './src/screens/Employees/EmployeeDashboard';
import EmployeeProfile from './src/screens/Employees/EmployeeProfile';
import EmployeeInventory from './src/screens/Employees/EmployeeInventory';
import EmployeeCosts from './src/screens/Employees/EmployeeCosts';
import EmployeeEdit from './src/screens/Employees/EmployeeEdit';
import EmployeeCreate from './src/screens/Employees/EmployeeCreate';

import SideBar from './src/components/SideBar';

const EmployeeFlow = createStackNavigator({
  EmployeeDashboard: EmployeeDashboard,
  EmployeeCreate: EmployeeCreate,
  Employee: createBottomTabNavigator({
    EmployeeProfile: {
      screen: EmployeeProfile,
    },
    EmployeeInventory: {
      screen: EmployeeInventory,
    },
    EmployeeCosts: {
      screen: EmployeeCosts,
    },
  }),
  EmployeeEdit: EmployeeEdit,
});

EmployeeFlow.navigationOptions = {
  title: 'Employee Dashboard',
};

const HardwareFlow = createStackNavigator({
  Hardware: createBottomTabNavigator({
    HardwareUsed: {
      screen: HardwareUsed,
      navigationOptions: {
        title: 'Verliehen',
      },
    },
    HardwareNotUsed: {
      screen: HardwareNotUsed,
      navigationOptions: {
        title: 'Ohne Nutzer',
      },
    },
  }),
  HardwareCreate: HardwareCreate,
  HardwareDetail: HardwareDetail,
  HardwareEdit: HardwareEdit,
});

HardwareFlow.navigationOptions = {
  title: 'Hardware Dashboard',
};

const SoftwareFlow = createStackNavigator({
  Software: createBottomTabNavigator({
    SoftwareUsed: {
      screen: SoftwareUsed,
      navigationOptions: {
        title: 'Genutzt',
      },
    },
    SoftwareNotUsed: {
      screen: SoftwareNotUsed,
      navigationOptions: {
        title: 'Ungenutzt',
      },
    },
  }),
  SoftwareCreate: SoftwareCreate,
  SoftwareDetail: SoftwareDetail,
  SoftwareEdit: SoftwareEdit,
});

SoftwareFlow.navigationOptions = {
  title: 'Software Dashboard',
};

const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        title: 'Dashboard',
      },
    },
    HardwareDashboard: HardwareFlow,
    SoftwareDashboard: SoftwareFlow,
    EmployeeFlow: EmployeeFlow,
  },
  {
    contentComponent: props => <SideBar {...props} />,

    drawerWidth: Dimensions.get('window').width * 0.85,
    hideStatusBar: true,

    contentOptions: {
      activeBackgroundColor: 'rgba(39, 156, 177, 0.2)',
      activeTintColor: '#279cb1',
      itemsContainerStyle: {
        marginTop: 15,
        marginHorizontal: 8,
      },
      itemStyle: {
        borderRadius: 4,
      },
    },
  },
);

const App = createSwitchNavigator({
  mainFLow: DrawerNavigator,
});

export default createAppContainer(App);
