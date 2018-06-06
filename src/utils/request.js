
import fetch from 'dva/fetch';
import { showLoading } from "./utils";
import { getUserInfo , getAuthToken,messageInfo } from './utils';
import { TIMEOUTTIME } from '../config/constants'
import localforage from 'localforage';
import { routerRedux } from 'dva/router'

function checkStatus(response) {
  if(response.status == 401 ){
   localforage.clear();
   throw new Error('登录过期')
   return {
     success:false,
     msg:'登录过期,请重新登录'
   }
  }else{
    return {
      success:true,
      data:response
    }
  }

}

// 超时版的fetch
async function _fetch(fetch) {
  return Promise.race([
      fetch,
      new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve({
              status:1
            });
            return {
              status:1
            }
          }, TIMEOUTTIME);
      })
  ]);
}

function showMsg(str,config){
  if(config.method !== 'GET' && config.method !=='get'){
    messageInfo(str);
  }
}

export default async function request(url, options) {

  let authToken = await getAuthToken();



  const myHeader = new Headers({
    "Content-Type": "application/json",
  });

  let config = {
    mode: 'cors',
    headers:myHeader,
    method:'POST'
  };

  if(options){
    if(options.type){
      config.method = options.type;
    }
    //有body
    options.body?config.body = JSON.stringify(options.body):null;

  }else{
    config.method = 'POST';
    config.body = JSON.stringify(options);
  }

  try {

    const response = await _fetch(fetch(url, config));

    const data = await response.json();

    if(response.status == 200){//状态码为200
     
        return {
          data:data,
          success:true,
        }
      
    }
  } catch (error) {

    showMsg('服务未启动',config);
    return {
      success:false,
      msg:'服务未启动'
    }
  }

}
