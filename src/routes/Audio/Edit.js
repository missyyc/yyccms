import React, {Component} from 'react';
import './add.scss';
import {connect} from "dva";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Modal,
} from 'antd';
import {is_android_sdk,getOptionByObj} from "../../config/staticUtil";


const FormItem = Form.Item;

class Edit extends Component {
  state = {
    avatars: [],//头像列表
  }


  deleteImage = (index) => {
    let avatars = JSON.parse(this.props.form.getFieldValue('image_urls'));
    avatars.splice(index, 1);
    this.props.form.setFieldsValue({
      image_urls: JSON.stringify(avatars)
    })
  }

  editOk = () => {

    this.props.dispatch({type: 'Audio/updateState', editvisible: !this.props.editvisible})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = this.props.detailinfo ? this.props.detailinfo.id : "";
        this.props.dispatch({type: 'Audio/edit', payload: values});
        message.success('编辑成功');
      }

    });
  }

  render() {
    const {
      editvisible,
      dispatch,
      form: {
        getFieldDecorator,
        setFieldsValue,
        getFieldValue
      },
    } = this.props;

    return (
      <Modal
        title='编辑设备'
        visible={editvisible}
        onOk={this.editOk}
        onCancel={() => dispatch({type: 'Audio/updateState', editvisible: !editvisible})}
        width={500}
        bodyStyle={{paddingBottom: '0', paddingTop: '20px',}}
        maskClosable={false}
        className="Audio_add"
      >
        <Form className='editcontent'>
          <Row gutter={10}>
            <Col span={24} className='editleftcol'>
              <Row className='editleft' gutter={10}>

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
    if (props.detailinfo) {
      return {
        app_version: {
          value: props.detailinfo.app_version,
        },
        android_sdk: {
          value: `${props.detailinfo.android_sdk}`,
        },
      }
    }
  }
})(Edit))
