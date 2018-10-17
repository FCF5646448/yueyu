//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setEnableDebug({
      enableDebug: true //调试模式
    })
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res)
          wx.showToast({
            title: '登录成功',
            icon: 'none'
          })
        } else {
          // 否则弹窗显示，showToast需要封装
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          })
        }
      },
      fail() {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("用户信息： ")
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail(){
              console.log("获取用户信息失败 ")
            }
          })
        }
      }
    })
  },
  globalData: {
    serverHost: 'https://lanxiyuedu.com', //整个项目域名 //http://132.232.54.132:8081
    userInfo: null,
    selectBook:null
  }
})