// 商品品牌详情接口
import request from "../../utils/request";
import USERMODELURL from "../../config/service_config";

export async function opt(url) {
  return request(`${url}`, {type: 'GET'});
}
