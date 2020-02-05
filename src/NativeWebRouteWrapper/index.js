import { Route } from "react-router-dom";
import { ModalRoute } from "react-router-modal";
import React from "react";
import PropTypes from "prop-types";
import "react-router-modal/css/react-router-modal.css";


function Wrapper({ element, history, match, routeMap, closeModal, location }) {
  const navigate = (to, params) => {
    let url = routeMap[to].path;
    // // replace params ids in the url with actual values
    // if (params && Object.keys(params).length > 0) {
    //   Object.keys(params).forEach(param => {
    //     console.log(param)
    //     const re = RegExp(`\:${param}\\??`); // eslint-disable-line no-useless-escape
    //     console.log(escape(params[param]))
    //     console.log(re);
    //     url = url.replace(re, escape(params[param]));
    //   });
    // }

    // console.log(url)
    // // removing empty params from url - every string between /: and ?
    // url = url.replace(/\/:(.*?)(?=\/|$)/g, "");
    // if the route is not a modal

    console.log(params)

    if (!routeMap[to].modal) {
      history.push({
        pathname: url,
        state: params
      })


      // if the route is a modal
    } else {
      // checking if the url ends with a slash or not
      const slash = /\/$/.test(match.url) ? "" : "/";
      // current url in the browser + slash + modal url with parameters
      url = match.url + slash + url;
      // removing the */ from the url
      url = url.replace(/\*\/?/g, "");
      history.push({
        pathname: url,
        state: { detail: "hello" }
      })
    }
  };



  const state = {
     params: location.state
  }

  const getParam = (param, alternative) => {
    console.log("cdcd",location.state)
    return location.state[param]
  };

  const goBack = () => {
    history.goBack();
  };

  const goForward = () => {
    history.goForward();
  };

  return React.cloneElement(element, {
    navigation: { navigate, getParam, goBack, state,goForward },
    closeModal
  });
}

Wrapper.propTypes = {
  element: PropTypes.element,
  history: PropTypes.object,
  routeMap: PropTypes.object,
  closeModal: PropTypes.func,
  match: PropTypes.object
};

const WebRoutesGenerator = ({ routeMap }, changeBackground) => {
  return Object.keys(routeMap).map(route => {
    const currentRoute = routeMap[route];
    const Component = currentRoute.component;
    if (currentRoute.modal) {
      return (
        <ModalRoute
          key={currentRoute.path}
          path={currentRoute.path}
          component={props => (
            <Wrapper element={<Component changeBackground={changeBackground } />} {...props} routeMap={routeMap} />
          )}
        />
      );
    } else {
      return (
        <Route
          key={currentRoute.path}
          path={currentRoute.path}
          exact={currentRoute.exact}
          render={props => (
            <Wrapper element={<Component changeBackground={changeBackground }/>} {...props} routeMap={routeMap} />
          )}
        />
      );
    }
  });
};

WebRoutesGenerator.propTypes = {
  routeMap: PropTypes.object
};

export default WebRoutesGenerator;
