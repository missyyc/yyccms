import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input , Checkbox } from 'antd';
import './login.scss';
import { logoImg,mobileIcon,pwdIcon } from '../../config/config';
import { mobile,pwd } from '../../config/pattern';

const FormItem = Form.Item;

function Login({
   loading,
   errorInfo,
   dispatch,
   form: {
     getFieldDecorator,
     validateFieldsAndScroll,
   }
 }) {

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'users/login', payload: values })
    })
  }

  return (
    <div className='login-container full'>
      <div className='form'>
        <div className='logo flex center'>
          {logoImg}
        </div>
        <div className='flex center margin-top login-form'>轻购云管理后台</div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  // pattern:mobile,
                  message:'手机号格式不正确'
                },
              ],
            })(<Input size="large" prefix={mobileIcon} onPressEnter={handleOk} placeholder="请输入手机号" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  // pattern:pwd,
                  message:'密码必须是6-16位的数字字母符号组成'
                },
              ],
            })(<Input size="large" prefix={pwdIcon} type="password" onPressEnter={handleOk} placeholder="请输入密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住七天</Checkbox>
            )}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={loading.effects.login}>
              登录
            </Button>
          </Row>
          <Row>
            <div className='margin-top-15 flex center custom-error'>
              <span>{errorInfo}</span>
            </div>
          </Row>
        </form>
      </div>
    </div>
  )
}


export default connect(({ loading,users }) => {const { errorInfo } = users; return { loading,errorInfo }})(Form.create()(Login))
