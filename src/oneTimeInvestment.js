import React, { Component } from "react";
import { Picker, View, Text,  ScrollView,  TouchableOpacity, Dimensions } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopNav from './TopNav'
import TopSection from './components/topSection.js'
import { ThemeProvider, Input } from "nachos-ui";



class oneTimeInvestment extends Component {

  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    Chosenfield: '',
    sipamount:'',
    sipamountValidation: ''
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

  componentWillMount() {
    console.log(this.props.navigation.state.params)
    var accontType = "Savings"
    this.setState({ accontType: accontType })

  }

  componentWillUnmount() {
    this.props.changeBackground('#F36414');
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  homepage = () => {
    this.props.navigation.navigate("product", this.props.navigation.state.params)
  }

  setamountValue =(value) =>{
    //sip have kept max value as 1,00,000
    if(value<=100000){
    this.setState({sipamount:value})
    }
  }
  sipsubmit = () =>{
    var values = [];
    values.push(this.state.sipamount); 
    if (values[0] == ''){
      this.setState({sipamountValidation:'Please Enter Amount'})
    }
    else {
    this.props.navigation.state.params.SIPamount = values;
    this.props.navigation.navigate('SipSug', {
      SipAmount: this.props.navigation.state.params.SIPamount
    });
    }
  }

  back = () => {
    
    this.props.navigation.navigate('InvestNow', this.props.navigation.state.params)
  }
  render() {
    const cardStyle = { minWidth: 800, width: '100%', color: 'white', alignSelf: 'center', borderRadius: 20 }
    var margin = 0;
    var font = 14;
    var flex = 0.33;
    var width = "80%"
    console.log(this.state.windowWidth)
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
        <TopNav navigation={this.props.navigation} />
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
        <TopSection  back={()=>{this.back()}}></TopSection>
        <ScrollView style={{ backgroundColor: '#F36414' }}>

          <View style={{ justifyContent: 'center', minHeight: '60vh' }}>

            <View>
                <View className="currentholdingcontainer" >
                  <View className="currentholdingcontainerallign" >
                    <View className="sipinnerconatiner" >

                      <View>
                        <View style={{ padding: 20, margin: 10 }}>
                          <View>
                            <View className="productmobileheader_view">
                              <Text className="productmobileheaderstyle">One Time Invest
                                                                        </Text>
                            </View>
                            <Text className="sipamountText" >Enter Amount</Text>
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                              <Input
                                style={{ borderTopColor: 'transparent', height: 50, backgroundColor: '#DCDCDC', borderLeftColor: 'transparent', borderRightColor: 'transparent', }}
                                visible='true'
                                placeholder='₹'
                                name="sipamount"
                                value={this.state.sipamount}
                                onChangeText={value => this.setamountValue(value)}
                                keyboardType="numeric"
                                maxLength={10}
                                autoFocus
                              ></Input>
                              <View style={{ marginTop: 3 }} >
                                <Text style={{ color: 'red' }}>{this.state.sipamountValidation}</Text>
                              </View>
                            </View>



                            <View className="productotp_ModalbuttonView">
                              <TouchableOpacity  onPress={() => { this.sipsubmit() }} className="productmobileConfirmbutton">
                                <Text className="productConfirmtext">CONFIRM</Text></TouchableOpacity>
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

export default oneTimeInvestment;

