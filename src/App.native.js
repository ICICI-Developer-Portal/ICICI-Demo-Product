// App.js - React Native

import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import HomeScreen from "./HomeScreen";
import DasModalScreen from "./DasModalScreen";
import SecondScreen from "./SecondScreen";
import product from './product';
import index1 from './index1.native';
import UserScreen from "./UserScreen";
import profile from "./profileDetails";
import { Image,TouchableOpacity } from "react-native";

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen,  navigationOptions:({ navigation }) => ({
      headerLeft: () => (<TouchableOpacity onPress={ ()=>{ navigation.navigate('Home') }}>
                     <Image source={require('./assets/images/icici_bank_logo_symbol.png')} style={{ resizeMode:'contain',height:100, width:150, padding:10, marginLeft:10}}  />
                  </TouchableOpacity> )
    })
  }
});

const SecondStack = createStackNavigator({
  FdFlow : { screen: SecondScreen,    navigationOptions:({ navigation }) => ({
      headerLeft: () => ( <TouchableOpacity onPress={ ()=>{ navigation.navigate('Home') }}> 
                            <Image source={require('./assets/images/icici_bank_logo_symbol.png')} style={{ resizeMode:'contain',height:100, width:150,padding:10, marginLeft:10}} />
                          </TouchableOpacity> ) 
    })
   },
  product: { screen: product,    navigationOptions:({ navigation }) => ({
      headerLeft: () => ( <TouchableOpacity onPress={ ()=>{ navigation.navigate('Home') }}>
                            <Image source={require('./assets/images/icici_bank_logo_symbol.png')} style={{ resizeMode:'contain',height:100, width:150,padding:10, marginLeft:10}} />
                          </TouchableOpacity>)
    })
  },
  index1: { screen: index1,    navigationOptions:({ navigation }) => ({
    headerLeft: () => ( <TouchableOpacity onPress={ ()=>{ navigation.navigate('Home') }}>
                          <Image source={require('./assets/images/icici_bank_logo_symbol.png')} style={{ resizeMode:'contain',height:100, width:150,padding:10, marginLeft:10}} />
                        </TouchableOpacity>)
  })
},
  profile: { screen: profile,    navigationOptions:({ navigation }) => ({
      headerLeft: () => ( <TouchableOpacity onPress={ ()=>{ navigation.navigate('Home') }}>
                            <Image source={require('./assets/images/icici_bank_logo_symbol.png')} style={{ resizeMode:'contain',height:100, width:150,padding:10, marginLeft:10}} />
                          </TouchableOpacity>)
    })
  }
});

const TabNav = createStackNavigator({
  Home: HomeStack,
  SecondStack: SecondStack
},
{
    headerMode: "none"
 });

const RootStack = createStackNavigator(
  {
    Main: TabNav,
    DasModal: DasModalScreen
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

class App extends Component {
  render() {
    return <RootStack />;
  }
}

export default App;
