import React from 'react'
import { Tag, Popover, Row, Col } from 'antd';
import {Link} from 'dva/router'
// import {titleByPath} from '../../config/staticUtil'
import {getTitleByPathname, getKeysByPathname} from '../../utils/utils'

import './style.scss'

class NavTabs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {navTabs, pathname, onTabClose, dispatch} = this.props

    let showMore = false
    let visibleTabs = [], hiddenTabs = []
    if (navTabs.length > 8) {
      showMore = true
      visibleTabs = navTabs.slice(0, 8)
      hiddenTabs = navTabs.slice(8)
    } else {
      visibleTabs = navTabs
    }

    const popContent = (
      <div>
        {hiddenTabs.map((tab, index) => (
          <div key={index} className='nav-tab hidden-tab'> {/* 横着显示的 */}
            <Link
              onClick={() => {
                dispatch({type: 'app/updateState', refresh: false, ...getKeysByPathname(tab)})
                dispatch({type: 'app/setTabFirst', tab})
              }}
              to={{pathname:tab}}>{getTitleByPathname(tab)}
            </Link>
            { ' '}
            <span className="icon hgobox icon-guanbi guanbi-icon" onClick={() => onTabClose(tab)}></span>
          </div>
        ))}
      </div>
    )

    return (
      <div style={{marginLeft:20,height:40}} className='flex start-start-center'>
        <Row style={{width: '90%'}} gutter={8}>
          {visibleTabs.map((tab, index) => {
            const activeClass = tab == pathname ? 'active' : ''
            return (
              <Col key={index} span={3}>
                <div  className={'nav-tab ' + activeClass} > {/* 横着显示的 */}
                <Link
                  onClick={() => {
                    dispatch({type: 'app/updateState', refresh: false, ...getKeysByPathname(tab)})
                  }}
                  to={{pathname:tab}}
                >
                  {getTitleByPathname(tab)}
                </Link>
                { ' '}
                <span className="icon hgobox icon-guanbi guanbi-icon" onClick={() => onTabClose(tab)}></span>
              </div>
              </Col>

          )})}
        </Row>
        {/* 显示更多按钮*/}
        {showMore && (

          <Popover content={popContent} placement="bottomRight">
            <div className="nav-tab more-tab">
              <span className="icon hgobox icon-gengduo"></span>
            </div>
          </Popover>

        )}
      </div>
    )
  }
}


export default NavTabs
