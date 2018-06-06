import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';

class CustomLoading extends React.Component{

    render = ()=>(
        <div className='fixed'>
            <Spin size='large' tip='加载中......' />
            {/* <div className='warpper'>
                <div className='inner' />
                <div className='text' >LOADING</div>
            </div> */}
        </div>
    )

}

export default connect((state)=>{
    return {
        ...state.app
    }
})(CustomLoading)