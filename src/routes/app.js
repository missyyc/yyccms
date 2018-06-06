import './app.scss';
import {Menu, Layout, Button, Breadcrumb, Avatar, Tooltip, Icon, Tag} from 'antd';
import {connect} from 'dva'
import {withRouter, Link} from 'dva/router';
import _ from "lodash";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Sider, Content} = Layout;
import {indentIcon, avatar} from '../config/config';
import CustomLoading from '../components/customLoading';
import '../assets/fonts/iconfont.css';
import NavTabs from '../components/NavTabs/index.js';


function App({
               location,
               history,
               loading,
               children,
               dispatch,
               subMenu,
               showMenu,
               logoImage,
               logoBg,
               navs,
               personInfoVisible,
               username,
               selectedKeys,
               openKeys,
               permissionsList,
               navTabs
             }) {


  const personInfo = <div>
    <a onClick={() => dispatch({type: 'app/handleVisibleChange', visible: false})}><Icon type='user'/>个人中心</a>
    <a onClick={() => dispatch({type: 'app/handleVisibleChange', visible: false})}><Icon type='setting'/>设置</a>
    <a onClick={() => dispatch({type: 'app/loyout', visible: false})}><Icon type='logout'/>退出登录</a>
  </div>;

  const {pathname} = location;

  const renderChildren = (item) => {
    return (
      item.children ?
        <SubMenu key={item.key} title={<span>{item.icon}<span>{item.title}</span></span>}>
          {
            item.children.map((itemChild, indexChild) => {
              return renderChildren(itemChild)
            })
          }
        </SubMenu>
        :
        <Menu.Item key={item.key} title={null}>
                <span onClick={() => {
                  dispatch({type: 'app/subMenu', detail: {subMenu: item.sub}})
                }}>
                  {item.icon}<span>{item.title}</span>
                </span>
        </Menu.Item>
    );
  }

  const result = pathname == '/login' ? <div className='full'>{children}</div> :
    <div className='full' style={{flex: 1}}>
      <Layout className='full'>
        <Sider
          trigger={null}
          collapsible
          collapsed={!showMenu}
        >
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={!showMenu}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={(openKeys) => {
              dispatch({type: 'app/updateState', openKeys: openKeys})
            }}
            onSelect={
              ({selectedKeys}) => {
                dispatch({type: 'app/updateState', selectedKeys: selectedKeys})
              }
            }
          >
            <Menu.Item disabled>
              <a className={logoBg}>
                {logoImage}
              </a>
            </Menu.Item>

            {
              permissionsList.map((item, index) =>
                item.children ?
                  <SubMenu key={item.key} title={<span>{item.icon}<span>{item.title}</span></span>}>
                    {
                      item.children.map((itemChild, indexChild) =>
                        <Menu.Item key={itemChild.key}>
                          <Link to={itemChild.sub} onClick={() => {
                            dispatch({type: "app/updateState", refresh: true});
                          }}>{itemChild.title}</Link>
                        </Menu.Item>)
                    }
                  </SubMenu>
                  :
                  <Menu.Item key={item.key} title={null}>
                    <Link to={item.sub}>{item.icon}<span
                      style={{display: "inline-block", paddingLeft: "25px"}}>{item.title}</span></Link>
                  </Menu.Item>
              )
            }


          </Menu>
        </Sider>
        <Layout style={{background: '#eee', padding: 0}}>
          <Header style={{background: '#fff', padding: 0}}>
            <a onClick={() => dispatch({type: 'app/toggleMenu', showMenu: !showMenu})}>
              {indentIcon}
            </a>

            <Tooltip placement="bottom" title={personInfo} overlayClassName='personInfo' trigger='hover'
                     visible={personInfoVisible}
                     onVisibleChange={(visible) => dispatch({
                       type: 'app/updateState',
                       personInfoVisible: !personInfoVisible
                     })}>
              <div className=' avatar margin-right'>
                {avatar}
                <div className='flex start-comumn paddingLeft5'>
                  <div>欢迎</div>
                  <div>{username}</div>
                </div>
              </div>
            </Tooltip>

          </Header>

          <div>
            <NavTabs dispatch={dispatch} pathname={pathname} onTabClose={(tab) => {
              dispatch({type: 'app/removeTab', tab})
            }} navTabs={navTabs}></NavTabs>
          </div>

          <Content
            style={{
              padding: '0 24px',
              background: 'white',
              boxShadow: '10px 10px 40px #EEEEEE',
              margin: '0px 20px',
              position: "relative"
            }}>

            {children}

          </Content>

        </Layout>
      </Layout>
    </div>

  return (
    <div className='full flex'>
      {
        loading.global ? <CustomLoading/> : null
      }
      {
        result
      }
    </div>
  );
}

export default withRouter(connect((state) => {
  return {
    ...state.app,
    ...state.routing,
    loading: state.loading
  }
})(App));





