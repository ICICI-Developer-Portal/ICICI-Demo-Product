/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
import axios from 'axios';
import qs from 'qs';
//import { getToken, clearToken } from '../helpers/utility';
import CONFIG from '../services/config';
// import { UNAUTHORIZED } from '../constants/status-code';

var internals = {};
const sessionKey = sessionStorage.getItem('sessionKey');

internals.requestServer = function(
  endPoint,
  data,
  method,
  headers,
  url,
  contentType,
  noAuth
) {
  let defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': contentType || 'application/json',
    'X-Auth_Token': sessionKey
  };
  // if (!noAuth) {
  //     defaultHeaders['auth-token'] = getToken().get('idToken')
  // }
  if (!noAuth) {
    defaultHeaders['X-Auth_Token'] = sessionKey;
  }
  var params = {
    method: method || 'GET',
    headers: Object.assign(headers || {}, defaultHeaders)
  };

  if (data) {
    if (params.method === 'GET') {
      endPoint += (endPoint.indexOf('?') > -1 ? '&' : '?') + qs.stringify(data);
    } else {
      params.data = data;
      // console.log("data >> ",params.data);
    }
  }

  if (url === 'demo') {
    params.url = CONFIG.development.DEMO_URL + endPoint;
  } 

  return axios(params, { crossDomain: true })
    .then(function(response) {
      return response.data;
    })
    .then(function(response) {
      if (response.statusCode === 401) {
        //clearToken();
        throw 'Invalid Credentials';
      } else {
        // console.log("response>> ",response);
        return response;
      }
    })

    .catch(function(error) {
      throw error.response;
    });
};

export default internals.requestServer;
