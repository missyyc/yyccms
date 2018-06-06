import React, { Component } from 'react';
import './index.scss';
import { connect } from "dva";
import { getHasEnableByNum, isBinded, getOptionByObj } from "../../config/staticUtil";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Table,
  Popover,
  Popconfirm,
  message,
} from 'antd';
import { DEFAULTPAGESIZE, PAGESIZE } from "../../config/constants";
import Addcomponent from './Add';
import Detailcomponent from './Detail';
import Editcomponent from './Edit';

const FormItem = Form.Item;
const { TextArea } = Input;

class Audio extends Component {
  state = {
    pagesize: PAGESIZE
  }


  // 售货柜管理重置接口
  reset_Audio = () => {
    this.props.form.resetFields();
    this.props.dispatch({ type: 'Audio/reset' });
    this.props.dispatch({ type: 'Audio/list' });
    dispatch({ type: 'chooseArea/resetAll' });
  }

  // 售货柜管理搜索接口
  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'Audio/updateState',
          enabled: values.enabled,
          id: values.id,
          binded: values.binded,
          page: 1
        });
        console.log(values);
        this.props.dispatch({ type: 'Audio/list', });
      }
    });
  }


  render() {
    const {
      form: {
        getFieldDecorator,
        getFieldValue,
      },
      dispatch, datainfo, total, page, addvisible, detailvisible, editvisible,  detailinfo, distortion
    } = this.props;

    const addrowSelection = {
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {

        let select_arr = [];
        selectedRows.map((item) => {
          select_arr.push(item.id);
        })

        dispatch({
          type: 'Audio/updateState',
          selectedRows: selectedRows,
          selectedRowKeys: select_arr
        })
      },
      getCheckboxProps: record => ({
        disabled: !(record.binded == 0 && record.enabled == 1),
      }),
    };

    const columns = [{
      title: '类型',
      dataIndex: 'type',
      render: val => (val === 'song' ? '歌曲' : '直播音频'),
    },
    {
      title: '歌曲名',
      dataIndex: 'audio_name',
    },
    {
      title: '歌曲封面',
      dataIndex: 'img',
      render: val => {
        if (val) {
          return (
            <img
              src={`http://${val.url}`}
              alt="加载失败"
              style={{ width: '50px', height: '50px', objectFit: "cover" }}
            />
          );
        }
      },
    },
    {
      title: '歌唱日期',
      dataIndex: 'sing_date',
      render: val => moment(val).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '翻唱自',
      dataIndex: 'cover_singer',
    },
    {
      title: '播放次数',
      dataIndex: 'play_times',
    },
    {
      title: '点赞次数',
      dataIndex: 'love_times',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: val => {
        return val.map((tag, idx) => {
          return <Tag key={idx}>{tag.tag_name}</Tag>;
        });
      },
    }, {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>          
          <a onClick={() => {
              dispatch({ type: 'Audio/updateState', editvisible: !editvisible });
              dispatch({ type: 'Audio/detail', payload: record });
            }}>更新</a>
        </span>      
      ),
    }];

    return (
      <div className='Audio'>
        <Row gutter={24}>
          <Col span={24} key='2'>
            <Form
              className="Audio_head"
              onSubmit={this.handleSearch}
            >
              <FormItem className='reset'>
                <Button onClick={this.reset_Audio}>重置</Button>
              </FormItem>

              <FormItem className='reset'>
                <Button type="primary" onClick={this.handleSearch}>搜索</Button>
              </FormItem>
              <FormItem>
                {getFieldDecorator(`id`, {
                  initialValue: ""
                })(
                  <Input placeholder="请输入设备ID" className='inputSize'
                    onChange={(event) => {
                      dispatch({ type: 'Audio/updateState', id: event.target.value });
                    }}
                  />
                )}
              </FormItem>
              <FormItem className='searchverified'>
                {getFieldDecorator(`enabled`, {
                  initialValue: ""
                })(
                  <Select placeholder="请选择"
                    onSelect={(event) => {
                      dispatch({ type: 'Audio/updateState', enabled: event });
                    }}
                  >
                    {getOptionByObj(getHasEnableByNum)}
                  </Select>
                )}
              </FormItem>
              <FormItem className='searchverified'>
                {getFieldDecorator(`binded`, {
                  initialValue: ""
                })(
                  <Select placeholder="请选择"
                    onSelect={(event) => {
                      dispatch({ type: 'Audio/updateState', binded: event });
                    }}
                  >
                    {getOptionByObj(isBinded)}
                  </Select>
                )}
              </FormItem>
              <div className='clear'></div>
              <FormItem className='reset'>
                <Button type="primary" onClick={() => {
                  dispatch({
                    type: 'Audio/updateState',
                    addvisible: !addvisible,
                  });
                }}>+ 新增</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Table columns={columns} dataSource={datainfo} rowKey={record => record._id} pagination={{
              total: total,
              pageSize: this.state.pagesize,
              onChange: (page, pagesize) => {
                dispatch({ type: 'Audio/updateState', page: page });
                dispatch({ type: 'Audio/list' });
              },
              onShowSizeChange: (page, pageSize) => {
                this.setState({ pagesize: pageSize });
                dispatch({ type: 'Audio/updateState', page: 1, pageSize: pageSize, });
                dispatch({ type: 'Audio/list' });
              },
              showSizeChanger: true,
              showQuickJumper: true,
              current: page,
              pageSizeOptions: DEFAULTPAGESIZE,
            }} defaultCurrent={page} className='table' rowSelection={addrowSelection} />
          </Col>

        </Row>
      </div>
    );
  }
}


export default connect((state) => {
  return {
    ...state.Audio
  }
})(Form.create({
  mapPropsToFields(props) {
    return {
      code: {
        value: props.code,
      },
      id: {
        value: props.id,
      },
      enabled: {
        value: `${props.enabled}`,
      },
      binded: {
        value: props.binded,
      },
      beizhu: {
        value: props.detailinfo ? props.detailinfo.mark : ""
      },
      distortion: {
        value: props.distortion ? props.distortion : ""
      }
    }
  }
})(Audio));
