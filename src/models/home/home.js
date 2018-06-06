import {routerRedux} from 'dva/router';
import {opt} from "../../services/home/home";
import {PAGESIZE} from "../../config/constants";

//用户
export default {
  namespace: 'home',
  state: {

  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      }
    },
  },
  effects: {
    * reload(payload,{put,call}) {
      yield put({type:"updateState",vi_urls:data});
    }
  },
  subscriptions: {
    setup({dispatch, history}) {

      history.listen(({pathname}) => {
        if (pathname == '/home') {
          // dispatch({type: 'reload'});


        }
      });
    },
  }
};
