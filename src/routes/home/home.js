import React, {Component} from 'react';
import {Form, Button, Icon, Upload, message, Modal } from 'antd';
import "./home.scss";
import {connect} from "dva";
import {QINIUYUN_URL} from "../../config/constants";
import {getQiniuyunToken} from "../../services/qiniuyun";
class Home extends Component {

  state = {
   
  };

  render() {

    const {dispatch} = this.props;

  

    return (
      <div>
        <p>首页</p>

        123123123


      </div>
    );
  }
}

export default connect((state) => {
  return {
    ...state.home
  }
})(Form.create()(Home));

