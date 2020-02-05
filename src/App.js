// App.js - WEB
import React, { Component } from 'react';
import { View } from 'react-native';
import WebRoutesGenerator from './NativeWebRouteWrapper';
import { ModalContainer } from 'react-router-modal';
import LandingPage from './LandingPage'
import TopNav from './TopNav';
import product from './product';
import pdfView from './pdfView';
import currentHoldings from './currentHoldings'
import InvestNow from './InvestNow'
import fundDetails from './fundDetails'
import Sip from './sip'
import oneTimeInvestment from './oneTimeInvestment'
import doitYourself from './doitYourslef'
import riskProfile from './riskProfile'
import assetallocation from './assetallocation'
import nomineeDetails from './nomineeDetails'
import ErrorPage from './Error/error';
import SipSug from './SipIPSuggestion/sipSuggestion';
import openingPage from './components/openingPage';


const routeMap = {
  Home: {
    component: openingPage,
    path: '/',
    exact: true
  },
  product : {
    component: product,
    path: '/product'
  },
  LandingPage : {
    component: LandingPage,
    path: '/LandingPage'
  },
  currentHoldings : {
    component: currentHoldings,
    path: '/currentHoldings'
  },
  fundDetails : {
    component: fundDetails,
    path: '/fundDetails'
  },
  InvestNow : {
    component: InvestNow,
    path: '/investNow'
  },
  Sip : {
    component: Sip,
    path: '/sip'
  },
  oneTimeInvestment : {
    component: oneTimeInvestment,
    path: '/oneTimeInvestment'
  },
  riskProfile : {
    component: riskProfile,
    path: '/riskProfile'
  },
  doitYourself : {
    component: doitYourself,
    path: '/doitYourself'
  },
  assetallocation : {
    component: assetallocation,
    path: '/assetallocation'
  },
  nomineeDetails : {
    component: nomineeDetails,
    path: '/nomineeDetails'
  },
  ErrorPage : {
    component: ErrorPage,
    path: '/errorPage'
  },
  SipSug : {
    component: SipSug,
    path: '/sipSuggestion'
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor:'#F36414'
      }

    // Store the previous pathname and search strings
    this.currentPathname = null;
    this.currentSearch = null;
  }

  componentDidMount() {
    const { history } = this.props;

    // history.listen((newLocation, action) => {
    //   if (action == "PUSH") {
    //     if (
    //       newLocation.pathname !== this.currentPathname ||
    //       newLocation.search !== this.currentSearch
    //     ) {
    //       // Save new location
    //       this.currentPathname = newLocation.pathname;
    //       this.currentSearch = newLocation.search;

    //       // Clone location object and push it to history
    //       history.push({
    //         pathname: newLocation.pathname,
    //         search: newLocation.search
    //       });
    //     }
    //   } else {
    //     // Send user back if they try to navigate back
    //     history.go(1);
    //   }
    // });
  }
  changeBackground = (color) => {
    this.setState({backgroundColor: color })
    }

  render() {
    console.log('app.js', this.props)
    return (
   
          <View style={{ minHeight:'100vh', height:'100%', backgroundColor:this.state.backgroundColor }}>

            {/* <TopNav /> */}
           <View style={{paddingTop:0, paddingBottom:0, margin:'auto' , width:'100%', marginTop:0, marginBottom:0}}>
            {WebRoutesGenerator({ routeMap }, this.changeBackground)}
            <ModalContainer />
          </View>
          </View>

    );
  }
}

export default App;
