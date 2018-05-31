import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from 'common/nav';


function RouterConfig({ history, app }) {
  let navs = getRouterData(app)

  return (
    <Router history={history}>
      <Switch>
        {
          navs.map(item => {
            return <Route key={item.path} exact={item.exact ? item.exact : false} path={item.path} component={item.component} />
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
