import React, { Component }  from "react";
import { View, Button, StyleSheet, Image, TouchableOpacity,Text } from "react-native";
import { withRouter } from "react-router-dom";
const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    backgroundColor: "#f6f6f6",
    height:'80px'
  },
  
   
  

});
class TopNav extends Component {
// const  { homePage} = () => {
//   alert('hi');
// }
//const TopNav = ({ history }) => {

  //yields: "/js" (where snippets run)
  // console.log("boooooooooooooooo",window.location.href); 
  constructor(props){
    super(props)
  }
  render(){
  console.log('top nav', this.props)
    
    console.log("file location",window.location.pathname); 
  return (
 
<nav class="navbar navbar-expand-lg navbar-light bg-light">
{window.location.pathname !== '/' && window.location.pathname !== '/LandingPage' ? (
<TouchableOpacity 
 onPress={ ()=>{ this.props.navigation.navigate("LandingPage") }}



style={{backgroundColor:'transparent', alignSelf:'left'}}>
        <Image  source={require('./assets/images/icici_bank_logo_symbol.png')} style={{resizeMode:'contain', width:200, height: 72}} />
</TouchableOpacity>) : (
  <TouchableOpacity  
 style={{backgroundColor:'transparent', alignSelf:'left'}}>
         <Image  source={require('./assets/images/icici_bank_logo_symbol.png')} style={{resizeMode:'contain', width:200, height: 72}} />
 </TouchableOpacity>
)}
  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
    </ul>
    <span class="navbar-text navbar-right" style={{float:'right'}}>
 
    <ul class="navbar-nav navbar-right">
      <li className="nav-item active">
      <View style={{ flexDirection: 'row', marginTop: 10,alignSelf:'right',marginLeft:5 }}>
                <TouchableOpacity onPress={()=>{history.push("/trackApplication")}} style={{ flex: 3, alignItems:'center',justifyContent:'center',backgroundColor: '#B02A31',borderColor: 'white', borderRadius: 20, height: 40, width: 120, cursor: 'pointer',  }}><Text style={{ fontSize: 14, color: '#696969',  fontWeight: '400', textAlign: 'center', color: 'white',  }}>TRACK</Text></TouchableOpacity>
              </View>
      </li>
      <li className="nav-item">
      <View style={{ flexDirection: 'row', marginTop: 10,alignSelf:'right', marginLeft:5 }}>
                <TouchableOpacity onPress={ ()=>{ history.push("/") }} style={{ flex: 3, alignItems:'center',justifyContent:'center',backgroundColor: '#B02A31',borderColor: 'white', borderRadius: 20, height: 40, width: 120, cursor: 'pointer',  }}><Text style={{ fontSize: 14, color: '#696969',  fontWeight: '400', textAlign: 'center', color: 'white',  }}>REFRESH</Text></TouchableOpacity>
              </View>
      </li>
    
    </ul>
    </span>
  </div> */}
    {window.location.pathname !== '/' && window.location.pathname !== '/LandingPage' ? (
  <TouchableOpacity 
  onPress={ ()=>{ this.props.navigation.navigate("LandingPage") }} style={{backgroundColor:'transparent', right:20,position:'absolute'}}>
       <Text style={{ fontSize: 20, fontFamily: 'sans-serif', color:'#000072'}}>Home</Text>
</TouchableOpacity>
 ) : (
  null
)}
</nav>
  );
 };
//};


}
export default withRouter(TopNav);
