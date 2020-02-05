import React, { Component } from 'react';
import './error.css';
import ErrorWrong from '../assets/images/oops1.png';
import { withRouter } from "react-router-dom";
import { View, Image, Text } from "react-native";
import TopNav from '../TopNav'



class Error extends Component {
    
    componentWillMount() {
        this.props.changeBackground('white');
    }

    render() {
        return (
            <View>
                <TopNav navigation = {this.props.navigation} />
            <View className="errorContainer">
                <View className="image_container">
                    <Image source={ErrorWrong} className="error_image" style={{resizeMode:'contain'}} />
                    {/* <Text className="error_msg">Oops! Something Went Wrong</Text> */}
                </View>
            </View>
            </View>
        )
    }

}
export default withRouter(Error);