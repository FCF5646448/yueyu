//流程 外部接口调用wxlogin，成功后显示登录界面获取用户信息，然后去请求openid，之后拿着openid和用户信息登录自己服务
var logincode = null

let loginToast = {
  //登录微信
  wxlogin: function () {
    //查看登录信息
    var login = wx.getStorageSync('login');
    login = '';
    if (login.length > 0 && login == 'success') {
      console.log("已登录");
      getApp().globalData.OpenIdInfo = wx.getStorageSync('OpenIdInfo');
      getApp().globalData.wxUserInfo = wx.getStorageSync('wxUserInfo');
    } else {
      // 登录
      console.log("未登录");
      wx.login({
        success: res => {
          if (res.code) {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res);
            this.setData({
              'logincode': res.code,
            });
            getApp().globalData.loginCode = res.code;
            this.show()
          }
        }
      })
    }
  },

  //点击获取用户信息
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    getApp().globalData.wxUserInfo = e.detail.userInfo
    wx.setStorage({
      key: 'wxUserInfo',
      data: e.detail.userInfo,
    })
    this.getOpenId();
  },

  // toast显示的方法
  show: function () {
    let self = this;
    this.setData({
      '_toast_.isHide': true,
    });
  },

  hide: function () {
    this.setData({
      '_toast_.isHide': false,
    });
  },

  //获取openid
  getOpenId: function () {
    console.log("getOpenId");
    wx.request({
      url: 'https://lanxiyuedu.com/api/v1/novels/openid?loginCode=' + getApp().globalData.loginCode,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log("getOpenId success");
        console.log(res.data);
        wx.setStorage({
          key: 'OpenIdInfo',
          data: res.data.info,
        })
        getApp().globalData.OpenIdInfo = res.data.info;
        console.log(getApp().globalData.userOpenInfo);
        this.loginServer()
      }
    })
  },

  //登录自己服务器
  loginServer: function () {
    console.log("loginServer");
    var open_id = getApp().globalData.OpenIdInfo["openid"];
    var name = getApp().globalData.wxUserInfo["nickName"];
    var HeadUrl = getApp().globalData.wxUserInfo["avatarUrl"];
    console.log(open_id);
    wx.request({
      url: 'https://lanxiyuedu.com/api/v1/novels/login',
      data: {
        //数据urlencode方式编码，变量间用&连接，再post
        'channel': 1,
        'HeadUrl': HeadUrl,
        'name': name,
        'openid': open_id,
      },
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: res => {
        console.log("loginServer success");
        console.log(res.data);
        wx.setStorage({
          key: 'login',
          data: 'success',
        })
        this.hide()
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
      },
      fail() {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },
}

function LoginToast() {
  // 拿到当前页面对象
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this.__page = curPage;
  // 小程序最新版把原型链干掉了。。。换种写法
  Object.assign(curPage, loginToast);
  // 附加到page上，方便访问
  curPage.loginToast = this;
  // 把组件的数据合并到页面的data对象中
  // curPage.setData(_compData);
  curPage.setData({
    '_toast_.isHide': false,
    '_toast_.canIUse': wx.canIUse('button.open-type.getUserInfo'),
    'loginCode':null,
  })
  return this;
}

module.exports = {
  LoginToast
}