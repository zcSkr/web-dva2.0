import app from "config/app";

export function config(data) {
  window.wx.config({
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'],
    ...data,
  });
  // debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  // appId, // 必填，公众号的唯一标识
  // timestamp, // 必填，生成签名的时间戳
  // nonceStr, // 必填，生成签名的随机串
  // signature, // 必填，签名，见附录1
  // jsApiList: jsApiList || ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}

export function ready(data, onSuccess, onFail) {
  let shareData = {
    title: app.name,
    desc: app.description,
    link: app.rootUrl + app.baseRoute + app.homeRoute,
    imgUrl: app.logo,
    ...data,
  };
  window.wx.ready(function() {
    /* 发送给朋友 */
    let data = {
      ...shareData,
      success: function(res) {
        if (onSuccess) onSuccess();
      },
      fail: function(res) {
        if (onFail) onFail(res);
      },
    };
    window.wx.onMenuShareAppMessage(data);
    /* 分享到朋友圈 */
    window.wx.onMenuShareTimeline(data);
    /* 分享到QQ */
    window.wx.onMenuShareQQ(data);
  });
}

/* 微信支付 */
function onBridgeReady(data, onSuccess, onFail, onCancel) {
  window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
    appId: data.appId, //公众号名称，由商户传入
    timeStamp: data.timeStamp, //时间戳
    nonceStr: data.nonceStr, //随机串
    package: data.package, //扩展包
    signType: data.signType, //微信签名方式:MD5
    paySign: data.paySign, //微信签名
  }, function(res) {
    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    if (res.err_msg == "get_brand_wcpay_request:ok") {
      if (onSuccess) onSuccess();
    } else {
      if (res.err_msg == "get_brand_wcpay_request:cancel") {
        if (onCancel) onCancel(res.err_msg);
      } else {
        if (onFail) onFail(res.err_msg);
      }
    }
  });
}

export function pay(data, onSuccess, onFail, onCancel) {
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data, onSuccess, onFail, onFail || onCancel), false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data, onSuccess, onFail, onFail || onCancel));
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(data, onSuccess, onFail, onFail || onCancel));
    }
  } else {
    onBridgeReady(data, onSuccess, onFail, onFail || onCancel);
  }
}

export function inWeixinBroswer() {
  var browerInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
  if (!browerInfo || browerInfo[1] < "5.0") { //非微信浏览器或微信小于5.0
    return false;
  }
  return true;
}
