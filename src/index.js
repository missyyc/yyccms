import dva from 'dva';
import './index.scss';
import { message } from 'antd'
import createLoading from 'dva-loading';
import {parseTime,parseDate} from './config/filter';
import createHistory from 'history/createBrowserHistory';


// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError (error) {
    message.error(error.message)
    // message.error('出错了')
  },
})

// 2. Plugins

// 3. Model
app.model(require('./models/app'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
