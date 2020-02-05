import React, { Component } from "react";
import { Picker, TextInput, View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Checkbox from 'react-simple-checkbox';
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopNav from './TopNav'
import TopSection from './components/topSection.js'
import styles from './components/commonCss'
import { ThemeProvider } from "nachos-ui";
import {
    SEARCH_FUNDS, ASSET_TYPE_DIY, SEARCH, USER_ID,
    SEARCH_RESULTS, FUND_NAME, CLIENT_CODE,
     OTI_TEXT,OTI_TEXT_2, SELECT_FOLIO_NUMBER, ENTER_AMOUNT, 
    MIN_BUY, CURRENT_NAV, SELECT_DIV_OPTION, BUY_NOW, ADD_TO_CART
} from './constants/constants';
import ApiService from '../src/services/api-services';


class doitYourself extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            windowHeight: Dimensions.get("window").height,
            windowWidth: Dimensions.get("window").width,
            dataSource: [],
            originalData: [],
            loading: false,
            colorchange1: true,
            colorchange2: false,
            colorchange3: false,
            PickerSelectedVal: '',
            checked: true,
            fundAmountValidation: '',
            folionumber: 'New folio1',
            fundchecked: false,
            dividendchecked: false,
            assetchecked: false,
            equitychecked: false,
            fundhousevalue: "ICICI Prudential Mutual Fund",
            fundname: '',
            no_ofresults: '22',
            dividendoption: 'payout',
            Fundtypevalue: "ICICI Mutual Fund1",
            advancedSearchflag: false,
            fundAmount: '',
            openProductinfo: [false, false, false],
        }
    }
    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    });

    componentDidMount() {
        this.setState({
            loading: true
        });
        if (this.props.navigation.state.params == undefined) {
            this.props.navigation.state.params = {}
        }
        if (window.addEventListener) {
            window.addEventListener('resize', this.handleResize)
            this.handleResize();
        }
        var searchResults = {
            "ClientCode": CLIENT_CODE,
            " UserID ": USER_ID
        }
        ApiService.auth
            .searchService(searchResults)
            .then(data => {
                if (data) {
                    this.setState({
                        loading: false,
                        dataSource: data.fund,
                        originalData: data.fund
                    });
                }
            })
            .catch(error => {
                console.log(error)
                this.props.navigation.navigate("ErrorPage")
            });
    }

    handleKeyPress(event) {
        const { originalData } = this.state;
        let val = event.target.value.toLowerCase();
        if (event.key === 'Enter' && val.toLowerCase().length > 0) {
            if (val.trim() === '') {
                this.setState({ dataSource: originalData });
            }
            else {
                let newArray = originalData.filter(value => {
                    return value.name.toLowerCase().includes(val);
                });
                this.setState({ dataSource: newArray });
            }

        }
    };

    handleInputChange(event) {
        const { originalData } = this.state;
        if (!event.target.value) {
            this.setState({ dataSource: originalData });
        }
      }

    componentWillMount() {
        this.props.changeBackground('#F36414');
        var accontType = "Savings"
        this.setState({ accontType: accontType })

    }
    assetChange(ev) {
        this.setState({ assetchecked: ev });
        localStorage.setItem('acceptTC', ev);
        var v = localStorage.getItem('acceptTC');
        if (v === 'true') {
            var searchResults = {
                "ClientCode": CLIENT_CODE,
                " UserID ": USER_ID
            }
            ApiService.auth
                .searchService(searchResults)
                .then(data => {
                    if (data) {
                        this.setState({
                            loading: false,
                            dataSource: data.fund,
                            originalData: data.fund
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.props.navigation.navigate("ErrorPage")
                });
        }
    }
    equityChange(ev) {
        this.setState({ equitychecked: ev });
        localStorage.setItem('acceptTC1', ev)
        var v = localStorage.getItem('acceptTC1');
        if (v === 'true') {
            alert("hey")
        }
    }
    componentWillUnmount() {
        if (window.removeEventListener) {
            window.removeEventListener('resize', this.handleResize)
        }
    }

    homepage = () => {
        this.props.navigation.navigate("product", this.props.navigation.state.params)
    }

    suggestedfunds = () => {
        this.setState({
            colorchange1: true,
            colorchange2: false,
            colorchange3: false,
        })
    }
    searchfunds = () => {
        this.setState({
            colorchange1: false,
            colorchange2: true,
            colorchange3: false,
        })
    }
    newfundOrders = () => {
        this.setState({
            colorchange1: false,
            colorchange2: false,
            colorchange3: true,
        })
    }
    productInfo = (index) => {
        const { openProductinfo } = this.state;
        const res = openProductinfo;
        res[index] = !res[index];
        this.setState(res);
    }
    advancedSearch = () => {
        if (this.state.advancedSearchflag == true) {
            this.setState({ advancedSearchflag: false })
        }
        else {
            this.setState({ advancedSearchflag: true })
        }

    }
    fundvaluechange = (value) => {
        this.setState({ fundname: value })

    }
    fundingAmount = (value) => {
        if ((value.length <= 10) && (value >= 0)) {
            this.setState({ fundAmount: value })
        }
    }
    addtocart = (value) => {
        var values = [];
        values.push(this.state.PickerSelectedVal);
        values.push(this.state.checked);
        values.push(this.state.folionumber);
        values.push(this.state.fundchecked);
        values.push(this.state.dividendchecked);
        values.push(this.state.assetchecked);
        values.push(this.state.equitychecked);
        values.push(this.state.fundhousevalue);
        values.push(this.state.fundname);
        values.push(this.state.no_ofresults);
        values.push(this.state.dividendoption);
        values.push(this.state.Fundtypevalue);
        values.push(this.state.advancedSearchflag);
        values.push(this.state.fundAmount);
        if (this.state.fundAmount == '') {
            this.setState({ fundAmountValidation: 'Please Enter Fund Amount' })
        }
        else {
            this.props.navigation.navigate("nomineeDetails", {
                title: 'Search',
                doitYourselfParams: this.props.navigation.state.params
            })
        }
    }
    buyproduct = (value) => {

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
                    <TopSection back={() => { this.back() }}></TopSection>
                    <ScrollView style={{ backgroundColor: '#F36414' }}>
                        <View style={{ justifyContent: 'center', minHeight: '60vh' }}>
                            <View>
                                {this.state.windowWidth > 600 ? (
                                    <View style={{ marginBottom: 10, width: '80%', alignSelf: 'center' }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={style.doYourselfContainer}>
                                                <View>
                                                    <View style={{ padding: 20, margin: 10 }}>
                                                        <View style={styles.fundHeading}>
                                                            <Text style={style.doitYourselfSearch}>{SEARCH_FUNDS}</Text>
                                                        </View>
                                                        <View>
                                                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                                                <TextInput style={style.doitYourselfSearchText}
                                                                    placeholder='Start typing the fund name'
                                                                    maxLength={50}
                                                                    onKeyPress={this.handleKeyPress}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </View>
                                                            <View style={{ marginLeft: 15, marginTop: 10, marginBottom: 10 }}>
                                                                <View>
                                                                    {((this.state.advancedSearchflag === true)) ? (
                                                                        <View style={{ margin: 10, padding: 10 }}>
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <View style={style.doityourselfCheckbox}>
                                                                                    <View style={{ width: '50%' }}>
                                                                                        <View>
                                                                                            <Text style={styles.fundTextHeading}>{ASSET_TYPE_DIY}</Text>
                                                                                            <View style={{ flexDirection: 'row' }}>

                                                                                                <Checkbox
                                                                                                    label="Click me"
                                                                                                    checked={this.state.assetchecked}
                                                                                                    color='#00008b'
                                                                                                    borderThickness={2}
                                                                                                    size={2}
                                                                                                    CheckboxIconSize={30}
                                                                                                    onChange={this.assetChange.bind(this)}
                                                                                                    style={{ height: 10, borderWidth: 0 }}
                                                                                                />
                                                                                                <View style={style.checkboxEquity}>
                                                                                                    <Text style={{ fontSize: 14, fontFamily: 'sans-serif', }}>Equity</Text>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ flexDirection: 'row' }}>

                                                                                                <Checkbox
                                                                                                    label="Click me"
                                                                                                    checked={this.state.equitychecked}
                                                                                                    color='#00008b'
                                                                                                    borderThickness={2}
                                                                                                    size={2}
                                                                                                    CheckboxIconSize={30}
                                                                                                    onChange={this.equityChange.bind(this)}
                                                                                                    style={{ height: 10, borderWidth: 0 }}
                                                                                                />
                                                                                                <View style={style.checkboxEquity}>
                                                                                                    <Text style={{ fontSize: 14, fontFamily: 'sans-serif', }}>Debt</Text>
                                                                                                </View>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View style={{ width: '50%' }}>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            <View style={styles.buttonDivision}>
                                                                                <TouchableOpacity style={styles.buttonStyle}><Text style={styles.buttonText}>{SEARCH}</Text></TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    ) : (null)}


                                                                </View>

                                                            </View>
                                                            <View>
                                                                <View style={{ margin: 10 }}>
                                                                    <View>
                                                                        <Text style={{ fontSize: 18, fontFamily: 'sans-serif', }}>{SEARCH_RESULTS} <Text style={{ fontSize: 12, color: '#9E9E9E' }}> Showing {this.state.dataSource.length} Results</Text></Text>
                                                                    </View>
                                                                    <View>
                                                                        <View style={style.dodropHeading}>
                                                                            <Text style={style.dodropHeadingText}>{FUND_NAME}</Text>
                                                                        </View>
                                                                        {this.state.dataSource.map((item, index) => {
                                                                            return (
                                                                                <View style={{ borderWidth: 1, borderColor: '#cdcdcd' }}>
                                                                                    <TouchableOpacity onPress={() => { this.productInfo(index) }} style={style.dodropHeadingdata}>
                                                                                        <Text style={style.dodropHeadingContent}>{item.name}</Text>
                                                                                        <View style={style.dodropHeadingdatas}>
                                                                                            <Image style={{ width: 15, height: 15, marginRight: 10 }} source={require('./assets/images/downarrow.png')} />
                                                                                        </View>
                                                                                    </TouchableOpacity >
                                                                                    {((this.state.openProductinfo[index] === true)) ? (
                                                                                        <View style={styles.fundDetails_innerSection}>
                                                                                            <View style={style.dropTable}>
                                                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                                    <Image style={style.dropbuyImage} source={require('./assets/images/buyicon.png')} />
                                                                                                    <Text style={style.dropTabletext}>Buy</Text>

                                                                                                </View>
                                                                                                <View style={style.buyHeading}>
                                                                                                    <View>
                                                                                                        <Text style={style.dropfundObjectives}>{OTI_TEXT}</Text>
                                                                                                    </View>
                                                                                                    <View>
                                                                                                        <Text style={style.buyPara}>{OTI_TEXT_2}</Text>
                                                                                                    </View>
                                                                                                </View>

                                                                                                <View style={{ marginTop: 20, marginBottom: 10 }}>
                                                                                                    <View style={{ flexDirection: 'row' }}>
                                                                                                        <View style={{ margin: 20 }}>

                                                                                                            <View>
                                                                                                                <Text style={style.advancedSearchText} >{SELECT_FOLIO_NUMBER}</Text>
                                                                                                                <Picker
                                                                                                                    style={style.advancedSearchPicker}
                                                                                                                    selectedValue={this.state.folionumber}
                                                                                                                    onValueChange={(itemValue, itemIndex) => this.setState({ folionumber: itemValue })} >
                                                            

                                                                                                                </Picker>
                                                                                                            </View>


                                                                                                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                                                                                                <Text style={style.enterAmount}>{ENTER_AMOUNT}</Text>
                                                                                                                <TextInput
                                                                                                                    style={style.buyTextinput}
                                                                                                                    placeholder='Please enter the amount'
                                                                                                                    keyboardType="numeric"
                                                                                                                    maxLength={50}
                                                                                                                    value={this.state.fundAmount}
                                                                                                                    onChangeText={(value) => { this.fundingAmount(value) }}
                                                                                                                />
                                                                                                                <Text style={style.doityourselfValidation}>{this.state.fundAmountValidation}</Text>
                                                                                                                <Text style={style.minAmount}>{MIN_BUY}{item.minInvAmount}</Text>
                                                                                                                <Text style={style.currentNav}>{CURRENT_NAV}{item.latestNAV}</Text>
                                                                                                            </View>
                                                                                                        </View>
                                                                                                        <View style={{ margin: 20 }}>
                                                                                                            <Text style={style.advancedSearchText} >{SELECT_DIV_OPTION}</Text>
                                                                                                            <Picker
                                                                                                                style={style.advancedSearchPicker}
                                                                                                                selectedValue={this.state.dividendoption}
                                                                                                                onValueChange={(itemValue, itemIndex) => this.setState({ dividendoption: itemValue })} >

                                                                                                            </Picker>
                                                                                                        </View>
                                                                                                    </View>
                                                                                                </View>
                                                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                                                                                                    <TouchableOpacity onPress={() => { this.addtocart(item) }} style={styles.buttonStyle}><Text style={styles.buttonText}>{ADD_TO_CART}</Text></TouchableOpacity>
                                                                                                    <TouchableOpacity onPress={() => { this.buyproduct(item) }} style={style.buttonStyles}><Text style={styles.buttonText}>{BUY_NOW}</Text></TouchableOpacity>

                                                                                                </View>

                                                                                            </View>
                                                                                        </View>
                                                                                    ) : (null)}
                                                                                </View>
                                                                            )
                                                                        })}
                                                                        <View>

                                                                        </View>
                                                                    </View>
                                                                    <ScrollView/>
                                                                </View>

                                                            </View>

                                                        </View>


                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                        <View style={{ marginBottom: 10, width: '100%', alignSelf: 'center' }}>
                                            <View style={styles.fundDetails_innerSection}>
                                                <View style={style.doitYourselfMobile}>
                                                    <View>
                                                        <View style={{ padding: 10, margin: 10 }}>
                                                            <View style={style.doMobilecontainer}>
                                                                <Text style={style.doitYourselfSearch}>{SEARCH_FUNDS}</Text>
                                                            </View>
                                                            <View>
                                                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                                                    <TextInput
                                                                        style={style.domobileTextinput}


                                                                        placeholder='Start typing the fund name'
                                                                        maxLength={50}
                                                                        value={this.state.fundname}
                                                                        onChangeText={(value) => { this.fundvaluechange(value) }}
                                                                    />
                                                                </View>
                                                                {/* Moile View */}
                                                                <View>
                                                                    <View style={{ margin: 10 }}>
                                                                        <View>
                                                                            <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{SEARCH_RESULTS}
                                                           <Text style={{ fontSize: 12, color: '#9E9E9E' }}> Showing {this.state.dataSource.length} Results</Text>
                                                                            </Text>
                                                                        </View>
                                                                        <View>
                                                                            <View style={style.dodropHeading}>
                                                                                <Text style={style.dodropHeadingText}>{FUND_NAME}</Text>
                                                                            </View>
                                                                            {this.state.dataSource.map((item, index) => {
                                                                                return (
                                                                                    <View style={{ borderWidth: 1, borderColor: '#cdcdcd' }}>
                                                                                        <TouchableOpacity onPress={() => { this.productInfo(index) }} style={{ flexDirection: 'row', height: 40, width: '100%' }}>
                                                                                            <Text style={style.mobileDrop}>{item.name}</Text>
                                                                                            <View style={style.mobileDropinner}>
                                                                                                <Image style={{ width: 15, height: 15, marginRight: 10 }} source={require('./assets/images/downarrow.png')} />
                                                                                            </View>
                                                                                        </TouchableOpacity >
                                                                                        {((this.state.openProductinfo[index] === true)) ? (
                                                                                            <View style={style.mobileBuyDiv}>
                                                                                                <View style={style.mobileBuyinnerDiv}>
                                                                                                    <View style={{ flexDirection: 'row' }}>
                                                                                                        <Image style={{ width: 15, height: 15, marginRight: 10 }} source={require('./assets/images/buyicon.png')} />
                                                                                                        <Text style={style.mobileBuyText}>Buy</Text>

                                                                                                    </View>
                                                                                                    <View style={style.mobileBuyTexts}>
                                                                                                        <View>
                                                                                                            <Text style={style.mobileBuyHeading}>{OTI_TEXT}</Text>
                                                                                                        </View>
                                                                                                        <View>
                                                                                                            <Text style={style.buyPara}>{OTI_TEXT_2}</Text>
                                                                                                        </View>
                                                                                                    </View>

                                                                                                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                                                                                                        <View >
                                                                                                            <View>

                                                                                                                <View>
                                                                                                                    <Text style={style.advancedSearchText}>{SELECT_FOLIO_NUMBER}</Text>
                                                                                                                    <Picker
                                                                                                                        style={style.mobilePickers}
                                                                                                                        selectedValue={this.state.Fundtypevalue}
                                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ Fundtypevalue: itemValue })} >
                                                                                                                

                                                                                                                    </Picker>
                                                                                                                </View>


                                                                                                                <View style={{ marginTop: 20, marginBottom: 10 }}>
                                                                                                                    <Text style={style.enterAmount}>{ENTER_AMOUNT}</Text>
                                                                                                                    <TextInput
                                                                                                                        style={style.buyTextinput}

                                                                                                                        placeholder='Please enter the amount'
                                                                                                                        maxLength={50}
                                                                                                                        value={this.state.fundAmount}
                                                                                                                        onChangeText={(value) => { this.fundingAmount(value) }}
                                                                                                                    />
                                                                                                                    <Text style={style.doityourselfValidation}>{this.state.fundAmountValidation}</Text>
                                                                                                                    <Text style={style.minAmount}>{MIN_BUY}{item.minInvAmount}</Text>
                                                                                                                    <Text style={style.currentNav}>{CURRENT_NAV}{item.latestNAV}</Text>
                                                                                                                </View>
                                                                                                            </View>
                                                                                                            <View style={{ marginTop: 10 }}>
                                                                                                                <Text style={style.advancedSearchText}>{SELECT_DIV_OPTION}</Text>
                                                                                                                <Picker
                                                                                                                    style={style.mobilePickers}
                                                                                                                    selectedValue={this.state.dividendoption}


                                                                                                                    onValueChange={(itemValue, itemIndex) => this.setState({ dividendoption: itemValue })} >
                                                                    

                                                                                                                </Picker>
                                                                                                            </View>
                                                                                                        </View>
                                                                                                    </View>
                                                                                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                                                                                        <TouchableOpacity onPress={() => { this.addtocart(item) }} style={style.mobilebutton}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>{ADD_TO_CART}</Text></TouchableOpacity>
                                                                                                        <TouchableOpacity onPress={() => { this.buyproduct(item) }} style={style.mobileButtons}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>{BUY_NOW}</Text></TouchableOpacity>

                                                                                                    </View>

                                                                                                </View>
                                                                                            </View>
                                                                                        ) : (null)}
                                                                                    </View>
                                                                                )
                                                                            })}
                                                                            <View>

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
                                    )}
                            </View>
                        </View>
                    </ScrollView>
                </ThemeProvider>
            </View>
        );
    }



}
const style = StyleSheet.create({
    doYourselfContainer: {
        width: '100%',
        height: '10%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    doitYourselfSearch: {
        fontFamily: 'sans-serif',
        fontSize: 22,
        color: '#00008b',
        fontWeight: '400',
        textAlign: 'center',
    },
    doitYourselfSearchText: {
        width: '-webkit-fill-available',
        marginLeft: 10,
        height: 44,
        borderWidth: 0.5,
        fontFamily: 'sans-serif',
        paddingLeft: 6,
        borderColor: '#969696'
    },
    doitYourselfAdvanced: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: '#00008b',
        fontWeight: '500'
    },
    advancedSearchText: {
        marginRight: 10,
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: '#565656'
    },
    advancedSearchPicker: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontFamily: 14,
        marginTop: 10
    },
    doityourselfCheckbox: {
        width: '50%',
        flexDirection: 'row',
        margin: 10,
        padding: 10
    },
    checkboxEquity: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10
    },
    dodropHeading: {
        marginTop: 10,
        width: '100%',
        height: 40,
        backgroundColor: '#00008b',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dodropHeadingText: {
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: '600',
        color: 'white'
    },
    dodropHeadingdata: {
        flexDirection: 'row',
        height: 25,
        width: '100%'
    },
    dodropHeadingContent: {
        width: '50%',
        fontSize: 14,
        fontFamily: 'sans-serif',
        marginLeft: 10,
        marginTop: 5
    },
    dodropHeadingdatas: {
        width: '50%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dropTable: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#858585'
    },
    dropbuyImage: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    dropTabletext: {
        fontSize: 18,
        fontFamily: 'sans-serif',
        marginLeft: 10
    },
    buyHeading: {
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#858585'
    },
    buyPara: {
        fontSize: 12,
        fontFamily: 'sans-serif',
        marginTop: 10,
        marginBottom: 10
    },
    dropfundObjectives: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontWeight: '600'
    },
    enterAmount: {
        marginRight: 10,
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: '#565656',
        marginBottom: 10
    },
    buyTextinput: {
        width: '-webkit-fill-available',
        height: 40,
        borderWidth: 0.5,
        fontFamily: 'sans-serif',
        paddingLeft: 6,
        borderColor: '#969696'
    },
    doityourselfValidation: {
        marginRight: 10,
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: 'red',
        marginTop: 5
    },
    minAmount: {
        marginRight: 10,
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: '#565656',
        marginTop: 10
    },
    currentNav: {
        marginRight: 10,
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: '#565656',
        marginTop: 20
    },
    buttonStyles: {
        width: 150,
        height: 40,
        backgroundColor: '#00008b',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    doitYourselfMobile: {
        width: '90%',
        height: '10%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 20
    },
    doMobilecontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    domobileTextinput: {
        width: '-webkit-fill-available',
        marginLeft: 10,
        height: 44,
        borderWidth: 0.5,
        fontFamily: 'sans-serif',
        paddingLeft: 6,
        borderColor: '#969696'
    },
    advancedSearchMobile: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: '#00008b',
        fontWeight: '500'
    },
    mobileAdvancedsearch: {
        margin: 5,
        padding: 5,
        borderColor: '#707070',
        borderWidth: 1
    },
    mobileinputHead: {
        marginRight: 10,
        fontSize: 12,
        fontFamily: 'sans-serif',
        color: '#565656'
    },
    mobilePickerfield: {
        width: 250,
        backgroundColor: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontFamily: 12,
        marginTop: 10
    },
    mobileCheckbox: {
        width: '100%',
        flexDirection: 'row',
        margin: 10,
        marginTop: 20
    },
    mobileCheckboxText: {
        fontSize: 14,
        fontFamily: 'sans-serif',
        fontWeight: '600'
    },
    mobilecheckLabel: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10
    },
    mobileDrop: {
        width: '80%',
        fontSize: 14,
        fontFamily: 'sans-serif',
        marginLeft: 10,
        marginTop: 5
    },
    mobileDropinner: {
        width: '20%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        top: -20
    },
    mobileBuyDiv: {
        margin: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mobileBuyinnerDiv: {
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '#858585'
    },
    mobileBuyText: {
        fontSize: 18,
        fontFamily: 'sans-serif',
        marginLeft: 10
    },
    mobileBuyTexts: {
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#858585'
    },
    mobileBuyHeading: {
        fontSize: 12,
        fontFamily: 'sans-serif',
        fontWeight: '600'
    },
    mobilePickers: {
        width: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontFamily: 14,
        marginTop: 10
    },
    mobilebutton: {
        width: 100,
        height: 40,
        backgroundColor: '#00008b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mobileButtons: {
        width: 100,
        height: 40,
        backgroundColor: '#00008b',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    }
})
export default doitYourself;

