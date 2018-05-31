import qs from 'qs';
import app from "../config/app"

import { notification, message, Modal } from 'antd';

const errorMessages = (res) => `${res.status} ${res.statusText}`;
let modalVisible = false;

let flag = 0;
export function handleRequestError(errmsg) {
  // console.log(errmsg.response)
  if(errmsg.response && errmsg.response.status == 401) {
    if(flag == 1) {
      return;
    }
    flag = 1;
    Modal.warning({
      title: '注意',
      content: '该账户已在其他地方登陆，请重新登陆', 
      okText: '确定',
      onOk: () => {
        console.log(window.location)
        // window.location.href = window.location.origin
        flag = 0;
      }
    })
  } else {
    if(flag == 1) {
      return;
    }
    flag = 1;
    notification['error']({
      message: '系统错误',
      description: errmsg + '，请联系技术人员',
      duration: 5,
    });
  }
  // notification['error']({
  //   message: '系统错误',
  //   description: errmsg + '，请联系技术人员',
  //   duration: 5,
  // });
}
export function handleErrorCode({ data }) {
  const { errcode, errmsg, redirect } = data;
  if (typeof (errcode) != 'undefined' && errcode != 0) {
    if (errcode >= 400) { //静默跳转
      let path = redirect;
      if (errcode == 401)
        path = app.baseRoute + app.loginRoute;
      redirectTo(path);
    } else if (errcode >= 300) { //先提示后跳转
      let path = redirect;
      if (errcode == 301)
        path = app.baseRoute + app.loginRoute;
      if (!modalVisible) {
        modalVisible = true;
        Modal.info({
          title: errmsg,
          onOk() {
            if (window.location.pathname.indexOf(path) != 0) {
              modalVisible = false;
              app.routerHistory.push(path) //当前url不是登录页面则跳转 
            }
          },
        });
      }
    } else if (errcode >= 200) { //提示性异常 
      message.error(errmsg, 4);
    } else { //系统异常 
      notification['error']({
        message: '服务器内部异常',
        description: errmsg + '，请联系管理员',
        duration: 5,
      });
    }
    // throw new Error(errmsg);
    return { err: data };
  }
  return data;
}

function redirectTo(redirect) {
  modalVisible = false;
  if (redirect.indexOf("http://") >= 0 || redirect.indexOf("https://") >= 0) {
    if (window.location.href != redirect) {
      window.location.href = redirect;
    }
  } else if (window.location.pathname != redirect) {
    app.routerHistory.push(redirect) //当前url不是登录页面则跳转 
  }
}
