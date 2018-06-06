import _ from 'lodash';
import {operator, administrators, payType, contractType, checked, enable, premission, use,cupboard_model,mcu_model,android_model,android_sdk,frequency,assigned,has_camera,has_vi,state_status1,dbr_worker,sex,inventory_status1,goods_status1,door1,lock1,pay_type,credited,bad_level,publish_status1,order_id_status1,app_status1} from './config';
import moment from 'moment';


const filterconfig = [
  {
    root: administrators
  },
  {
    type1: dbr_worker
  },
  {
    contract_type: contractType
  },
  {
    payment_type: payType
  },
  {
    verified: checked
  },
  {
    enabled: enable
  },
  {
    used: use
  },
  {
    cupboard_model: cupboard_model
  },
  {
    mcu_model: mcu_model
  },
  {
    android_model: android_model
  },
  {
    android_sdk: android_sdk
  },
  {
    frequency: frequency
  },
  {
    assigned: assigned
  },
  {
    has_camera: has_camera
  },
  {
    has_vi: has_vi
  },
  {
    status1:state_status1
  },
  {
    sex:sex
  },
  {
    inventory_status1:inventory_status1
  },
  {
    goods_status1:goods_status1
  },
  {
    door1:door1
  },
  {
    lock1:lock1
  },
  {
    pay_type:pay_type
  },
  {
    credited:credited
  },
  {
    publish_status1:publish_status1
  },
  {
    order_id_status1:order_id_status1
  },
  {
    app_status1:app_status1
  }
];


function processdata(data) {
  if (Array.isArray(data)) {
    let datainfo = _.cloneDeep(data);
    datainfo.map((item) => {
      /***
       * @parmas k 配置文件的每一个对象 {payment_type:payType}
       * @parmas v 配置文件对象的下标 3
       * @parmas j contractType ['默认','全款合同','分期合同']
       * @parmas m 配置文件的属性payment_type
       */
      filterconfig.map((k, v) => {
        for (let m in k) {
          for (let j = 0; j < k[m].length; j++) {
            if (item[m] == j) {
              item[m] = k[m][j];
            }
          }
        }
      });
      return item;
    })
    return datainfo;
  } else if (data) {
    /***
     * 如果对象存在
     */
    filterconfig.map((k, v) => {
      for (let m in k) {
        for (let j = 0; j < k[m].length; j++) {
          if (data[m] == j) {
            data[m] = k[m][j];
          }
        }
      }
    })
    return data
  } else {
    return "";
  }
}

function unprocessdata(data) {
  if (Array.isArray(data)) {
    let datainfo = _.cloneDeep(data);
    datainfo.map((item) => {
      /***
       * @parmas k 配置文件的每一个对象 {payment_type:payType}
       * @parmas v 配置文件对象的下标 3
       * @parmas j contractType ['默认','全款合同','分期合同']
       * @parmas m 配置文件的属性payment_type
       */
      filterconfig.map((k, v) => {
        for (let m in k) {
          for (let j = 0; j < k[m].length; j++) {
            if (item[m] == k[m][j]) {
              item[m] = j;
            }
          }
        }
      });
    })
    return datainfo;
  } else if (data) {
    /***
     * @parmas k 配置文件的每一个对象 {payment_type:payType}
     * @parmas v 配置文件对象的下标 3
     * @parmas j contractType ['默认','全款合同','分期合同']
     * @parmas m 配置文件的属性payment_type
     */
    filterconfig.map((k, v) => {
      for (let m in k) {
        for (let j = 0; j < k[m].length; j++) {
          if (data[m] == k[m][j]) {
            data[m] = j;
          }
        }
      }
    });
    return data
  }
}


function getbadlevel(data) {
  if (Array.isArray(data)) {
    bad_level.map((item) => {
      for (let m in item) {
        for (let j = 0; j < data.length; j++) {
          if (data[j]["bad_level"] == m) {
            data[j]["bad_level"] = item[m];
          }
        }
      }
    })
    return data;
  } else {
    bad_level.map((item) => {
      for (let m in item) {
        for (let k in data) {
          if (k == "bad_level" && data[k] == m) {
            data[k] = item[m];
          }
        }
      }
    })
    return data;
  }
}




function getpremission(data) {
  premission.map((item) => {
    for (let m in item) {
      for (let j = 0; j < data.length; j++) {
        if (data[j] == m) {
          data[j] = item[m];
        }
      }
    }
  })
  return data;
}



function parsepremission(data){
  premission.map((item) =>{
    for(let m in item){
      for(let k in data){
        // item[m] = "新增"
        for(let i=0;i<data[k].length;i++){
          if(data[k][i] ==item[m]){
            data[k][i] = m
          }
        }
      }
    }
  });
  return data;
}


function setKey(data) {
  if (data) {
    data.map((k, v) => {
      k.key = v;
    })
    return data
  } else {
    return [];
  }
}


/**
 * 金额转化的方法
 * @param data 要转化的对象或者对象数组
 * @param arr  转化的属性集合
 * @returns {*}
 */
function formatMoney(data,arr) {
  if(Array.isArray(data)){
    data.map((item) => {
      for(let j=0;j<arr.length;j++){
        item[arr[j]] = item[arr[j]].toString().replace(/\$|\,/g,'');
        if(isNaN(item[arr[j]]))
          item[arr[j]] = "0";
        let sign = (item[arr[j]] == (item[arr[j]] = Math.abs(item[arr[j]])));
        item[arr[j]] = Math.floor(item[arr[j]]*100+0.50000000001);
        // cents = item[arr[j]]%100;
        item[arr[j]] = Math.floor(item[arr[j]]/100).toString();
        // if(cents<10)
        // cents = "0" + cents;
        for (var i = 0; i < Math.floor((item[arr[j]].length-(1+i))/3); i++)
          item[arr[j]] = item[arr[j]].substring(0,item[arr[j]].length-(4*i+3))+','+
            item[arr[j]].substring(item[arr[j]].length-(4*i+3));
        // item[arr[j]] = (((sign)?'':'-') + item[arr[j]] + '.' + cents);
        item[arr[j]] = (((sign)?'':'-') + item[arr[j]]);
      }
    })
    return data
  } else if (data){
    for(let j=0;j<arr.length;j++){
      data[arr[j]] = data[arr[j]].toString().replace(/\$|\,/g,'');
      if(isNaN(data[arr[j]]))
        data[arr[j]] = "0";
      let sign = (data[arr[j]] == (data[arr[j]] = Math.abs(data[arr[j]])));
      data[arr[j]] = Math.floor(data[arr[j]]*100+0.50000000001);
      data[arr[j]] = Math.floor(data[arr[j]]/100).toString();
      for (var i = 0; i < Math.floor((data[arr[j]].length-(1+i))/3); i++)
        data[arr[j]] = data[arr[j]].substring(0,data[arr[j]].length-(4*i+3))+','+
          data[arr[j]].substring(data[arr[j]].length-(4*i+3));
      data[arr[j]] = (((sign)?'':'-') + data[arr[j]]);
    }
    return data
  } else {
    return data
  }
}

/**
 * 数组对象去重
 * @param arr
 * @param parmas 去重依据的参数
 * @returns {*}
 */
function unique(arr,parmas){
  if(arr.length>0){
    var res = [];
    var json = {};
    for(var i = 0; i < arr.length; i++){
      if(arr[i] && (!json[arr[i][parmas]])){
        res.push(arr[i]);
        json[arr[i][parmas]] = 1;
      }
    }
    return res;
  }
}

/**
 * 数组去空
 * @param arr
 * @returns {*}
 */
function unempty(arr) {
  for(var i = 0 ;i<arr.length;i++)
  {
    if(arr[i] == "" || typeof(arr[i]) == "undefined")
    {
      arr.splice(i,1);
      i= i-1;
    }
  }
  return arr;
}


function replaceEmptyItem(arr){
  for(var i=0,len=arr.length;i<len;i++){
    if(!arr[i]|| arr[i]==''){
      arr.splice(i,1);
      len--;
    }
  }
  return arr;
}

/**
 * _enabled 解析enabled
 * @param param
 * @returns {*}
 * @private
 */
function _enabled(param){
  enabled.map((item) => {
    for(let k in item){
      console.log(k)
      if(k == param){
        param = item[k];
      }
    }
  });
  return param;
}

/**
 * _assigned 解析assigned
 * @param param
 * @returns {*}
 * @private
 */
function _assigned(param){
  assigned.map((item) => {
    for(let k in item){
      console.log(k)
      if(k == param){
        param = item[k];
      }
    }
  });
  return param;
}

export default {
  processdata,
  unprocessdata,
  getpremission,
  setKey,
  formatMoney,
  parsepremission,
  unique,
  unempty,
  replaceEmptyItem,
  getbadlevel,
  _enabled,
}
