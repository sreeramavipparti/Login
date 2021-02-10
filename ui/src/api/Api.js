import Axios from 'axios';

//const baseURL = 'http://api';
const baseURL = 'http://127.0.0.1:8000';
const headers = {
  "Content-Type": "application/json"
}
const formHeaders = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data"
}

var getNonce = async () => {
  let config = {
    baseURL: baseURL,
    url: 'nonce',
    method: 'GET',
    headers: headers
  };
  let ret = '';
  await Axios(config)
    .then(resp => {
      ret = resp.data.nonce;
    })
    .catch(err => {
      ret = err;
      console.error(err);
    });
  return ret;
} // getNonce()

var getRqNoWait = (url,data) => {
  let config = {
    baseURL: baseURL,
    url: url,
    method: 'GET',
    headers: headers,
    params: data
  }
  let ret = '';
  Axios(config)
  .then(resp => {
    ret = resp.data;
  })
  .catch(err => {
    console.error(err);
  })
  return ret;
} // getRqNoWait

var getRq = async (url, data) => {
  let config = {
    baseURL: baseURL,
    url: url,
    method: 'GET',
    headers: headers,
    params: data
  };
  console.log(config)
  let ret = '';
  await Axios(config)
    .then(resp => {
      ret = resp.data;
      console.log(ret);
    })
    .catch(err => {
      ret = err;
      console.error(err);
    });
  return ret;
} // getRq

var postRqNoWait = (url, data) => {
  let config = {
    baseURL: baseURL,
    url: url,
    method: 'POST',
    headers: formHeaders,
    data: data
  };
  let ret = '';
  Axios(config)
    .then(resp => {
      ret = resp.data;
    })
    .catch(err => {
      console.error(err);
    });
  return ret;
} // postRqNoWait

var postRq = async (url, data) => {
  let config = {
    baseURL: baseURL,
    url: url,
    method: 'POST',
    headers: formHeaders,
    data: data
  };
  let ret = '';
  await Axios(config)
    .then(resp => {
      ret = resp.data;
    })
    .catch(err => {
      console.error(err);
    });
  return ret;
} // postRq
var Api={getRq, getRqNoWait, postRq, postRqNoWait, getNonce};
export default (Api);