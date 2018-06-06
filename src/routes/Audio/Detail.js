import React,{Component} from 'react';
import './add.scss';
import {connect} from "dva";
import {
  Form,
  Row,
  Col,
  Modal,
} from 'antd';
import {ParseTime} from "../../config/staticUtil";

class Detail extends Component {

  render() {

    const {
      detailvisible,
      dispatch,
      detailinfo,
    } = this.props;

    return (
      <Modal
        title='售货柜详情'
        visible={detailvisible}
        onCancel={() => dispatch({type: 'Audio/updateState', detailvisible: !detailvisible})}
        width={565}
        footer={null}
        bodyStyle={{paddingBottom: '30px', paddingTop: '0px',}}
        maskClosable={false}
      >
        <Row className='manager_detail'>
          <Col span={24}>设备ID : {detailinfo ? detailinfo.id : ""}</Col>
          <Col span={24}>设备型号 : {detailinfo ? detailinfo.Audio_model_id_name : ""}</Col>
          <Col span={12}>启用人 : {detailinfo ? detailinfo.enable_id_name : ""}</Col>
          <Col span={12}>启用时间 : {detailinfo ? (detailinfo.enable_id_name != "" ? ParseTime(detailinfo.enable_time) : "") : ""}</Col>
          <Col span={12}>绑定管理人员 : {detailinfo ? detailinfo.bind_id_name : ""}</Col>
          <Col span={12}>绑定时间 : {detailinfo ? (detailinfo.bind_id_name != "" ? ParseTime(detailinfo.bind_time) : "") : ""}</Col>
        </Row>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    ...state.Audio
  }
})(Form.create()(Detail))
