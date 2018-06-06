import {routerRedux} from 'dva/router';
import {getUserInfo, getCurrentModalPermissionList} from "../utils/utils";
import {
  list,
  add,
  model_detail,
  del,
  edit,
  enable,
} from "../services/Audio";
import {message} from "antd";
import {PAGESIZE} from "../config/constants";
import {getpremission, setKey, parsepremission, unprocessdata} from "../config/filter";
//用户
export default {
  namespace: 'Audio',
  state: {
    addvisible: false,
    detailvisible: false,
    powervisible: false,
    assignvisible: false,
    page: 1,
    pageSize: 10,
    enabled: '',
    code: '',
    assigned: '',
    dbr_id: '',
  },
  reducers: {
    //更新state
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      }
    },
  },
  effects: {
    //售货柜型号 启禁用接口
    * enable({payload: values}, {call, put}) {
      let {enabled, id} = values;
      const data = yield call(enable, {enabled: (enabled ? 0 : 1)}, id);
      if (data.success) {
        message.success(`${enabled ? "禁用成功" : "启用成功"}`);
        yield put({type: 'list'});
      } else {
        message.error(`${enabled ? "禁用失败" : "启用失败"}`);
      }
    },
    //售货柜型号 详情接口
    * detail({payload: values}, {call, put}) {
      const {id} = values;
      const data = yield call(model_detail, id);
      if (data.success) {
        let detailinfo = data.data;
        detailinfo.image_urls = JSON.parse(detailinfo.image_urls);
        yield put({type: 'updateState', detailinfo: data.data});
      }
    },
    //售货柜型号 编辑接口
    * edit({values, id}, {call, put}) {
      const {name, image_urls, has_camera, has_vi, frequency, cupboard_model, android_model, android_sdk, volume1, desc1, app_version} = values;
      const data = yield call(edit, {
        name: name,
        image_urls: image_urls,
        has_camera: has_camera,
        has_vi: has_vi,
        frequency: frequency,
        cupboard_model: cupboard_model,
        android_model: android_model,
        android_sdk: android_sdk,
        volume1: volume1,
        desc1: desc1,
        app_version: app_version,
      }, id);
      if (data.success) {
        message.success('编辑成功');
        yield put({type: 'list'});
      } else {
        message.success('编辑失败');
      }
    },
    //售货柜型号 新增接口
    * add({payload: values}, {call, put}) {
      const {name, image_urls, has_camera, has_vi, frequency, cupboard_model, android_model, android_sdk, volume1, desc1, app_version} = values;
      const data = yield call(add, {
        name: name,
        image_urls: image_urls,
        has_camera: has_camera,
        has_vi: has_vi,
        frequency: frequency,
        cupboard_model: cupboard_model,
        android_model: android_model,
        android_sdk: android_sdk,
        volume1: volume1,
        desc1: desc1,
        app_version: app_version,
      });
      if (data.success) {
        message.success("新增成功");
        yield put({type: 'updateState', page: 1});
        yield put({type: 'list'});
      } else {
        message.success('新增失败');
      }
    },
    //售货柜型号 删除接口
    * del({payload: values}, {call, put}) {
      const {id} = values;
      const data = yield call(del, {id});
      if (data.success) {
        message.success("删除成功");
        yield put({type: 'list'});
      } else {
        message.success("删除失败");
      }
    },
    //售货柜型号 列表接口
    * list(values, {call, put, select}) {
      const {page} = yield select(state => state.Audio);
      const {pageSize} = yield select(state => state.Audio);
      const data = yield call(list, {
        page: page,
        rows: pageSize
      });
      if (data.success) {
        const datainfo = data.data.results;
        yield put({type: 'updateState', datainfo: datainfo, total: data.data.results.length});
      }
    },
    //售货柜型号 重置接口
    * reset(action, {put}) {
      yield put({
        type: 'updateState',
        page: 1,
        enabled: '',
        code: '',
        assigned: '',
        dbr_id: '',
      });
    },
    //售货柜型号 重置所有接口
    * resetAll(action, {put}) {
      yield put({
        type: 'updateState',
        addvisible: false,
        detailvisible: false,
        powervisible: false,
        assignvisible: false,
        page: 1,
        pageSize: PAGESIZE,
        enabled: '',
        code: '',
        assigned: '',
        dbr_id: '',
      });
    },
    //重新加载整个页面
    * reload(payload,{put,select}) {
      const {refresh} = yield select(state => state.app);
      if(refresh) {
        yield put({type: 'resetAll'});
      }
      yield put({type: 'list'});
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname == '/Audio') {
          dispatch({type: 'reload'});
        }
      });
    }
  },
};
