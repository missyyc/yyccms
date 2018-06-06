import PropTypes from 'prop-types';
import {Switch, Route, Redirect, routerRedux, IndexRoute, Router} from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';

const {ConnectedRouter} = routerRedux;

/**
 * 这里路由只能有一个可以嵌套的路由组件，应该是通过innerhtml插入的
 */
const Routers = function ({history, app}) {
  const error = dynamic({
    app,
    component: () => import('./routes/error')
  });

  const routes = [
    {
      path: '/home',
      component: () => import('./routes/home/home'),
      models: () => [
        import('./models/home/home'),
      ]
    },
    {
      path: '/login',
      component: () => import('./routes/Login/index'),
      models: () => [import('./models/Login')]
    },
    {
      path: '/audio',
      component: () => import('./routes/Audio/index'),
      models: () => [
        import('./models/Audio'),
      ]
    },
  ];

  return (
    <ConnectedRouter className='router' history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login" />)}/>
          {

            routes.map(({path, ...dynamics}, key) => (
              <Route key={key}
                     exact
                     path={path}
                     component={dynamic({
                       app,
                       ...dynamics,
                     })}
              >
              </Route>
            ))
          }
          <Route component={error} exact/>
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers




