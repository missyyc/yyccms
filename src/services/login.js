import request from '../utils/request';
import { PAGESIZE } from '../config/constants';
import USERMODELURL from '../config/service_config';
import { getArrByObj } from '../utils/utils'

console.log(USERMODELURL);
//登录
export async function login({username,password}) {
  console.log(username,password);
  return request(`${USERMODELURL}/auth`,{type:'POST', body:{username,password}});
}

//退出登录
export async function serviceLoyout(){
  return request(`${USERMODELURL}/managers/logout/v1`);
}

