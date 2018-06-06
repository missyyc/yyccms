import request from '../utils/request';
import { PAGESIZE } from '../config/constants';
import USERMODELURL from '../config/service_config';
import { getArrByObj } from '../utils/utils';
import {parsepremission} from '../config/filter';


//登录
export async function list({page=1,dbr_id='',rows=10,type1="",nickname="",phone="",user_id=""}) {
  let obj = {
    dbr_id:dbr_id,
    page:page,
    rows:rows,
    type1:type1,
    nickname:nickname,
    phone:phone,
    user_id:user_id,
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  let url = `${USERMODELURL}/users/v1?${arr.join("&")}`;
  return request(`${url}`,{type:'GET'});
}

//  添加接口
export async function add(values) {
  return request(`${USERMODELURL}/users/v1`,{type:'POST',body:values});
}

export async function detail(id) {
  return request(`${USERMODELURL}/users/${id}/v1`,{type:'GET'});
}


//  删除接口
export async function del({id}) {
  return request(`${USERMODELURL}/users/${id}/delete/v1`,{type:'PUT'});
}


//  权限接口
export async function power() {
  return request(`${USERMODELURL}/rbac_powers/v1`,{type:'GET'});
}

// updatepower

//  权限接口
export async function updatepower(power,id) {
  return request(`${USERMODELURL}/users/${id}/powers/v1`,{type:'PUT',body:power});
}
// edit
//  删除接口
export async function edit(edit_value,id) {
  return request(`${USERMODELURL}/users/${id}/v1`,{type:'PUT',body:edit_value});
}

export async function distributorlist({page=1,name='',verified='',rows=10}) {
  let obj = {
    name:name,
    page:page,
    verified:verified,
    rows:rows,
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  let url = `${USERMODELURL}/distributors/choose/v1?${arr.join("&")}`;
  return request(`${url}`,{type:'GET'});
}

//选择用户
export function chooseUser({dbr_id,nickname,phone,page,rows}){
  const arr = getArrByObj({nickname,phone,page,rows,dbr_id});
  const url = `${USERMODELURL}/users/choose/v1?${arr.join("&")}`;
  return request(`${url}`,{type:'GET'});
}
