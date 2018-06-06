import {
  userPermission,
  userInfo,
  userToken,
  storageTimes,
  loginDate,
  storageWhenLong,
  userPower
} from '../config/constants';
import sha256 from './jssha';
import createLoading from 'dva-loading';
import {message} from 'antd';
import localforage from 'localforage';
import menuConfig from '../config/menu_config';
import _ from 'lodash';
import {HashNumber, reverseHashNumber, Iterator} from "../config/staticUtil";

export function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j].split("-")[1] > arr[j+1].split("-")[1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 根据path获取title
export function getTitleByPathname(pathname) {
  const navs = getNavsByPathname(pathname)

  if (navs.sub === pathname) {
    return navs.title
  } else {
    return navs.children.title
  }
}

export function getKeysByPathname(pathname) {
  const navs = getNavsByPathname(pathname)
  if (navs.sub === pathname) {
    return {
      selectedKeys: [navs.key]
    }
  } else {
    return {
      openKeys: [navs.key],
      selectedKeys: [navs.children.key]
    }
  }
}


//获取用户信息
export async function getUserInfo() {
  let user = await localforage.getItem(userInfo);
  if (user) {
    return JSON.parse(user);
  }
  return user;
}

//缓存用户信息
export async function setUserInfo({remember, data}) {
  if (remember) {//记住7天,使用localStorage缓存
    let user = await localforage.setItem(`${storageTimes}`, storageWhenLong.sevenDay);
  } else {
    await localforage.setItem(`${storageTimes}`, storageWhenLong.oneDay);
  }
  await localforage.setItem(`${loginDate}`, new Date().getTime());
  await localforage.setItem(`${userInfo}`, JSON.stringify(data));
}

//获取缓存时间
export async function getStorageTimes() {
  return await localforage.getItem(`${storageTimes}`);
}

//获取登录日期
export async function getLoginDate() {
  return await localforage.getItem(`${loginDate}`);
}

/**
 * 缓存token
 */
export async function setAuthToken(param) {
  await localforage.setItem(`${userToken}`, JSON.stringify(param));
}

export async function getAuthToken() {

  let authToken = await localforage.getItem(`${userToken}`);

  if (authToken) {
    return JSON.parse(authToken);
  }

  return authToken;
}


//显示loading
export function showLoading() {
  return message.loading('加载中。。。', 0);
}

export const messageInfo = (info) => {
  message.info(info);
};
export const messageErrorInfo = (info) => {
  message.error(info);
};

//由object组成的数组
export function getArrByObj(obj) {
  let arr = [];
  for (let i in obj) {
    if (obj[i]) {
      arr.push(`${i}=${obj[i]}`);
    }
  }
  return arr;
}


//获取导航菜单
export function getNavsByPathname(pathname) {
  for (let i = 0; i < menuConfig.length; i++) {
    if (menuConfig[i].sub === pathname) {
      return menuConfig[i];
    }
    if (menuConfig[i].children) {

      for (let j = 0; j < menuConfig[i].children.length; j++) {

        if (menuConfig[i].children[j].sub === pathname) {
          let obj = _.cloneDeep(menuConfig[i]);
          obj.children = _.cloneDeep(menuConfig[i].children[j]);
          return obj;
        }

      }

    }

  }
  return null

}

//获取导航菜单
export function getCurrentModalPermissionList(pathname, arr) {
  for (let i = 0; i < arr.length; i++) {

    if (arr[i].sub === pathname) {
      return arr[i];
    }

    if (arr[i].children) {

      for (let j = 0; j < arr[i].children.length; j++) {

        if (arr[i].children[j].sub === pathname) {
          let obj = _.cloneDeep(arr[i]);
          obj.children = _.cloneDeep(arr[i].children[j]);
          return obj;
        }

      }

    }

  }
  return null;
}


export async function timeListen(location, dispatch) {
  const {pathname} = location;
  let setIntervalT = setInterval(async () => {
    let storageTimes = await getStorageTimes();
    let loginDate = await getLoginDate();
    let currentTimes = new Date().getTime();
    if (loginDate) {
      if (currentTimes > storageTimes + loginDate) {
        localforage.clear();//清除缓存
        if (pathname != '/login') {
          dispatch(routerRedux.push('/login'))
        }
      }
    }

  }, 1000);
}



export function setCrumbs(location, dispatch) {
  const route_ = getNavsByPathname(location.pathname);
  let arr = [];
  if (route_) {//配置面包屑
    arr.push(route_.title);
    if (route_.children) {
      arr.push(route_.children.title);
      dispatch({type: 'updateState', openKeys: [route_.key], selectedKeys: [route_.children.key]});
    } else {
      dispatch({type: 'updateState', selectedKeys: [route_.key]});
    }
  }
  dispatch({type: 'updateState', navs: arr});
}

