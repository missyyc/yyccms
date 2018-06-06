import request from '../utils/request';
import USERMODELURL from '../config/service_config';
import { getArrByObj } from '../utils/utils';

//取七牛云上传token
export async function getQiniuyunToken({space='public',source,filename,filetype,category}){
  console.log(4);
    const arr = getArrByObj({space,source,filename,filetype,category});
    const url = `${USERMODELURL}/tokens/upload/v1?${arr.join("&")}`;
    return request(`${url}`,{type:'GET'});
}
