import fetch from 'dva/fetch';
// import cookie from 'js-cookie';
// import qs from 'qs';
// import moment from 'moment';
import { handleErrorCode, handleRequestError } from "./error.js";
import app from "config/app";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleUrl(url) {
  //传入_p 
  // url += "&" + qs.stringify(params); 
  if (url.substr(0, 4) !== 'http')
    url = app.rootUrl + url;
  return url;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let finalUrl = handleUrl(url);

  let formData = new FormData();
  for (var key in options.body) {
    formData.append(key, options.body[key]);
  }
  if (options.method && options.method == 'post') {
    options.body = formData;
  }

  const opts = { ...options };
  opts.headers = {
    ...opts.headers,
  };
  console.log(finalUrl, opts)
  return fetch(finalUrl, opts)
    .then(checkStatus)
    .then(response => response.json())
    .then(handleErrorCode)
    // .then(afterRequest)
    .catch(handleRequestError);
}
