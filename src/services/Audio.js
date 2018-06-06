import request from '../utils/request';
import { PAGESIZE } from '../config/constants';
import USERMODELURL from '../config/service_config';
import { getArrByObj } from '../utils/utils';
import {parsepremission} from '../config/filter';

//音频列表接口
export async function list({page='',rows=''}) {
  let obj = {        
    page:page,
    rows:rows,        
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  let url = `${USERMODELURL}/audios/list`;
  return request(`${url}`,{type:'GET'});
}

//  添加接口
export async function add(values) {
  return request(`${USERMODELURL}/Audio/v1`,{type:'POST',body:values});
}

export async function model_detail(id) {
  return request(`${USERMODELURL}/Audio/${id}/v1`,{type:'GET'});
}


//  删除接口
export async function del({id}) {
  return request(`${USERMODELURL}/Audio/${id}/delete/v1`,{type:'PUT'});
}


//  权限接口
export async function power(id) {
  return request(`${USERMODELURL}/Audio/${id}/powers/v1`,{type:'GET'});
}

// updatepower

//  权限接口
export async function updatepower(power,id) {
  return request(`${USERMODELURL}/Audio/${id}/powers/v1`,{type:'PUT',body:power});
}
// edit
//  删除接口
export async function edit(edit_value,id) {
  return request(`${USERMODELURL}/Audio/${id}/v1`,{type:'PUT',body:edit_value});
}
//  禁用接口
export async function enable(enabled,id) {
  return request(`${USERMODELURL}/Audio/${id}/enable/v1`,{type:'PUT',body:enabled});
}

export async function manager_roles({id,content}) {
  return request(`${USERMODELURL}/Audio/${id}/roles/v1`,{type:'PUT',body:content});
}

export async function roleslist({page=1,name='',enabled='',rows=10}) {
  let obj = {
    enabled:enabled,
    name:name,
    page:page,
    rows:rows,
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  let url = `${USERMODELURL}/rbac_roles/v1?${arr.join("&")}`;
  return request(`${url}`,{type:'GET'});
}

/**
 * 经销商列表接口
 * @param page 页码
 * @param name 经销商名称
 * @param verified 审核值
 */
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

//  详情接口
export async function detailaccount(id) {
  return request(`${USERMODELURL}/distributors/${id}/v1`,{type:'GET'});
}

export async function assign(values) {
  console.log(values);

  return request(`${USERMODELURL}/Audio/assign/v1`,{type:'PUT',body:values});
}

export async function contractslistaccount({page=1,id="",contract_number="",rows=10}) {

  let obj = {
    page:page,
    contract_number:contract_number,
    rows:rows,
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  console.log(arr);
  let url = `${USERMODELURL}/distributors/${id}/contracts/choose/v1?${arr.join("&")}`;
  return request(`${url}`,{type:'GET'});
}

//选择售货柜列表
export function chooseAudioList({dbr_id,area_id,vm_code,name,page,rows}){
  const arr = getArrByObj({dbr_id,area_id,vm_code,name,page,rows});
  const url = `${USERMODELURL}/distributors/Audio/choose/v1?${arr.join("&")}`;
  return request(`${url}`,{type:'GET'});
}
