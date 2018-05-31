import dva from 'dva';
import './index.less';
import app_config from "config/app";
// import createHistory from 'history/createBrowserHistory';
// 1. Initialize
const app = dva({
  //  history: createHistory(),
  onError(e) {
    console.log(e);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

document.title = app_config.name;