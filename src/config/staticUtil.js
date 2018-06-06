import { Select } from 'antd';
const Option = Select.Option;
import { time_format, date_format } from "./constants";
import moment from "moment";
import jsSHA256 from '../utils/jssha';

//hash number
export function HashNumber(str) {
	let _str = jsSHA256(str).replace(/[a-zA-Z]/g, "");
	let a = ~~(parseInt(_str.substr(0, 3)) / 1000 * 255);
	let b = ~~(parseInt(_str.substr(3, 3)) / 1000 * 255);
	let c = ~~(parseInt(_str.substr(6, 3)) / 1000 * 255);
	return `rgb(${a},${b},${c})`
}

// reverse hash number
export function reverseHashNumber(str) {
	let _str = jsSHA256(str).replace(/[a-zA-Z]/g, "");
	let a = ~~(255 - parseInt(str.substr(0, 3)) / 1000 * 255);
	let b = ~~(255 - parseInt(str.substr(3, 3)) / 1000 * 255);
	let c = ~~(255 - parseInt(str.substr(6, 3)) / 1000 * 255);
	return `rgb(${a},${b},${c})`
}

export function Iterator(obj) {
	let len = 0;
	let next = function() {
		len = len + 1;
	};
	let isDone = function() {
		return len >= obj.length;
	};
	let getCurrentItem = function() {
		return obj[len];
	};
	return {
		next: next,
		isDone: isDone,
		getCurrentItem: getCurrentItem
	}
}

//乘积
export function product(arr, parma) {
	let lastArr = [],
		_arr = [],
		obj = {};
	for(let i = 0, len = arr.length; i < len; i++) {
		_arr.push(arr[i]["l"]); // ["xb","xb","xb","asda","asda","asda","asda","asda"]
	}
	for(let j = 0, len1 = _arr.length; j < len1; j++) {
		if(_arr[j] in obj) {
			obj[_arr[j]] += 1;
		} else {
			obj[_arr[j]] = 1;
		}
	}; // {"xb":3,"asda":5}
	for(let k in obj) {
		let _obj = {},
			name = "";
		for(let b = 0, len3 = arr.length; b < len3; b++) {
			if(arr[b].l === k) {
				name = arr[b]["n"];
			}
		}
		_obj["name"] = name;
		_obj["code"] = k;
		_obj["id"] = k;
		_obj["selected"] = false;
		_obj["count1"] = obj[k];
		lastArr.push(_obj); // [{"name":"雪碧","code":"xb","count1":3,"selected":false},{"name":"果粒橙","code":"asda","count1":5,"selected":false}]
	}
	return lastArr;
}

//解析本地时间为UTC时间
export function UTCTime(str) {
	return moment(str).utc().format(time_format);
}

//解析本地日期为UTC日期
export function UTCDate(str) {
	return moment(UTCTime(str)).format(date_format);
}

//解析UTC时间为本地时间
export function ParseTime(str) {
	return moment.utc(str).local().format(time_format);
}

//解析UTC日期为本地日期
export function ParseDate(str) {
	return moment(ParseTime(str)).format(date_format);
}

//根据对象获取key value映射为Option
export const getOptionByObj = (obj) => {
	let options = [];
	for(let key in obj) {
		options.unshift(<Option key={key} value={key}>{obj[key]}</Option>)
	}
	return options
}

// 未收款信息notification
export const is_recivenotification = (obj) => {
	let _obj = Object.assign({
		icon: require('../assets/img/ReceiveInfo.png'),
		title: "待收款",
		dir: "auto"
	}, {
		tag: obj,
		body: `订单号:${obj}未收款,点击查看详情!`
	});
	return _obj
}

//支付类型
export const pay_type = {
	0: '支付宝',
	1: '微信',
	2: '中国银行',
	3: '中国农业银行',
	4: '中国工商银行',
	5: '中国建设银行',
	6: '交通银行',
	7: '中信银行',
	8: '平安银行',
	9: '中国光大银行',
	10: '广发银行',
	11: '恒丰银行',
	12: '渤海银行',
	13: '兴业银行',
	14: '浙商银行',
	15: '招商银行',
	16: '上海浦东发展银行',
	17: '中国民生银行',
	18: '华夏银行'
}

//权限列表
export const getPermissionName = {
	c: '新增',
	r: '详情',
	u: '编辑',
	d: '删除',
	i: '导入',
	e: '导出',
	a: '分配',
	v: '审核',
	n: '启用禁用',
	t: '收款',
	l: '处理',
	w: '提现',
	p: '升级',
	b: '绑定解绑',
	m: '执行命令',
	s: '列表',
}

//是否使用
export const getHasUsedByNum = {
	'': '所有使用状态',
	0: '未使用',
	1: '已使用'
}

//是否启用
export const getHasEnableByNum = {
	'': '所有启用状态',
	0: '已禁用',
	1: '已启用'
}

//是否支持视觉
export const getHasSupportViByNum = {
	'': '所有支持视觉情况',
	0: '不支持视觉',
	1: '支持视觉'
}

//是否申请
export const getHasApplyByNum = {
	'': '所有申请状态',
	0: '已申请',
	1: '已驳回',
	2: '已通过',
	3: '待支付',
	4: '已支付',	
}

//是否超管
export const isRoot = {
	0: '否',
	1: '是'
}

//信用是否合乎要求
export const userCredited = {
	0: '否',
	1: '是'
}

//不良信用等级
export const badLevel = {
	"": "所用不良信用等级",
	"-1": "无法评估该用户逾期状况",
	0: '未命中逾期名单',
	1: '命中一类名单',
	2: "命中二类名单",
	3: "命中三类名单",
}

//启禁用
export const isEnabled = {
	0: '禁用',
	1: '启用'
}

//是否分配
export const isAssigned = {
	"": "所有分配状态",
	0: '未分配',
	1: '已分配'
}

//是否绑定
export const isBinded = {
	"": "所有绑定状态",
	0: '未绑定',
	1: '已绑定',
}

//职员类型
export const getStaffMemberTypeByNumber = {
	0: '默认',
	1: '点位合伙人',
	2: '配送人员'
}

export const getWhetherByNum = {
	0: '否',
	1: '是'
}

//合同类型
export const getContractTypeByNum = {
	0: '全款合同',
	1: '分期合同'
}

//操作人员类型
export const operateType = {
	0: '用户',
	1: '工作人员',
	2: '管理人员'
}

//是否审核
export const getHasVerifiedByNum = {
	'': '所有审核状态',
	0: '未审核',
	1: '已审核'
}

//标签状态
export const getEpcsByNum = {
	'': '所有标签状态',
	0: '待入库',
	1: '已入库',
	2: '已出库',
	3: '已售'
}

//商品状态
export const getGoodStatusByNum = {
	'': '所有商品状态',
	0: '已入库',
	1: '已出库',
	2: '已售',
}

//退款原因
export const refundsReason = {
	'': '所有退款原因',
	0: '误扣',
	1: '过期',
	1000: '其它',
}

//退款状态
export const refundsStatus = {
	'': '所有退款状态',
	0: '退款中',
	1: '退款成功',
	2: '退款关闭',
}

//用户类型
export const userType = {
	'': '所有用户类型',
	0: '轻购云',
	1: '支付宝',
	2: '微信',
}

//用户性别
export const userSex = {
	0: '保密',
	1: '男',
	2: '女',
}

//通过数字获取周几
export const getWeekByNum = {
	1: '一',
	2: '二',
	3: '三',
	4: '四',
	5: '五',
	6: '六',
	7: '日',
}

//提现状态
export const getWithdrawalssStatus = {
	'': '所有提现状态',
	0: '待处理',
	1: '待提现',
	2: '已提现',
	3: '已撤消'
}

//订单状态
export const getOrderStatus = {
	'': '所有订单状态',
	0: '待付款',
	1: '交易成功',
	2: '交易关闭',
}

//收款状态
export const getReceivablesStatus = {
	0: '待处理',
	1: '已收款',
	2: '已撤消',
}

//入库状态
export const warehouseStatus = {
	0: '正确',
	1: '少出',
	2: '多出',
	3: '异常',
}

//是否处理
export const hasDealed = {
	'': '所有处理状态',
	0: '未处理',
	1: '已处理',
}

//门指标
export const door1Index = {
	'': '所有门指标',
	0: '门异常',
	1: '门开',
	2: '门关',
}

//锁指标
export const lock1Index = {
	'': '所有锁指标',
	0: '锁异常',
	1: '锁开',
	2: '锁关',
}

//异常级别
export const getExceptionLevel = {
	'': '所有异常级别',
	0: '默认',
	1: '一级',
	2: '二级',
	3: '三级',
}

//异常类型
export const getExceptionType = {
	'': '所有异常类型',
	0: '门异常',
	1: '锁异常',
	2: 'RFID工作异常',
	3: '摄像头异常',
	4: 'Anroid板异常',
	5: 'MCU运行异常',
	6: '网络差',
	7: '读写器温度低异常',
	8: '读写器温度高异常',
}

//发布状态
export const hasPublish = {
	'': '所有发布状态',
	0: '未发布',
	1: '发布中',
	2: '已发布',
}

//广告类型
export const adssType = {
	'': '所有广告类型',
	0: '图集',
	1: '视频',
}

//广告目标类型
export const adssTargetType = {
	0: '售货柜',
	1: '片区',
	2: '经销商售货柜'
}

//升级状态
export const appUpdateStatus = {
	'': '所有升级状态',
	0: '待升级',
	1: '升级中',
	2: '已升级'
}

//金额转换
export function formatMoney(num) {
	num = num.toFixed(2);
	num = parseFloat(num)
	num = num.toLocaleString();
	return num;
}

//是否有摄像头
export const is_has_camera = {
	1: "是",
	0: "否",
}

//是否有机器视觉
export const is_has_vi = {
	1: "是",
	0: "否",
}

//RFID 频制
export const is_frequency = {
	0: "无",
	1: "安的高频-38400",
	2: "罗丹贝尔超高频-115200",
}

//柜子品牌
export const is_cupboard_model = {
	0: "百利",
	1: "星星",
	2: "美菱",
}

//mcu 型号
export const is_mcu_model = {
	0: "无",
	1: "mini",
	2: "full",
	3: "premium",
}

//安卓型号
export const is_android_model = {
	0: "无",
	1: "IoT-3288A",
}

// android_sdk 安卓SDK版本号
export const is_android_sdk = {
	22: "5.1.1",
}

// 盘存状态
export const inventory_status = {
	"": "所有盘存状态",
	0: "待操作",
	1: "盘存成功",
	2: "盘存失败",
}

// 网络质量指标
export const is_nquality = (nquality) => {
	if(isNaN(Number(nquality))) {
		return "数据异常";
	} else {
		if(nquality < 0) {
			return "未知";
		} else if(nquality >= 0 && nquality <= 150) {
			return "差";
		} else if(nquality > 150 && nquality <= 550) {
			return "一般";
		} else if(nquality > 550 && nquality <= 2000) {
			return "好";
		} else if(nquality > 2000) {
			return "非常好";
		}
	}
}

// 网络类型指标
export const is_ntype = (ntype) => {
	let res;
	switch(ntype) {
		case 0:
			res = "移动网络";
			break;
		case 1:
			res = "WIFI";
			break;
		case 9:
			res = "有线网络";
			break;
		default:
			res = "未知";
	}
	return res
}

// 移动网络类型指标
export const is_ptype = {
	0: "未知",
	1: "NETWORK_TYPE_GPRS",
	2: "NETWORK_TYPE_EDGE",
	3: "NETWORK_TYPE_UMTS",
	4: "NETWORK_TYPE_CDMA",
	5: "NETWORK_TYPE_EVDO_0",
	6: "NETWORK_TYPE_EVDO_A",
	7: "NETWORK_TYPE_1xRTT",
	8: "NETWORK_TYPE_HSDPA",
	9: "NETWORK_TYPE_HSUPA",
	10: "NETWORK_TYPE_HSPA",
	11: "NETWORK_TYPE_IDEN",
	12: "NETWORK_TYPE_EVDO_B",
	13: "NETWORK_TYPE_LTE",
	14: "NETWORK_TYPE_EHRPD",
	15: "NETWORK_TYPE_HSPAP",
}

// 读写器温度
export const is_rtemp = (rtemp) => {
	if(isNaN(Number(rtemp))) {
		return "数据异常";
	} else {
		if(rtemp < 0) {
			return "低温异常";
		} else if(rtemp >= 0 && rtemp <= 40) {
			return "正常";
		} else if(rtemp > 40) {
			return "高温异常";
		}
	}
}

// 所有操作类型状态
export const is_action_type = {
	"": "所有操作类型状态",
	0: "PING",
	1: "改变售货柜编码",
	2: "切换环境",
	3: "执行命令",
	4: "获取畸变参数",
}

// 所有操作状态
export const is_action = {
	"": "所有操作类型状态",
	0: "操作中",
	1: "操作完成",
};

// 网络状态
export const is_run = {
	"": '所有运行状态',
	0: '未运行',
	1: '离线',
	2: '在线',
};

//智能解决方案
export const is_ig_type = {
	"": "所有智能方案",
	0: "RFID",
	1: "视觉",
}

//盘存类型
export const inventory_type = {
	0: "/VmInventorysInstock",
	1: "/VmInventorysOutstock",
}