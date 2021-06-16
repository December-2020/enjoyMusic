"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // 全局服务器地址
  baseURL:'http://music.kele8.cn/',
  // baseURL:'http://localhost:3000',
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // 请求服务器超时时间
  // timeout: 60 * 1000, // Timeout 
  // 是否需要跨域
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // 需要的数据
    // console.log('响应拦截器',response.data.result);
    // Do something with response data
    // 返回的所有数据
    return response;
    // return response.data.result;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Plugin.install = function(Vue, options) {
Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
