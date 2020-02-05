import React, { Component } from "react";
import { View, Text,  ScrollView, TouchableOpacity, Dimensions } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopNav from './TopNav'
import TopSection from './components/topSection.js'
import { ThemeProvider } from "nachos-ui";
import { SELECT_ANY_OPTION, ONE_TIME_INVEST, SIP, DO_IT_YOURSELF } from "./constants/constants";


class InvestNow extends Component {

    state = {
        windowHeight: Dimensions.get("window").height,
        windowWidth: Dimensions.get("window").width,
        loading: false,
        Chosenfield: '',
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

    sip = () => {
        this.setState({ Chosenfield: 'Sip' })
        var values = [];
        values.push(this.state.Chosenfield);
        var that = this;
        that.props.navigation.navigate("Sip", that.props.navigation.state.params)
    }
    oneTimeInvestment = () => {
        this.setState({ Chosenfield: 'oneTimeInvestment' })
        var values = [];
        values.push(this.state.Chosenfield);
        var that = this;
        that.props.navigation.navigate("oneTimeInvestment", that.props.navigation.state.params)
    }
    doitYourself = () =>{      
        this.props.navigation.navigate("doitYourself", this.props.navigation.state.params)
    }

    back = () => {
        this.props.navigation.navigate('LandingPage', this.props.navigation.state.params)
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
        
                <ScrollView style={{ backgroundColor: '#F36414' }}>
                <TopSection  back={()=>{this.back()}}></TopSection>
                    <View style={{ justifyContent: 'center', minHeight: '60vh' }}>
                        
                        <View>
                           
                                <View className="investnowcontainer">
                                    <View className="investnowcontainerallign" >
                                        <View className="investnowinnercontainer" >
                                            <View>
                                                <View className="Landingborder">
                                                    <View>
                                                        <View className="productmobileheader_view">
                                                            <Text className="productmobileheaderstyle" >{SELECT_ANY_OPTION}</Text>
                                                        </View>
                                                        <View className="productinputView">
                                                            <View >
                                                            <View className="landingButtonView" >
                                                                <TouchableOpacity onPress={() => { this.sip() }} className="Landingbuttonstyle"><Text className="Landingbuttontextstyle">{SIP}</Text></TouchableOpacity>
                                                                <TouchableOpacity onPress={() => { this.oneTimeInvestment() }} className="Landingbuttonstyle"><Text className="Landingbuttontextstyle">{ONE_TIME_INVEST}</Text></TouchableOpacity>
                                                                </View>
                                                                <View className="landingButtonView">
                                                                <TouchableOpacity  onPress={() => { this.doitYourself() }}  className="Landingbuttonstyle"><Text className="Landingbuttontextstyle">{DO_IT_YOURSELF}</Text></TouchableOpacity>
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
                    </View>
                </ScrollView>
            </ThemeProvider>
            </View>
        );
    }



}

export default InvestNow;

