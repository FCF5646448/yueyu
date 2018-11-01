//app.js
import { LoginToast } from './component/LoginToast/LoginToast'

App({
  LoginToast,
  onLaunch: function () {
    // wx.setEnableDebug({
    //   enableDebug: true //调试模式
    // })
    // wx.clearStorage(); //测试清理本地缓存

  },

  globalData: {
    serverHost: 'https://lanxiyuedu.com', //整个项目域名 //http://132.232.54.132:8081
    loginCode:null,
    OpenIdInfo:null,
    wxUserInfo: null,
    selectBook:null
  }
})