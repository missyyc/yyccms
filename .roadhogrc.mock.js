import moment from 'moment';

export default {
	'GET /goods_refunds/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.push({
				id: i,
				user_id: i,
				user_id_nickname: `三生镜${i}`,
				user_id_type1: '0',
				price: i,
				status1: 0,
				reason: 0,
				order_number: `00${parseInt(Math.random() * 10)}`,
				goods_id: '1',
				goods_code: '001',
				goods_id_name: `脉动${i}`,
				create_time: '2017-09-09'
			})
		}
		res.send({
			code: 0,
			data: {
				total: 30,
				rows: rows
			}
		})
	},
	'GET /goods_refund_msgs/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.push({
				id: i,
				action_id: i,
				action_id_name: `三生镜${i}`,
				action_type1: i,
				type1: i % 2 == 0 ? 1 : 0,
				content: `聊天内容${i}`,
				create_time: `2017-12-09`
			})
		}
		res.send({
			code: 0,
			data: {
				total: 30,
				rows: rows
			}
		})
	},
	'POST /goods_refund_msgs/v1': (req, res) => {
		res.send({
			code: 0,
			data: null
		})
	},
	'PUT /goods_refunds/:id/refund/v1': (req, res) => { //退款
		res.send({
			code: 0,
			data: null
		})
	},
	//营业统计
	'GET /sales/today/v1': (req, res) => { //今日营业额
		res.send({
			code: 0,
			data: {
				today: {
					success_price: parseInt(Math.random() * 10000),
					refund_price: parseInt(Math.random() * 100),
					success_total1: parseInt(Math.random() * 100),
					refund_total1: parseInt(Math.random() * 10),
				},
				yestoday: {
					success_price: parseInt(Math.random() * 10000),
					refund_price: parseInt(Math.random() * 100),
					success_total1: parseInt(Math.random() * 100),
					refund_total1: parseInt(Math.random() * 10),
				}
			}
		})
	},
	'GET /sales/trends/today/v1': (req, res) => { //今日营业趋势
		let todays = [],
			yestodays = [];
		for(let i = 0; i < 24; i++) {
			todays.push({
				stat_time: i,
				success_price: parseInt(Math.random() * 1000),
				success_total1: parseInt(Math.random() * 100)
			});
			yestodays.push({
				stat_time: i,
				success_price: parseInt(Math.random() * 1000),
				success_total1: parseInt(Math.random() * 100)
			})
		}
		res.send({
			code: 0,
			data: {
				today: todays,
				yestoday: yestodays
			}
		})
	},

	'GET /sales/tswk/v1': (req, res) => { //本周营业额
		res.send({
			code: 0,
			data: {
				today: {
					success_price: parseInt(Math.random() * 10000),
					refund_price: parseInt(Math.random() * 100),
					success_total1: parseInt(Math.random() * 100),
					refund_total1: parseInt(Math.random() * 10),
				},
				yestoday: {
					success_price: parseInt(Math.random() * 10000),
					refund_price: parseInt(Math.random() * 100),
					success_total1: parseInt(Math.random() * 100),
					refund_total1: parseInt(Math.random() * 10),
				}
			}
		})
	},
	'GET /sales/trends/tswk/v1': (req, res) => { //本周营业趋势
		let todays = [],
			yestodays = [];
		for(let i = 0; i < 7; i++) {
			todays.push({
				stat_time: i,
				success_price: parseInt(Math.random() * 1000),
				success_total1: parseInt(Math.random() * 100)
			});
			yestodays.push({
				stat_time: i,
				success_price: parseInt(Math.random() * 1000),
				success_total1: parseInt(Math.random() * 100)
			})
		}
		res.send({
			code: 0,
			data: {
				today: todays,
				yestoday: yestodays
			}
		})
	},

	'GET /sales/month/v1': (req, res) => { //本月营业额
		res.send({
			code: 0,
			data: {
				today: {
					success_price: parseInt(Math.random() * 10000),
					refund_price: parseInt(Math.random() * 100),
					success_total1: parseInt(Math.random() * 100),
					refund_total1: parseInt(Math.random() * 10),
				},
				yestoday: {
					success_price: parseInt(Math.random() * 10000),
					refund_price: parseInt(Math.random() * 100),
					success_total1: parseInt(Math.random() * 100),
					refund_total1: parseInt(Math.random() * 10),
				}
			}
		})
	},
	'GET /sales/trends/month/v1': (req, res) => { //本月营业趋势
		let todays = [],
			yestodays = [];
		for(let i = 0; i < 30; i++) {
			todays.push({
				stat_time: i,
				success_price: parseInt(Math.random() * 1000),
				success_total1: parseInt(Math.random() * 100)
			});
			yestodays.push({
				stat_time: i,
				success_price: parseInt(Math.random() * 1000),
				success_total1: parseInt(Math.random() * 100)
			})
		}
		res.send({
			code: 0,
			data: {
				today: todays,
				yestoday: yestodays
			}
		})
	},
	'GET /orders/v1': (req, res) => { //交易汇总
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				order_number: `123456${i}`,
				status1: parseInt(Math.random() * 2),
				price: parseInt(Math.random() * 1000),
				total1: parseInt(Math.random() * 100),
				species: `种类${i}`,
				ig_type: 1,
				area_id: parseInt(Math.random() * 100),
				area_id_name: `区域名${parseInt(Math.random() * 200)}`,
				dbr_vm_id: parseInt(Math.random() * 200),
				dbr_vm_id_name: `点位名称${parseInt(Math.random() * 200)}`,
				user_id: parseInt(Math.random() * 200),
				user_id_name: `用户昵称${parseInt(Math.random() * 200)}`,
				create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},

	'GET /orders/:id/v1': (req, res) => { //交易汇总详情
		let rows = [];
		for(let i = 0; i < 5; i++) {
			rows.unshift({
				name: `产品名称${i}`,
				price: parseInt(Math.random() * 200),
				image_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3244157066,3674467728&fm=27&gp=0.jpg',
				status1: parseInt(Math.random() * 2)
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},

	'GET /orders/:id/vi/receive/info/v1': (req, res) => { //交易汇总详情
		res.send({
			code: 0,
			data: {
				vi_urls: "[\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121540947-4_1.jpg\",\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121541037-2_1.jpg\",\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121546336-3_1.jpg\",\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121540973-1_1.jpg\"]",
				stock: [{
						id: 1,
						name: `商品1`,
						count1: 10
					},
					{
						id: 2,
						name: `商品2`,
						count1: 10
					},
					{
						id: 3,
						name: `商品3`,
						count1: 10
					},
					{
						id: 4,
						name: `商品4`,
						count1: 10
					},
				],
				raw: {
					"1_1": [{
							"br": {
								"x": 90,
								"y": 90
							},
							"tl": {
								"x": 80,
								"y": 80
							},
							"l": "xb",
							"c": 0.8,
							"n": "果粒橙",
						},
						{
							"br": {
								"x": 75,
								"y": 75
							},
							"tl": {
								"x": 50,
								"y": 50
							},
							"l": "asda",
							"c": 0.8,
							"n": "果粒橙",
						},

					],
					"2_1": [{
							"br": {
								"x": 0,
								"y": 0
							},
							"tl": {
								"x": 75,
								"y": 75
							},
							"l": "glc",
							"c": 0.65,
							"n": "果粒橙",
						},

					],
					"1_2": [{
							"br": {
								"x": 50,
								"y": 50
							},
							"tl": {
								"x": 0,
								"y": 0
							},
							"l": "xb",
							"c": 0.8,
							"n": "雪碧",
						},
						{
							"br": {
								"x": 75,
								"y": 75
							},
							"tl": {
								"x": 50,
								"y": 50
							},
							"l": "asda",
							"c": 0.8,
							"n": "果粒橙",
						},

					],
					"2_2": [{
							"br": {
								"x": 0,
								"y": 0
							},
							"tl": {
								"x": 150,
								"y": 150
							},
							"l": "glc",
							"c": 0.65,
							"n": "果粒橙",
						},

					],

				}
			}
		})
	},

	'GET /orders/:id/goods/v1': (req, res) => { //交易汇总详情
		let rows = [];
		for(let i = 0; i < 10; i++) {
			rows.unshift({
				id: i,
				name: `商品${i}`,
				count1: i,
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 10
			}
		})
	},

	'GET /vm_inventorys/instock/:id/vi/verify/info/v1': (req, res) => { //商品入库审核详情
		res.send({
			code: 0,
			data: {
				vi_urls: "[\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121540947-4_1.jpg\",\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121541037-2_1.jpg\",\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121546336-3_1.jpg\",\"https://static.hgobox.com/vi/HG00014/file/2018/05/11/20180511121540973-1_1.jpg\"]",
				raw: {
					"1_1": [{
							"br": {
								"x": 90,
								"y": 90
							},
							"tl": {
								"x": 80,
								"y": 80
							},
							"l": "xb",
							"c": 0.8,
							"n": "果粒橙",
						},
						{
							"br": {
								"x": 75,
								"y": 75
							},
							"tl": {
								"x": 50,
								"y": 50
							},
							"l": "asda",
							"c": 0.8,
							"n": "果粒橙",
						},

					],
					"2_1": [{
							"br": {
								"x": 0,
								"y": 0
							},
							"tl": {
								"x": 75,
								"y": 75
							},
							"l": "glc",
							"c": 0.65,
							"n": "果粒橙",
						},

					],
					"1_2": [{
							"br": {
								"x": 50,
								"y": 50
							},
							"tl": {
								"x": 0,
								"y": 0
							},
							"l": "xb",
							"c": 0.8,
							"n": "雪碧",
						},
						{
							"br": {
								"x": 75,
								"y": 75
							},
							"tl": {
								"x": 50,
								"y": 50
							},
							"l": "asda",
							"c": 0.8,
							"n": "果粒橙",
						},

					],
					"2_2": [{
							"br": {
								"x": 0,
								"y": 0
							},
							"tl": {
								"x": 150,
								"y": 150
							},
							"l": "glc",
							"c": 0.65,
							"n": "果粒橙",
						},

					],

				}
			}
		})
	},

	'GET /vm_inventorys/instock/:id/goods/v1': (req, res) => { //商品入库商品搜索接口
		let rows = [];
		for(let i = 0; i < 10; i++) {
			rows.unshift({
				id: i,
				name: `商品${i}`,
				count1: i,
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 10
			}
		})
	},

	'GET /order_goodss/v1': (req, res) => { //交易明细
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				order_number: `123456${parseInt(Math.random() * 2)}`,
				order_id: i + parseInt(Math.random() * 200),
				order_id_status1: parseInt(Math.random() * 2),
				order_id_price: parseInt(Math.random() * 200),
				goods_id: i,
				goods_id_name: `商品名称${i}`,
				price: parseInt(Math.random() * 200),
				area_id: i,
				area_id_name: `片区名称${i}`,
				dbr_vm_id: i,
				dbr_vm_id_name: `点位名称${i}`,
				user_id: i,
				user_id_name: `用户名称${i}`,
				order_id_create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'GET /area_sales/v1': (req, res) => { //片区销售排行
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				area_id: i,
				area_id_name: `片区名称${i}`,
				success_price: parseInt(Math.random() * 200),
				success_total1: parseInt(Math.random() * 20),
				stat_date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'GET /vm_sales/v1': (req, res) => { //点位销售排行
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				area_id: i,
				dbr_vm_id_name: `点位名称${i}`,
				success_price: parseInt(Math.random() * 200),
				success_total1: parseInt(Math.random() * 20),
				stat_date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'GET /goods_sales/v1': (req, res) => { //商品销售排行
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				goods_id: i,
				goods_id_name: `商品名称${i}`,
				success_price: parseInt(Math.random() * 200),
				success_total1: parseInt(Math.random() * 20),
				stat_date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'GET /turnovers/v1': (req, res) => { //资金流列表
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				status1: parseInt(Math.random() * 2),
				type1: parseInt(Math.random() * 20),
				third_ratio: parseInt(Math.random() * 20) + '%',
				third_fee: parseInt(Math.random() * 20),
				price: parseInt(Math.random() * 200),
				total1: parseInt(Math.random() * 20),
				apply_id: i,
				apply_id_name: `申请人${i}`,
				apply_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				stat_date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'PUT /turnovers/v1': (req, res) => { //收款
		res.send({
			code: 0,
		})
	},
	'GET /withdrawalss/v1': (req, res) => { //提现列表
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				status1: parseInt(Math.random() * 3),
				type1: parseInt(Math.random() * 20),
				price: parseInt(Math.random() * 200),
				total1: parseInt(Math.random() * 20),
				apply_id: i,
				apply_id_name: `申请人${i}`,
				apply_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				withdrawals_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				receive_account: parseInt(Math.random() * 20),
				mark: `备注${i}`
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'GET /withdrawalss/info/v1': (req, res) => { //提现信息

		let data = {
			verified: parseInt(Math.random() * 2),
			payment_type: parseInt(Math.random() * 20), //提现方式
			payment_account: `1399564873${parseInt(Math.random() * 10)}`, //提现账号
			available_amount: parseInt(Math.random() * 20000) //可提现金额
		}
		res.send({
			code: 0,
			data
		})
	},
	'POST /withdrawalss/v1': (req, res) => { //提现
		res.send({
			code: 0,
			data: null
		})
	},
	'GET /withdrawalss/info/v1': (req, res) => { //提现信息

		let data = {
			verified: parseInt(Math.random() * 2),
			payment_type: parseInt(Math.random() * 20), //提现方式
			payment_account: `1399564873${parseInt(Math.random() * 10)}`, //提现账号
			available_amount: parseInt(Math.random() * 20000) //可提现金额
		}
		res.send({
			code: 0,
			data
		})
	},
	'POST /withdrawalss/v1': (req, res) => { //提现
		res.send({
			code: 0,
			data: null
		})
	},
	'PUT /withdrawalss/:id/reset/v1': (req, res) => { //重新提现
		res.send({
			code: 0,
			data: null
		})
	},
	'PUT /withdrawalss/:id/delete/v1': (req, res) => { //删除提现
		res.send({
			code: 0,
			data: null
		})
	},
	'GET /vm_alarms/v1': (req, res) => { //商品告警列表
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				vm_id_name: `点位名称${i}`,
				vm_code: i,
				goods: parseInt(Math.random() * 20),
				total1: parseInt(Math.random() * 20) + 20,
				empty_species: parseInt(Math.random() * 20),
				assigned_species: parseInt(Math.random() * 20) + 20,
				head_id: i,
				head_id_name: `负责人${i}`,
				head_id_phone: `1399564874${parseInt(Math.random() * 10)}`,
				distribution_id: i,
				distribution_id_name: `配送人员${i}`,
				distribution_id_phone: `1399564873${parseInt(Math.random() * 10)}`,
				update_time: moment(new Date()).format('YYYY-MM-DD')
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'GET /vm_alarms/:vm_code/v1': (req, res) => { //告警商品详情
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				name: `商品名称${i}`,
				total1: parseInt(Math.random() * 100),
				less: parseInt(Math.random() * 10)
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30,
			}
		})
	},
	'GET /vms/:id/alert/v1': (req, res) => { //告警商品详情
		let rows = [];
		for(let i = 0; i < 30; i++) {
			// rows.unshift({id:i,name:`商品名称${i}`, total1:parseInt(Math.random()*100),less:parseInt(Math.random()*10)});
			rows.unshift({
				id: i,
				name: `商品名称${i}`,
				alert: parseInt(Math.random() * 100)
			})
		}
		res.send({
			code: 0,
			data: rows
		})
	},
	'GET /device_exceptions/v1': (req, res) => { //设备异常告警列表
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				dealed: Number.parseInt(Math.random() * 2),
				level: Number.parseInt(Math.random() * 4),
				type1: Number.parseInt(Math.random() * 6),
				create_time: moment(new Date()).format('YYYY-MM-DD'),
				area_id: i,
				area_id_name: `片区名称${i}`,
				dbr_vm_id: i,
				dbr_vm_id_name: `点位名称${i}`,
				vm_code: i,
				content: `内容${i}`
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30
			}
		})
	},
	'GET /adss/v1': (req, res) => { //广告发布列表
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				verified: Number.parseInt(Math.random() * 2),
				publish_status1: Number.parseInt(Math.random() * 2),
				type1: Number.parseInt(Math.random() * 2),
				duration: Number.parseInt(Math.random() * 100),
				publish_id: i,
				publish_id_name: `发布人${i}`,
				publish_time: moment(new Date()).format('YYYY-MM-DD'),
				start_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				end_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				name: `广告名称${i}`,
				content: `广告内容${i}`
			})
		}
		res.send({
			code: 0,
			data: {
				rows,
				total: 30
			}
		})
	},
	'GET /adss/:id/v1': (req, res) => { //广告详情
		let rows = [];
		res.send({
			code: 0,
			data: {
				id: Number.parseInt(Math.random() * 31),
				verified: Number.parseInt(Math.random() * 2),
				verify_type1: `审核人类型${Number.parseInt(Math.random() * 3)}`,
				publish_status1: Number.parseInt(Math.random() * 2),
				// type1:Number.parseInt(Math.random()*2),
				type1: 1,
				target_type1: Number.parseInt(Math.random() * 3),
				duration: Number.parseInt(Math.random() * 200),
				publish_id: Number.parseInt(Math.random() * 31),
				publish_id_name: `发布人名称${Number.parseInt(Math.random() * 31)}`,
				publish_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				verify_id: Number.parseInt(Math.random() * 31),
				verify_id_name: `审核人名称${Number.parseInt(Math.random() * 31)}`,
				verify_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				start_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				end_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				name: `广告名称${Number.parseInt(Math.random() * 31)}`,
				urls: `${JSON.stringify(['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=13494053,753129078&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=13494053,753129078&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=13494053,753129078&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=13494053,753129078&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=13494053,753129078&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=13494053,753129078&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4252485052,3545321675&fm=27&gp=0.jpg', 'http://img3.imgtn.bdimg.com/it/u=934669005,3046197786&fm=27&gp=0.jpg'])}`,
				mark: `备注${Number.parseInt(Math.random() * 31)}`,
				content: `内容${Number.parseInt(Math.random() * 31)}`,
				target_value: `${JSON.stringify([{id: 1, name: '目标1'}, {id: 2, name: '目标2'}, {id: 3, name: '目标3'}, {
          id: 4,
          name: '目标4'
        }, {id: 5, name: '目标5'}])}`
			}
		})
	},
	'GET /adss/:id/verify/v1': (req, res) => { //广告审核撤消
		res.send({
			code: 0
		})
	},
	'GET /ads_logs/:id/v1': (req, res) => { //广告发布记录列表
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				publish_status1: Number.parseInt(Math.random() * 2),
				dbr_vm_id: i,
				dbr_vm_id_name: `售货柜名称${i}`,
				publish_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				vm_code: i
			})
		}
		res.send({
			code: 0,
			data: {
				total: 30,
				rows,
			}
		})
	},
	'GET /vms/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.push({
				id: i,
				enabled: 0,
				assigned: 0,
				device_model_id: parseInt(Math.random() * 2),
				device_model_id_name: `test${i}`,
				code: i,
			})
		}
		res.send({
			code: 0,
			data: {
				total: 30,
				rows: rows
			}
		})
	},
	'GET /devices/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.push({
				id: i,
				enabled: 0,
				binded: 0,
				device_model_id: parseInt(Math.random() * 2),
				device_model_id_name: `test${i}`,
				code: i,
			})
		}
		res.send({
			code: 0,
			data: {
				total: 30,
				rows: rows
			}
		})
	},
	'GET /hgobox_operation_logs/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.push({
				id: i,
				type1: i,
				status1: 0,
				device_id: 0,
				vm_code: parseInt(Math.random() * 2),
				create_id: i,
				create_id_name: `test${i}`,
				create_time: `test${i}`,
				update_time: i,
			})
		}
		res.send({
			code: 0,
			data: {
				total: 30,
				rows: rows
			}
		})
	},
	'GET /hgobox_operation_logs/:id/command/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				data: `售货柜名称${i}`,
			})
		}
		res.send({
			code: 0,
			data: 'asdadsa'
		})
	},
	'GET /hgobox_operation_logs/:id/result/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.unshift({
				id: i,
				data: `售货柜名称${i}`,
			})
		}
		res.send({
			code: 0,
			data: 'asdaasdasddsa'
		})
	},
	'GET /devices/:id/v1': (req, res) => {
		res.send({
			code: 0,
			data: {
				mark: '我是测试备注'
			}
		})
	},
	'GET /devices/:id/distortion/v1': (req, res) => {
		res.send({
			code: 0,
			data: {
				distortion: '我是测试畸变参数'
			}
		})
	},
};