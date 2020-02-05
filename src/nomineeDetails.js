import React, { Component } from "react";
import { Picker, View, TextInput, Text, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import "./style.css";
import Checkbox from 'react-simple-checkbox';
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js';
import DatePicker from 'react-date-picker';
import { RadioGroup, Radio } from 'react-radio-group'
import TopSection from './components/topSection.js'
import TopNav from './TopNav'
import Modal from './components/commomPopup';
import successIcon from './assets/images/guaranteed.png';
import { ThemeProvider } from "nachos-ui";
import ApiService from '../src/services/api-services';
import { CLIENT_CODE
} from './constants/constants';

class nomineeDetails extends Component {

    state = {
        windowHeight: Dimensions.get("window").height,
        windowWidth: Dimensions.get("window").width,
        loading: false,
        Chosenfield: '',
        selectedValue: 'Yes',
        nomineeName: '',
        nomineeShare: '',
        realtionship: '',
        address: '',
        nomineeNamevalidations: '',
        nomineeSharevalidations: '',
        realtionshipvalidations: '',
        Birthplacevalidations: '',
        addressvalidations: '',
        accountholdervalidations: '',
        accountholder: '',
        Birthplace: '',
        birthCountry: '',
        annualIncome: '',
        occupationVal: '',
        businessIncome: '',
        assetchecked: false,
        selectedValue1: "No",
        selectedValue2: "No",
        accountHolderCheck: false,
        TCcheck: false,
        isVisible: false,
        nomineeDob: new Date(),
        NomineeName: '',
        NomineeShare: '',
        DateOfBirth: '',
        NomineeRelationship: '',
        NomineeAddress: '',
        clientDOB: '',
        clientName: '',
        politicalStatus: '',
        clientCOB: '',
        grossAnnualIncome: '',
        occupation: '',
        sourceOfWealth: '',
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
        var nomineeData = { "DataBlock": { "DataHead": { "MWIClientCode": CLIENT_CODE, "TranStatus": "" } } }
        ApiService.auth
            .nomineeDetails(nomineeData)
            .then(data => {
                if (data) {
                    this.setState({
                        loading: false,
                        dataSource: data,
                        NomineeName: data.NomineeName,
                        NomineeShare: data.NomineeShare,
                        DateOfBirth: data.DateOfBirth,
                        NomineeRelationship: data.NomineeRelationship,
                        NomineeAddress: data.NomineeAddress,
                        clientDOB: data.clientDOB,
                        clientName: data.clientName,
                        politicalStatus: data.politicalStatus,
                        clientCOB: data.clientCOB,
                        grossAnnualIncome: data.grossAnnualIncome,
                        occupation: data.occupation,
                        sourceOfWealth: data.sourceOfWealth
                    });
                }
            })
            .catch(error => {
                console.log(error)
                this.props.navigation.navigate("ErrorPage")
            });
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
    CONFIRMandPAYNOW = () => {
        var values = [];
        values.push(this.state.Chosenfield);
        values.push(this.state.selectedValue);
        values.push(this.state.nomineeName);
        values.push(this.state.nomineeShare);
        values.push(this.state.realtionship);
        values.push(this.state.address);
        values.push(this.state.accountholder);
        values.push(this.state.Birthplace);
        values.push(this.state.birthCountry);
        values.push(this.state.annualIncome);
        values.push(this.state.occupationVal);
        values.push(this.state.businessIncome);
        values.push(this.state.assetchecked);
        values.push(this.state.selectedValue1);
        values.push(this.state.selectedValue2);
        values.push(this.state.accountHolderCheck);
        values.push(this.state.TCcheck);
        values.push(this.state.nomineeDob);
        this.props.navigation.state.params.NomineeDetails = values;
        if (this.state.selectedValue == 'Yes') {
            if ((this.state.nomineeName == '') || (this.state.nomineeShare == '') || (this.state.realtionship == '') || (this.state.address == '') || (this.state.accountholder == '') || (this.state.Birthplace == '')) {
                if (this.state.nomineeName == '') {
                    this.setState({ nomineeNamevalidations: 'Please Enter Nominee Name' })
                }
                else {
                    this.setState({ nomineeNamevalidations: '' })
                }
                if (this.state.nomineeShare == '') {
                    this.setState({ nomineeSharevalidations: 'Please Enter Nominee Share' })
                }
                else {
                    this.setState({ nomineeSharevalidations: '' })
                }
                if (this.state.realtionship == '') {
                    this.setState({ realtionshipvalidations: 'Please Enter Relationship' })
                }
                else {
                    this.setState({ realtionshipvalidations: '' })
                }
                if (this.state.address == '') {
                    this.setState({ addressvalidations: 'Please Enter Address' })
                }
                else {
                    this.setState({ addressvalidations: '' })
                }
                if (this.state.accountholder == '') {
                    this.setState({ accountholdervalidations: 'Please Enter Account Holders Name' })
                }
                else {
                    this.setState({ accountholdervalidations: '' })
                }
                if (this.state.Birthplace == '') {
                    this.setState({ Birthplacevalidations: 'Please Enter Birth Place' })
                }
                else {
                    this.setState({ Birthplacevalidations: '' })
                }
            }
            else {
                this.setState({ isVisible: true })
            }
        }
        else if ((this.state.accountholder == '') || (this.state.Birthplace == '')) {
            if (this.state.accountholder == '') {
                this.setState({ accountholdervalidations: 'Please Enter Account Holders Name' })
            }
            else {
                this.setState({ accountholdervalidations: '' })
            }
            if (this.state.Birthplace == '') {
                this.setState({ Birthplacevalidations: 'Please Enter Birth Place' })
            }
            else {
                this.setState({ Birthplacevalidations: '' })
            }
        }

        else {
            this.setState({ isVisible: true })
        }
    }

    //radiobtn functions
    nomineeoption = (value) => {

        this.setState({ selectedValue: value })
    }
    nomineeminor = (value) => {

        this.setState({ selectedValue1: value })

    }
    politicallyexposed = (value) => {

        this.setState({ selectedValue2: value })

    }
    //textinput functions
    nomineeNamechange = (value) => {
        value = value.toUpperCase()
        if (isNaN(value.charAt(value.length - 1)) || value == "") {
            this.setState({ nomineeName: value })
        }
    }
    Nomineeshare = (value) => {
        if ((value.length <= 3) && (value <= 100)) {
            this.setState({ nomineeShare: value })
        }
    }
    realtionshipValue = (value) => {
        value = value.toUpperCase()
        if (isNaN(value.charAt(value.length - 1)) || value == "") {
            this.setState({ realtionship: value })
        }
    }
    addressValue = (value) => {
        value = value.toUpperCase()

        this.setState({ address: value })

    }
    accountholderChange = (value) => {
        value = value.toUpperCase()
        if (isNaN(value.charAt(value.length - 1)) || value == "") {
            this.setState({ accountholder: value })
        }
    }
    BirthplaceChange = (value) => {
        value = value.toUpperCase()
        if (isNaN(value.charAt(value.length - 1)) || value == "") {
            this.setState({ Birthplace: value })
        }
    }
    //checkbox functions
    existingnomineeCheck = (value) => {
        this.setState({ assetchecked: value })
    }
    accountholderCheck = (value) => {
        this.setState({ accountHolderCheck: value })
    }
    TermsConditions = (value) => {
        this.setState({ TCcheck: value })
    }

    //datepicker functions
    changeNomineeDob = nomineeDob => this.setState({ nomineeDob })

    back = () => {
        if (this.props.navigation.getParam('title') === 'Suggestions') {
            this.props.navigation.navigate('SipSug', this.props.navigation.state.params)
        }
        else {
            this.props.navigation.navigate('doitYourself', this.props.navigation.state.params)
        }
    }
    revertToome = () => {
        this.props.navigation.navigate('LandingPage')
    }

    rendermodalContent() {
        return (
            <View className="nomineethankYoucontainer">
                <View className="nomineeSuccessicon">
                    <Image source={successIcon} style={{ resizeMode: 'contain' }} />
                </View>
                <Text className="nomineeText">Thank You. Your Payment is Successful</Text>
                <View className="nomineeButton">
                    <TouchableOpacity onPress={() => { this.revertToome() }} className="nomineeOpacity">
                        <Text className="nomineeButtontext">OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
                                    <View style={{ marginBottom: 10, width: '80%', alignSelf: 'center', }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: '100%', height: '10%', backgroundColor: 'white', borderRadius: 10 }}>
                                                <View>
                                                    <View style={{ padding: 20, margin: 10 }}>
                                                        <View style={{ borderColor: '#878787', borderWidth: 1 }}>
                                                            <View style={{ margin: 10, }}>
                                                                <View >
                                                                    <Text style={{ fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400' }}>Nominee Details</Text>
                                                                    <Text style={{ fontSize: 16, marginTop: 10, fontFamily: 'sans-serif', fontWeight: '600' }}>Nominations</Text>
                                                                    <View>
                                                                        <Text style={{ fontSize: 12, fontFamily: 'sans-serif', fontWeight: '400', marginTop: 5, color: '#878787', }}>I want to make nominations</Text>

                                                                        <View style={{ marginTop: 5 }}>
                                                                            <RadioGroup name="radiobtn" selectedValue={this.state.selectedValue} onChange={this.nomineeoption}>
                                                                                <Radio value="No" style={{ width: 20 }} />No &nbsp;
                                                                         <Radio value="Yes" style={{ width: 20 }} />Yes
                                                                     </RadioGroup>
                                                                        </View>
                                                                    </View>
                                                                    {this.state.selectedValue === 'Yes' ?
                                                                        <View >
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <Checkbox
                                                                                    label="Click me"
                                                                                    checked={this.state.assetchecked}
                                                                                    color='#00008b'
                                                                                    borderThickness={2}
                                                                                    size={2}
                                                                                    CheckboxIconSize={30}
                                                                                    onChange={this.existingnomineeCheck.bind(this)}
                                                                                    style={{ height: 10, borderWidth: 0 }}
                                                                                />
                                                                                <Text style={{ fontSize: 14, marginTop: 8, fontFamily: 'sans-serif', fontWeight: '400' }}>Apply existing nominee details</Text>
                                                                            </View>
                                                                            <Text style={{ fontSize: 16, marginTop: 20, fontFamily: 'sans-serif', fontWeight: '600', marginBottom: 15 }}>Add Nominee Details</Text>
                                                                            <View style={{ borderWidth: 1, borderColor: '#878787' }}>
                                                                                <View style={{ margin: 10 }}>
                                                                                    <Text style={{ fontSize: 14, marginTop: 10, fontFamily: 'sans-serif', marginBottom: 5 }}>1st Nominee</Text>

                                                                                    {this.state.assetchecked === true ? (
                                                                                        <View style={{ flexDirection: 'row' }}>
                                                                                            <View style={{ width: '50%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>First Nominee's Name</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder='Start typing the fund name'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.NomineeName}
                                                                                                        onChangeText={(value) => { this.nomineeNamechange(value) }}
                                                                                                    />
                                                                                                </View>
                                                                                                {/* <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.nomineeNamevalidations}</Text> */}
                                                                                                <View style={{ marginTop: 15 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>DOB</Text>
                                                                                                    {/* <View style={{ width: '80%' }}>
                                                                                                        <DatePicker
                                                                                                            value={this.state.clientDOB}
                                                                                                            onChange={this.changeNomineeDob}
                                                                                                        />
                                                                                                    </View> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}
                                                                                                        keyboardType="numeric"
                                                                                                        placeholder='Date of Birth'
                                                                                                        maxLength={2}
                                                                                                        value={this.state.DateOfBirth}
                                                                                                        onChangeText={(value) => { this.Nomineeshare(value) }}
                                                                                                    />
                                                                                                </View>
                                                                                                <View style={{ marginTop: 15, zIndex: -9 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Nominee Share(%) </Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}
                                                                                                        keyboardType="numeric"
                                                                                                        placeholder='Nominee Share'
                                                                                                        maxLength={2}
                                                                                                        value={this.state.NomineeShare}
                                                                                                        onChangeText={(value) => { this.Nomineeshare(value) }}
                                                                                                    />
                                                                                                    {/* <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.nomineeSharevalidations}</Text> */}
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ width: '50%', zIndex: -9 }}>
                                                                                                <View style={{}}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Nominee is a minor?</Text>
                                                                                                    <RadioGroup name="radiobtn1" selectedValue={this.state.selectedValue1} onChange={this.nomineeminor}>
                                                                                                        <Radio value="Yes" style={{ width: 20 }} />Yes &nbsp;
                                                                                                                                                         <Radio value="No" style={{ width: 20 }} />No
                                                                                                                                                     </RadioGroup>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 15 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Relationship</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder='Relationship'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.NomineeRelationship}
                                                                                                        onChangeText={(value) => { this.realtionshipValue(value) }}
                                                                                                    />
                                                                                                    {/* <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.realtionshipvalidations}</Text> */}
                                                                                                </View>
                                                                                                <View style={{ marginTop: 15 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Address</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder='Address '
                                                                                                        maxLength={100}
                                                                                                        value={this.state.NomineeAddress}
                                                                                                        onChangeText={(value) => { this.addressValue(value) }}
                                                                                                    />
                                                                                                    {/* <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.addressvalidations}</Text> */}
                                                                                                </View>
                                                                                            </View>
                                                                                        </View>
                                                                                    ) : (<View style={{ flexDirection: 'row' }}>
                                                                                        <View style={{ width: '50%' }}>
                                                                                            <View>
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>First Nominee's Name</Text>
                                                                                                <TextInput
                                                                                                    style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                    placeholder='Start typing the fund name'
                                                                                                    maxLength={50}
                                                                                                    value={this.state.nomineeName}
                                                                                                    onChangeText={(value) => { this.nomineeNamechange(value) }}
                                                                                                />
                                                                                            </View>
                                                                                            <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.nomineeNamevalidations}</Text>
                                                                                            <View style={{ marginTop: 15 }}>
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>DOB</Text>
                                                                                                <View style={{ width: '80%' }}>
                                                                                                    <DatePicker
                                                                                                        value={this.state.nomineeDob}
                                                                                                        onChange={this.changeNomineeDob}

                                                                                                    />
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ marginTop: 15, zIndex: -9 }}>
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Nominee Share(%) </Text>
                                                                                                <TextInput
                                                                                                    style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}
                                                                                                    keyboardType="numeric"
                                                                                                    placeholder='Nominee Share'
                                                                                                    maxLength={2}
                                                                                                    value={this.state.nomineeShare}
                                                                                                    onChangeText={(value) => { this.Nomineeshare(value) }}
                                                                                                />
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.nomineeSharevalidations}</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                        <View style={{ width: '50%', zIndex: -9 }}>
                                                                                            <View style={{}}>
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Nominee is a minor?</Text>
                                                                                                <RadioGroup name="radiobtn1" selectedValue={this.state.selectedValue1} onChange={this.nomineeminor}>
                                                                                                    <Radio value="Yes" style={{ width: 20 }} />Yes &nbsp;
                                                                                                                              <Radio value="No" style={{ width: 20 }} />No
                                                                                                                          </RadioGroup>
                                                                                            </View>
                                                                                            <View style={{ marginTop: 15 }}>
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Relationship</Text>
                                                                                                <TextInput
                                                                                                    style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                    placeholder='Relationship'
                                                                                                    maxLength={50}
                                                                                                    value={this.state.realtionship}
                                                                                                    onChangeText={(value) => { this.realtionshipValue(value) }}
                                                                                                />
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.realtionshipvalidations}</Text>
                                                                                            </View>
                                                                                            <View style={{ marginTop: 15 }}>
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Address</Text>
                                                                                                <TextInput
                                                                                                    style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                    placeholder='Address '
                                                                                                    maxLength={100}
                                                                                                    value={this.state.address}
                                                                                                    onChangeText={(value) => { this.addressValue(value) }}
                                                                                                />
                                                                                                <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.addressvalidations}</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>)}

                                                                                </View>

                                                                            </View>
                                                                        </View>
                                                                        : null}
                                                                    <View style={{ marginTop: 10, marginBottom: 10, zIndex: -9 }}>
                                                                        <View>
                                                                            <Text style={{ fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400' }}>FATCA Details</Text>
                                                                            <Text style={{ fontSize: 16, marginTop: 10, fontFamily: 'sans-serif', fontWeight: '600' }}>FATCA & KYC deatils</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Text style={{ fontSize: 12, marginBottom: 10, fontFamily: 'sans-serif', fontWeight: '400', marginTop: 5, color: '#878787', }}>Foreign Account Tax Compliance Act</Text>
                                                                            <View style={{ borderWidth: 1, borderColor: '#878787' }}>
                                                                                <View style={{ margin: 10 }}>
                                                                                    <Text style={{ fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400' }}>1st Account holder</Text>
                                                                                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
                                                                                        <Checkbox
                                                                                            label="Click me"
                                                                                            checked={this.state.accountHolderCheck}
                                                                                            color='#00008b'
                                                                                            borderThickness={2}
                                                                                            size={2}
                                                                                            CheckboxIconSize={30}
                                                                                            onChange={this.accountholderCheck.bind(this)}
                                                                                            style={{ height: 10, borderWidth: 0 }}
                                                                                        />
                                                                                        <Text style={{ fontSize: 14, marginTop: 8, fontFamily: 'sans-serif', fontWeight: '400' }}>As per FATCA regulations, account holder is a resident and currently lives in india.</Text>

                                                                                    </View>
                                                                                    {this.state.accountHolderCheck === true ?
                                                                                        (<View style={{ flexDirection: 'row' }}>
                                                                                            <View style={{ width: '50%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>First Account Holder's Name</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder="Start typing  Account Holder's Name"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.clientName}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />
                                                                                                    {/* <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.accountholdervalidations}</Text> */}
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Country of Birth</Text>
                                                                                                    {/* <Picker
                                                                                                    style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                    selectedValue={this.state.birthCountry}
                                                                                                    onValueChange={(itemValue, itemIndex) => this.setState({ birthCountry: itemValue })} >
                                                                                                    {this.state.countrylist.map((item, index) => {
                                                                                                        return (
                                                                                                            <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                        )
                                                                                                    })}

                                                                                                </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder="Country of birth"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.clientCOB}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Gross Annual Income</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.annualIncome}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ annualIncome: itemValue })} >
                                                                                                        {this.state.annualincomerange.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}
                                                                                                        placeholder="annual income"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.grossAnnualIncome}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />

                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Are You Politically Exposed?</Text>
                                                                                                    <RadioGroup name="radiobtn2" selectedValue={this.state.selectedValue2} onChange={this.politicallyexposed}>
                                                                                                        <Radio onclick={this.yesclicked} value="Yes" style={{ width: 20 }} />Yes &nbsp;
                                                                         <Radio value="No" style={{ width: 20 }} />No &nbsp;
                                                                         <Radio value="Relative" style={{ width: 20 }} />Relative
                                                                     </RadioGroup>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ width: '50%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Place of Birth</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder='Start typing place of birth'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.Birthplace}
                                                                                                        onChangeText={(value) => { this.BirthplaceChange(value) }}
                                                                                                    />
                                                                                                    {/* <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.Birthplacevalidations}</Text> */}
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Occupation</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.occupation}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ occupation: itemValue })} >
                                                                                                        {this.state.occupationlist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}
                                                                                                        placeholder="occupation"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.occupation}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />

                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Business Income</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.businessIncome}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ businessIncome: itemValue })} >
                                                                                                        {this.state.businessincomelist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}
                                                                                                        placeholder="source of wealth"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.sourceOfWealth}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />
                                                                                                </View>

                                                                                            </View>
                                                                                        </View>)
                                                                                        :
                                                                                        (<View style={{ flexDirection: 'row' }}>
                                                                                            <View style={{ width: '50%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>First Account Holder's Name</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder="Start typing  Account Holder's Name"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.accountholder}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.accountholdervalidations}</Text>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Country of Birth</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.birthCountry}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ birthCountry: itemValue })} >
                                                                                                        {this.state.countrylist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}
                                                                                                    </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder="Country Name"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.birthCountry}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Gross Annual Income</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.annualIncome}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ annualIncome: itemValue })} >
                                                                                                        {this.state.annualincomerange.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}
                                                                                                    </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}
                                                                                                        placeholder="annual income"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.annualIncome}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Are You Politically Exposed?</Text>
                                                                                                    <RadioGroup name="radiobtn2" selectedValue={this.state.selectedValue2} onChange={this.politicallyexposed}>
                                                                                                        <Radio onclick={this.yesclicked} value="Yes" style={{ width: 20 }} />Yes &nbsp;
                                                                         <Radio value="No" style={{ width: 20 }} />No &nbsp;
                                                                         <Radio value="Relative" style={{ width: 20 }} />Relative
                                                                     </RadioGroup>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ width: '50%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Place of Birth</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder='Start typing place of birth'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.Birthplace}
                                                                                                        onChangeText={(value) => { this.BirthplaceChange(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.Birthplacevalidations}</Text>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Occupation</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.occupation}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ occupation: itemValue })} >
                                                                                                        {this.state.occupationlist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder='occupation'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.occupationVal}
                                                                                                        onChangeText={(value) => { this.BirthplaceChange(value) }}
                                                                                                    />
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Business Income</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.businessIncome}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ businessIncome: itemValue })} >
                                                                                                        {this.state.businessincomelist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker> */}
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '80%' }}

                                                                                                        placeholder='Business income'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.businessIncome}
                                                                                                        onChangeText={(value) => { this.BirthplaceChange(value) }}
                                                                                                    />
                                                                                                </View>

                                                                                            </View>
                                                                                        </View>)}
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={{ fontSize: 14, marginTop: 10, fontFamily: 'sans-serif', fontWeight: '600' }}>% Commissions</Text>
                                                                        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
                                                                            <Checkbox
                                                                                label="Click me"
                                                                                checked={this.state.TCcheck}
                                                                                color='#00008b'
                                                                                borderThickness={2}
                                                                                size={2}
                                                                                CheckboxIconSize={30}
                                                                                onChange={this.TermsConditions.bind(this)}
                                                                                style={{ height: 10, borderWidth: 0 }}
                                                                            />
                                                                            <Text style={{ fontSize: 14, marginTop: 8, fontFamily: 'sans-serif', fontWeight: '400' }}>I have read and understood the terms and contents of key information memorandom and statement of additional information and i agree with the <a>terms and conditions</a> mentioned here within and I understand that Mutual Funds investments are subject to market risks.</Text>

                                                                        </View>

                                                                    </View>

                                                                    <View>
                                                                        {this.state.TCcheck ?
                                                                            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, justifyContent: 'flex-end' }}>
                                                                                <TouchableOpacity onPress={() => { this.CONFIRMandPAYNOW() }} style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>CONFIRM AND PAY NOW</Text></TouchableOpacity>
                                                                                {/* <TouchableOpacity onPress={() => { this.ADDMORETRANSACTIONS() }} style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>ADD MORE TRANSACTIONS</Text></TouchableOpacity> */}

                                                                            </View>
                                                                            :
                                                                            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, justifyContent: 'flex-end' }}>
                                                                                <TouchableOpacity style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', opacity: 0.3, pointerEvents: 'none' }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>CONFIRM AND PAY NOW</Text></TouchableOpacity>
                                                                                {/* <TouchableOpacity onPress={() => { this.ADDMORETRANSACTIONS() }} style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>ADD MORE TRANSACTIONS</Text></TouchableOpacity> */}

                                                                            </View>
                                                                        }
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                        <View style={{ marginBottom: 10, width: '100%', alignSelf: 'center', marginTop: 20 }}>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: '90%', height: '10%', backgroundColor: 'white', borderRadius: 10 }}>
                                                    <View>
                                                        <View style={{ padding: 10, margin: 5 }}>
                                                            <View style={{ borderColor: '#878787', borderWidth: 1 }}>
                                                                <View style={{ margin: 10, }}>
                                                                    <View >
                                                                        <Text style={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: '400' }}>Nominee Details</Text>
                                                                        <Text style={{ fontSize: 14, marginTop: 10, fontFamily: 'sans-serif', fontWeight: '600' }}>Nominations</Text>
                                                                        <View>
                                                                            <Text style={{ fontSize: 12, fontFamily: 'sans-serif', fontWeight: '400', marginTop: 5, color: '#878787', }}>I want to make nominations</Text>

                                                                            <View style={{ marginTop: 5 }}>
                                                                                <RadioGroup name="radiobtn" selectedValue={this.state.selectedValue} onChange={this.nomineeoption}>
                                                                                    <Radio value="No" style={{ width: 20 }} />No &nbsp;
                                                                         <Radio value="Yes" style={{ width: 20 }} />Yes
                                                                     </RadioGroup>
                                                                            </View>


                                                                        </View>
                                                                        {this.state.selectedValue === 'Yes' ?
                                                                            <View >
                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                    <Checkbox
                                                                                        label="Click me"
                                                                                        checked={this.state.assetchecked}
                                                                                        color='#00008b'
                                                                                        borderThickness={2}
                                                                                        size={2}
                                                                                        CheckboxIconSize={30}
                                                                                        onChange={this.existingnomineeCheck.bind(this)}
                                                                                        style={{ height: 10, borderWidth: 0 }}
                                                                                    />
                                                                                    <Text style={{ fontSize: 14, marginTop: 8, fontFamily: 'sans-serif', fontWeight: '400' }}>Apply existing nominee details</Text>
                                                                                </View>
                                                                                <Text style={{ fontSize: 16, marginTop: 20, fontFamily: 'sans-serif', fontWeight: '600', marginBottom: 15 }}>Add Nominee Details</Text>
                                                                                <View style={{ borderWidth: 1, borderColor: '#878787' }}>
                                                                                    <View style={{ margin: 10 }}>
                                                                                        <Text style={{ fontSize: 14, marginTop: 10, fontFamily: 'sans-serif', marginBottom: 5 }}>1st Nominee</Text>
                                                                                        <View style={{}}>
                                                                                            <View style={{ width: '100%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>First Nominee's Name</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '100%' }}

                                                                                                        placeholder='Start typing the fund name'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.nomineeName}
                                                                                                        onChangeText={(value) => { this.nomineeNamechange(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.nomineeNamevalidations}</Text>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 15 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>DOB</Text>
                                                                                                    <View style={{ width: '100%' }}>
                                                                                                        <DatePicker
                                                                                                            value={this.state.nomineeDob}
                                                                                                            onChange={this.changeNomineeDob}

                                                                                                        />
                                                                                                    </View>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 15, zIndex: -9 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Nominee Share(%) </Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '100%' }}
                                                                                                        keyboardType="numeric"
                                                                                                        placeholder='Nominee Share'
                                                                                                        maxLength={2}
                                                                                                        value={this.state.nomineeShare}
                                                                                                        onChangeText={(value) => { this.Nomineeshare(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.nomineeSharevalidations}</Text>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ width: '100%', zIndex: -9 }}>
                                                                                                <View style={{}}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Nominee is a minor?</Text>
                                                                                                    <RadioGroup name="radiobtn1" selectedValue={this.state.selectedValue1} onChange={this.nomineeminor}>
                                                                                                        <Radio value="Yes" style={{ width: 20 }} />Yes &nbsp;
                                                                         <Radio value="No" style={{ width: 20 }} />No
                                                                     </RadioGroup>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 15 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Relationship</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '100%' }}

                                                                                                        placeholder='Relationship'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.realtionship}
                                                                                                        onChangeText={(value) => { this.realtionshipValue(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.realtionshipvalidations}</Text>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 15 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Address</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '100%' }}

                                                                                                        placeholder='Address '
                                                                                                        maxLength={100}
                                                                                                        value={this.state.address}
                                                                                                        onChangeText={(value) => { this.addressValue(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.addressvalidations}</Text>
                                                                                                </View>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>

                                                                                </View>
                                                                            </View>
                                                                            : null}
                                                                        <View style={{ marginTop: 10, marginBottom: 10, zIndex: -9 }}>
                                                                            <View>
                                                                                <Text style={{ fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400' }}>FATCA Details</Text>
                                                                                <Text style={{ fontSize: 16, marginTop: 10, fontFamily: 'sans-serif', fontWeight: '600' }}>FATCA & KYC deatils</Text>
                                                                            </View>
                                                                            <View>
                                                                                <Text style={{ fontSize: 12, marginBottom: 10, fontFamily: 'sans-serif', fontWeight: '400', marginTop: 5, color: '#878787', }}>Foreign Account Tax Compliance Act</Text>
                                                                                <View style={{ borderWidth: 1, borderColor: '#878787' }}>
                                                                                    <View style={{ margin: 10 }}>
                                                                                        <Text style={{ fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400' }}>1st Account holder</Text>
                                                                                        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
                                                                                            <Checkbox
                                                                                                label="Click me"
                                                                                                checked={this.state.accountHolderCheck}
                                                                                                color='#00008b'
                                                                                                borderThickness={2}
                                                                                                size={2}
                                                                                                CheckboxIconSize={30}
                                                                                                onChange={this.accountholderCheck.bind(this)}
                                                                                                style={{ height: 10, borderWidth: 0 }}
                                                                                            />
                                                                                            <Text style={{ fontSize: 14, marginTop: 5, fontFamily: 'sans-serif', fontWeight: '400' }}>As per FATCA regulations, account holder is a resident and currently lives in india.</Text>

                                                                                        </View>
                                                                                        <View style={{}}>
                                                                                            <View style={{ width: '100%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>First Account Holder's Name</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '100%' }}

                                                                                                        placeholder="Start typing  Account Holder's Name"
                                                                                                        maxLength={50}
                                                                                                        value={this.state.accountholder}
                                                                                                        onChangeText={(value) => { this.accountholderChange(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.accountholdervalidations}</Text>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Country of Birth</Text>
                                                                                                    <Picker
                                                                                                        style={{ width: '100%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.birthCountry}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ birthCountry: itemValue })} >
                                                                                                        {this.state.countrylist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Gross Annual Income</Text>
                                                                                                    <Picker
                                                                                                        style={{ width: '100%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.annualIncome}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ annualIncome: itemValue })} >
                                                                                                        {this.state.annualincomerange.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Are Yoy Politically Exposed?</Text>
                                                                                                    <RadioGroup name="radiobtn2" selectedValue={this.state.selectedValue2} onChange={this.politicallyexposed}>
                                                                                                        <Radio onclick={this.yesclicked} value="Yes" style={{ width: 20 }} />Yes &nbsp;
                                                                         <Radio value="No" style={{ width: 20 }} />No &nbsp;
                                                                         <Radio value="Relative" style={{ width: 20 }} />Relative
                                                                     </RadioGroup>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ width: '100%' }}>
                                                                                                <View>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Place of Birth</Text>
                                                                                                    <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '100%' }}

                                                                                                        placeholder='Start typing place of birth'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.Birthplace}
                                                                                                        onChangeText={(value) => { this.BirthplaceChange(value) }}
                                                                                                    />
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', color: 'red' }}>{this.state.Birthplacevalidations}</Text>
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Occupation</Text>
                                                                                                    {/* <Picker
                                                                                                        style={{ width: '100%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.occupation}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ occupation: itemValue })} >
                                                                                                        {this.state.occupationlist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker> */}
                                                                                                      <TextInput
                                                                                                        style={{ width: '-webkit-fill-available', height: 30, borderWidth: 0.5, fontFamily: 'sans-serif', paddingLeft: 6, borderColor: '#969696', width: '100%' }}

                                                                                                        placeholder='occupation'
                                                                                                        maxLength={50}
                                                                                                        value={this.state.occupationVal}
                                                                                                        onChangeText={(value) => { this.BirthplaceChange(value) }}
                                                                                                    />
                                                                                                </View>
                                                                                                <View style={{ marginTop: 10 }}>
                                                                                                    <Text style={{ fontSize: 12, marginTop: 10, fontFamily: 'sans-serif', }}>Business Income</Text>
                                                                                                    <Picker
                                                                                                        style={{ width: '100%', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif', fontFamily: 14, marginTop: 10 }}
                                                                                                        selectedValue={this.state.businessIncome}
                                                                                                        onValueChange={(itemValue, itemIndex) => this.setState({ businessIncome: itemValue })} >
                                                                                                        {this.state.businessincomelist.map((item, index) => {
                                                                                                            return (
                                                                                                                <Picker.Item label={item.dropdownlist} value={item.dropdownlist} />
                                                                                                            )
                                                                                                        })}

                                                                                                    </Picker>
                                                                                                </View>

                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        <View>
                                                                            <Text style={{ fontSize: 14, marginTop: 10, fontFamily: 'sans-serif', fontWeight: '600' }}>% Commissions</Text>
                                                                            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
                                                                                <Checkbox
                                                                                    label="Click me"
                                                                                    checked={this.state.TCcheck}
                                                                                    color='#00008b'
                                                                                    borderThickness={2}
                                                                                    size={2}
                                                                                    CheckboxIconSize={30}
                                                                                    onChange={this.TermsConditions.bind(this)}
                                                                                    style={{ height: 10, borderWidth: 0 }}
                                                                                />
                                                                                <Text style={{ fontSize: 14, marginTop: 8, fontFamily: 'sans-serif', fontWeight: '400' }}>I have read and understood the terms and contents of key information memorandom and statement of additional information and i agree with the <a>terms and conditions</a> mentioned here within and I understand that Mutual Funds investments are subject to market risks.</Text>

                                                                            </View>

                                                                        </View>

                                                                        <View>
                                                                            {this.state.TCcheck ?
                                                                                <View style={{ marginBottom: 10, marginTop: 10, justifyContent: 'flex-end' }}>
                                                                                    <TouchableOpacity onPress={() => { this.CONFIRMandPAYNOW() }} style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>CONFIRM AND PAY NOW</Text></TouchableOpacity>
                                                                                    {/* <TouchableOpacity onPress={() => { this.ADDMORETRANSACTIONS() }} style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center',marginTop:10 }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>ADD MORE TRANSACTIONS</Text></TouchableOpacity> */}

                                                                                </View>
                                                                                :
                                                                                <View style={{ marginBottom: 10, marginTop: 10, justifyContent: 'flex-end' }}>
                                                                                    <TouchableOpacity style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: 0.3 }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>CONFIRM AND PAY NOW</Text></TouchableOpacity>
                                                                                    {/* <TouchableOpacity onPress={() => { this.ADDMORETRANSACTIONS() }} style={{ width: 200, height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center',marginTop:10 }}><Text style={{ fontSize: 14, fontFamily: 'sans-serif', color: 'white' }}>ADD MORE TRANSACTIONS</Text></TouchableOpacity> */}

                                                                                </View>
                                                                            }
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
                    <Modal isVisible={this.state.isVisible} className="thankYoumodal" rendermodalContent={this.rendermodalContent()} />
                </ThemeProvider>
            </View>
        );
    }



}

export default nomineeDetails;

