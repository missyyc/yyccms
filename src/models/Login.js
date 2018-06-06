import {login} from '../services/login';
import {routerRedux} from 'dva/router';
import {setUserInfo, sha256Obj, setAuthToken, setPower} from "../utils/utils";
import jsSHA256 from '../utils/jssha';
import _ from 'lodash';
import {message} from 'antd';
//用户
export default {
  namespace: 'users',
  state: {
    errorInfo: ''
  },
  reducers: {
    updateErrorInfo(state, {errorInfo}) {
      return {
        ...state,
        errorInfo
      }
    }
  },
  effects: {
    * login({payload}, {call, put}) {
      let {username, password} = payload;
      const data = yield call(login, {username, password});
      if (!data.success) {
        yield put({type: 'updateErrorInfo', errorInfo: data.msg});
        message.success('登录失败');
      } else {
        yield put(routerRedux.push('/home'));//后台主页默认打开主页
        message.success("登录成功");
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname == '/login') {
          
        }

      })

    }
  },
};
