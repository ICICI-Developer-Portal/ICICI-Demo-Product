import React, { Component } from "react";
import {View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopNav from './TopNav';
import { ThemeProvider} from "nachos-ui";
import {AVAILABLE_MUTUAL_FUNDS, CURRENT_HOLDINGS, RISK_PROFILE_SCORE,
   ASSET_ALLOCATION, INVEST_NOW} from './constants/constants';


class LandingPage extends Component {

  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    Chosenfield:'',
  
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    if(this.props.navigation.state.params == undefined){
      this.props.navigation.state.params = {}
      }
    if (window.addEventListener) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    }
  }

  componentWillMount(){    
    var accontType = "Savings"
    this.setState({accontType : accontType})
  
  }

  componentWillUnmount() {
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
      this.props.changeBackground('#F36414');
    }
  }
  homepage = () => {
    this.props.navigation.navigate("product", this.props.navigation.state.params)
  }

  currentHoldings =() =>{
    this.setState({Chosenfield:'currentHoldings'})
   this.props.navigation.navigate("currentHoldings", this.props.navigation.state.params)
  }
  riskprofilescore =() =>{
    this.setState({Chosenfield:'Risk Profile Score'})
    this.props.navigation.navigate("riskProfile", this.props.navigation.state.params)
  }
  assetAllocation =() =>{
    this.setState({Chosenfield:'Asset Allocation'})
    this.props.navigation.navigate("assetallocation", this.props.navigation.state.params)
  }
  InvestNow =() =>{
    this.setState({Chosenfield:'Invest Now'})
    this.props.navigation.navigate("InvestNow", this.props.navigation.state.params)
  }
  render() {
    const cardStyle = { minWidth: 800, width: '100%', color: 'white', alignSelf: 'center', borderRadius: 20 }
    var margin = 0;
    var font = 14;
    var flex = 0.33;
    var width = "80%"
    if (this.state.windowWidth < 980) {
      margin = 0;
      font = 12;
      fontTop: 25;
    } else {
      margin = 0
      font = 14;
      fontTop: 25;
      width = "90%"
    }

    
      return (
        <View>
          <TopNav />
        <ThemeProvider
        branding={{
          textColor: "#F45F10",
          accentColor: "red",
          alternateTextColor: "#fff",
          linkColor: "#7945ef",
          disabledColor: "#f9f9fa",
          disabledDarkColor: "#b1b2c1",
          successLightColor: "#e9f9f0",
          successColor: "white",
          passiveSuccessLightColor: "#d5dff7",
          passiveSuccessColor: "#2f61d5",
          dangerLightColor: "#ffe2dc",
          dangerColor: "#ff7052",
          primaryLightColor: "#e3d9fc",
          primaryColor: "black"
        }}>

        <Loader loading={this.state.loading} />

        <Blackout modalopenhide={this.state.modalopenhide} />

       

        <ScrollView style={{ backgroundColor: '#F36414' }}>

          <View style={{ justifyContent: 'center', minHeight:'86.8vh' }}>          
            <View>
                <View  className="Landingcontainer">
                  <View className="Landingallignment" >
                    <View className="LandinginnerContainer" >
                 
                      <View>
                      <View className="Landingborder">
                  
                        <View>
                          <View className="productmobileheader_view">
                          <Text className="productmobileheaderstyle">{AVAILABLE_MUTUAL_FUNDS}
                           </Text>
                          </View>
                          <View className="productinputView">
                          <View className="landingButtonView">
                       <TouchableOpacity onPress={() => { this.currentHoldings() }} className="Landingbuttonstyle">
                         <Text className="Landingbuttontextstyle">{CURRENT_HOLDINGS}</Text></TouchableOpacity>
                       <TouchableOpacity onPress={() => { this.riskprofilescore() }} className="Landingbuttonstyle">
                         <Text className="Landingbuttontextstyle">{RISK_PROFILE_SCORE}</Text></TouchableOpacity>
                      </View>

                      <View className="landingButtonView">
                       <TouchableOpacity onPress={() => { this.assetAllocation() }} className="Landingbuttonstyle">
                         <Text className="Landingbuttontextstyle">{ASSET_ALLOCATION}</Text></TouchableOpacity>
                       <TouchableOpacity onPress={() => { this.InvestNow() }} className="Landingbuttonstyle">
                         <Text className="Landingbuttontextstyle">{INVEST_NOW}</Text></TouchableOpacity>
                      </View>
                          </View>
                    </View>                       
                      </View>                    
                    </View>                   
                  </View>
                  </View>
                </View>
            </View>
          </View>
        </ScrollView>
      </ThemeProvider>
      </View>
      );
    }
  }

export default LandingPage;

