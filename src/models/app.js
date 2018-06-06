import { mainLogo, mainLogoSub, socketUrl } from '../config/config';
import {
	getUserInfo,
	getAuthToken,
	getPermission,
	notifyMe,
	getNavsByPathname,
	timeListen,
	allocationPermissions,
	permissionsIntercept,
	setCrumbs,
	isEqual
} from '../utils/utils';
import { routerRedux } from 'dva/router';
import { serviceLoyout } from '../services/login';
import localforage from 'localforage';
import menuConfig from '../config/menu_config';
import { MODEL } from "../config/service_config";
import { is_recivenotification, HashNumber, inventory_type } from "../config/staticUtil";
import { message } from "antd";
import { getTitleByPathname } from '../utils/utils';

export default {
	namespace: 'app',
	state: {
		subMenu: '',
		showMenu: true,
		logoImage: mainLogo,
		logoBg: 'logo',
		personInfoVisible: false,
		navTabs: [], // 导航页面 ['/home', '/area']
		username: '', //登录用户名
		location: '',
		defaultOpenKeys: [],
		defaultSelectedKeys: [],
		permissionsList: [], //权限列表
		isRoot: false,
		refresh: true,
		currentTab: '',
	},
	reducers: {
		handleVisibleChange(state, {
			visible
		}) {
			return {
				...state,
				personInfoVisible: visible
			}
		},
		//获取用户名
		getUserInfo(state, {
			username
		}) {
			return {
				...state,
				username
			}
		},
		//显示隐藏菜单
		toggleMenu(state, {
			showMenu
		}) {
			return {
				...state,
				showMenu,
				logoImage: showMenu ? mainLogo : mainLogoSub,
				logoBg: showMenu ? 'logo' : 'logo1'
			}
		},
		//显示隐藏个人设置
		personInfoVisible(state, {
			personInfoVisible
		}) {
			return {
				...state,
				personInfoVisible
			}
		},
		//更新state
		updateState(state, payload) {
			return {
				...state,
				...payload
			}
		},
		addNavTab(state, {
			pathname
		}) {
			if (state.navTabs.includes(pathname)) {
				return state;
			} else {
				return {
					...state,
					navTabs: [pathname, ...state.navTabs]
				}
			}
		},
		deleteTab(state, {
			tab
		}) {
			let oldNavTabs = _.cloneDeep(state.navTabs);
			return {
				...state,
				navTabs: oldNavTabs.filter((nav) => nav != tab)
			}
		},
		// 将点击的tab移动到第一个
		setTabFirst(state, {
			tab
		}) {
			const {
				navTabs
			} = state;
			const oldNavTabs = _.cloneDeep(navTabs);
			const index = oldNavTabs.indexOf(tab);
			oldNavTabs.splice(index, 1);
			oldNavTabs.unshift(tab);
			return {
				...state,
				navTabs: oldNavTabs
			}
		}
	},
	effects: {
		* removeTab({ tab }, { put, select }) {
			const { navTabs, currentTab } = yield select(state => state.app);
			const index = navTabs.indexOf(tab);
			yield put({ type: 'deleteTab', tab });
			if (navTabs[index] == currentTab) { // 如果关闭的是当前打开的标签页， 则要跳转
				let nextIndex; // 关闭标签后应该跳到哪
				if (index > 0) { // 前面有跳到前面一个
					nextIndex = index - 1;
					yield put(routerRedux.push({
						pathname: navTabs[nextIndex],
						state: {
							fromTab: true
						}
					}));
				} else {
					if (index < navTabs.length - 1) { // 前面没有 后面有跳到后面一个
						nextIndex = index + 1;
						yield put(routerRedux.push({
							pathname: navTabs[nextIndex],
							state: {
								fromTab: true
							}
						}));
					} else {
						yield put(routerRedux.push('/home'));
					}
				}
			}
		},
		* subMenu({ detail }, { call, put, select }) {
			const {
				location
			} = yield select(state => state.app);
			yield put(routerRedux.push(detail.subMenu));
		},
		//退出登录
		* loyout({ visible }, { call, put }) {
			yield put({
				type: 'personInfoVisible',
				visible
			});
			yield call(serviceLoyout);
			localforage.clear()
			yield put(routerRedux.push('/login'));
			window.location.reload();
		},
		//设置面包屑
		* setBreadcrumb({
			location
		}, {
			call,
			put,
			select
		}) {
			let {
				navs
			} = yield select(state => state.app);
			let _route = getNavsByPathname(location.pathname);
			if (navs && _route) {
				let isTrue = false;
				navs.map((item, index) => {
					for (let k in item) {
						if (k === location.pathname) {
							isTrue = true;
						}
					}
				});
				if (!isTrue) {
					if (_route.children) {
						navs.push({
							[location.pathname]: _route.children.title
						});
					} else {
						navs.push({
							[location.pathname]: _route.title
						});
					}
				}
			}
			yield put({
				type: 'updateState',
				navs
			});
		},
		* updateBreadcrumb({
			navs,
			index
		}, {
			put
		}) {
			if (navs.length) {
				let navsLast = navs[index - 1];
				for (let a in navsLast) {
					yield put({
						type: 'updateState',
						navs
					});
					yield put(routerRedux.push(a));
				}
			} else {
				yield put(routerRedux.push('/home'));
			}
		}

	},
	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			try {
				history.listen(async (location) => {
					//设置面包屑

					const {
						pathname
					} = location;
					//获取用户信息
					let user = await getUserInfo().catch(function (e) {
						console.log(e);
					});
					dispatch({
						type: 'updateState',
						permissionsList: menuConfig,
					});

					//获取token信息
					let token = await getAuthToken().catch(function (e) {
						console.log(e);
					});
					// 如果清除了缓存，不存在user信息，就跳转到login页面

					//更新当前的路径
					dispatch({
						type: 'updateState',
						currentTab: pathname
					});
					if (getTitleByPathname(pathname)) {
						dispatch({
							type: 'addNavTab',
							pathname
						});
					}
				});
			} catch (err) {
				console.log(err);
			}
		}
	},
};