import dynamic from 'dva/dynamic';

const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m =>
    import(`models/${m}`)),
  component,
});

export const getRouterData = app => {
  const navs = [{
    path: '/',
    exact: true,
    component: dynamicWrapper(app, ['example'], () => import('routes/IndexPage')),
  }]

  return navs;
}