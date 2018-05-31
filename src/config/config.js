import createHashHistory from 'history/createHashHistory';
import qs from 'qs';

function getPlatformNo() {
  let location = window.location;
  let search = {
    ...qs.parse(location.search.split('?')[1]),
    ...qs.parse(location.hash.split('?')[1])
  };
  let platformNo = search._p || 'sys';
  if (!search._p) {
    let paths = location.pathname.split('/');
    if (paths.length > 1 && !!paths[1])
      platformNo = paths[1];
  }
  return platformNo;
}

function config() {
  let platformNo = sessionStorage.platformNo || getPlatformNo();
  let appsettings = sessionStorage.appsettings ? JSON.parse(sessionStorage.appsettings) : {};
  let settings = {
    baseRoute: appsettings.baseRoute || '/mingjiu', //平台基础路由
    rootUrl: appsettings.rootUrl || 'https://easy-mock.com/mock/5a93c40c8be1e80aa1c929f7/mobileapi/daqu',  //mall.conpanda.cn
    logo: appsettings.logo || 'http://via.placeholder.com/256x256',
    name: 'roadhog2.0', //名称
    version: '1.0.0', //版本
    description: '', //说明
    copyright: appsettings.copyright || '成都童伙信息技术有限公司', //版权所有
    uploadRoute: appsettings.uploadRoute || '/upload', //上传路由
    loginRoute: '/login', //登录路由
    homeRoute: '/member/member', //主页路由
  };

  return {
    platformNo,
    ...settings,
    routerHistory: createHashHistory(),
    getToken: function () {
      return sessionStorage.token ? sessionStorage.token : null;
    },
    setToken: function (token) {
      sessionStorage.token = token;
    },
    getUnionuser: function () {
      try {
        return sessionStorage.unionuser ? JSON.parse(sessionStorage.unionuser) : null;
      } catch (ex) {
        return null;
      }
    },
    setUnionuser: function (unionuser) {
      sessionStorage.unionuser = JSON.stringify(unionuser);
    },
  };
}

export default config();
