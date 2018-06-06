import React, {Component} from 'react';
import './add.scss';
import {connect} from "dva";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Modal,
  message,
} from 'antd';
import {is_android_sdk,getOptionByObj} from "../../config/staticUtil";

const FormItem = Form.Item;
const {TextArea} = Input;

class Add extends Component {

  addOk = () => {

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      this.props.dispatch({type: 'Audio/updateState', addvisible: !this.props.addvisible});
      values.Audio_model_id = this.props.vms_model.id ? this.props.vms_model.id : "";
      this.props.dispatch({type: 'Audio/add', payload: values});
      this.props.dispatch({type: 'Audio/updateState', page:1});
      message.success('新增成功');
    });
  }
  render() {
    const {
      dispatch,
      addvisible,
      modelinfo,
      vms_model,
      chooseVmsModelVisible,
      form: {
        getFieldDecorator,
        resetFields,
      },
    } = this.props;

    return (
      <Modal
        title='新增设备'
        visible={addvisible}
        onOk={this.addOk}
        onCancel={() => dispatch({type: 'Audio/updateState', addvisible: !this.props.addvisible})}
        width={755}
        bodyStyle={{paddingBottom: '0', paddingTop: '20px',}}
        maskClosable={false}
        className="manager Audio_add"
        afterClose={
          () => {
            dispatch({
              type: 'Audio/updateState',
              vms: null,
              vms_model: '',
              modelinfo: '',
            })
            resetFields();
          }
        }
      >
        <Form className='editcontent'>
          <Row gutter={10}>
            <Col span={24} className='editleftcol'>
              <Row className='editleft'>
                <FormItem label='设备ID' labelCol={{span: 8}} wrapperCol={{span: 12}} className='textarea'>
                  {getFieldDecorator('id', {
                    rules: [{
                      required: true, message: '请输入设备ID'
                    }],
                    initialValue: ``
                  })(
                    <Input placeholder='请输入设备ID'/>
                  )}
                </FormItem>
                <FormItem label='设备型号' labelCol={{span: 8}} wrapperCol={{span: 12}}>
                  {getFieldDecorator('distributor', {
                    rules: [{
                      // required: true,
                      message: '请选择设备型号!'
                    }]
                  })(
                    <Button style={{width:"100%"}} onClick={() => {
                      dispatch({
                        type: 'Audio/updateState',
                        chooseVmsModelVisible: !chooseVmsModelVisible
                      });
                      let keys = [],rows = [];
                      if(vms_model.id){
                        keys = [vms_model.id],rows = [{id:vms_model.id,name:vms_model.name,key:vms_model.id}];
                      }
                      dispatch({type:'choosevmsmodel/updateState',selectedRowKeys:keys,selectedRows:rows})
                      dispatch({type: 'choosevmsmodel/getDataList',});
                    }}>{vms_model && vms_model.name ? vms_model.name : '单击选择设备型号'}</Button>
                  )}
                </FormItem>


                <FormItem label='Android SDK版本号' labelCol={{span: 8}} wrapperCol={{span: 12}}>
                  {getFieldDecorator('android_sdk', {
                    rules: [{
                      required: true,
                      message: '请选择Android SDK版本号',
                    }],
                  })(
                    <Select placeholder="请选择Android SDK版本号">
                      {getOptionByObj(is_android_sdk)}
                    </Select>
                  )}
                </FormItem>
                <FormItem label='APP版本号' labelCol={{span: 8}} wrapperCol={{span: 12}} className='textarea'>
                  {getFieldDecorator('app_version', {
                    rules: [{
                      required: true, message: '请输入APP版本号'
                    }],
                    initialValue: ``
                  })(
                    <Input placeholder='请输入APP版本号'/>
                  )}
                </FormItem>


                <ChooseVmsModel
                  visible={chooseVmsModelVisible}
                  onOk={(selectedRows) => {
                    dispatch({
                      type: 'Audio/updateState',
                      chooseVmsModelVisible: !chooseVmsModelVisible,
                      vms_model: selectedRows
                    });
                    dispatch({
                      type: 'Audio/model_detail',
                      payload: selectedRows
                    });

                  }}
                  onCancel={() => {
                    dispatch({
                      type: 'Audio/updateState',
                      chooseVmsModelVisible: !chooseVmsModelVisible
                    });
                  }}/>


              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    ...state.Audio
  }
})(Form.create({
  mapPropsToFields(props) {
    return {
      android_sdk: {
        value: props.modelinfo ? `${props.modelinfo.android_sdk}` : '',
      },
      app_version: {
        value: props.modelinfo ? props.modelinfo.app_version : "",
      },
    }
  }
})(Add))
