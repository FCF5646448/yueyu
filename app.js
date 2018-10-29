//app.js
import { showLogin }from './pages/showAuthority/showAuthority';

App({
  showLogin,
  onLaunch: function () {
    wx.setEnableDebug({
      enableDebug: true //调试模式
    })
    wx.clearStorage(); //测试清理本地缓存
    this.wxSetting()
  },

  wxSetting: function() {
    // 获取用户信息 每次进来都获取信息信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("用户信息： ")
              this.globalData.wxUserInfo = res.userInfo
              this.wxlogin()
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail() {
              console.log("获取用户信息失败 ")
            }
          })
        } else {
          console.log("没有用户登录权限");
          wx.authorize({
            scope: 'scope.userInfo',
            success:res => {
              wx.getUserInfo({
                success: res => {
                  console.log("用户信息： ")
                  this.globalData.wxUserInfo = res.userInfo
                  this.wxlogin()
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                },
                fail() {
                  console.log("获取用户信息失败 ")
                }
              })
            }
          })
          // wx.showModal({
          //   title: '温馨提示',
          //   content: '获取用户信息需要开启用户权限',
          //   success:res => {
          //     if (res.confirm) {
          //       //去设置
          //       wx.openSetting({
          //         success: res => {
          //           wx.getUserInfo({
          //             success: res => {
          //               console.log("用户信息： ")
          //               this.globalData.wxUserInfo = res.userInfo
          //               this.wxlogin()
          //               // 所以此处加入 callback 以防止这种情况
          //               if (this.userInfoReadyCallback) {
          //                 this.userInfoReadyCallback(res)
          //               }
          //             },
          //             fail() {
          //               console.log("获取用户信息失败 ")
          //             }
          //           })
          //         }
          //       })
          //     }else{
          //       //不设置
          //     }
          //   }
          // })
        }
      }
    })
  },

  wxlogin: function() {
    //查看登录信息
    var login = wx.getStorageSync('login');
    login = '';
    if (login.length > 0 && login == 'success') {
      console.log("已登录");
      this.globalData.OpenIdInfo = wx.getStorageSync('OpenIdInfo');
    } else {
      // 登录
      console.log("未登录");
      wx.login({
        success: res => {
          if (res.code) {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res);
            this.getOpenId(res.code);
          }
        }
      })
    }
  },

  getOpenId : function(code){
    console.log("getOpenId");
    console.log(code);
    wx.request({
      url: 'https://lanxiyuedu.com/api/v1/novels/openid?loginCode=' + code,
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
        this.globalData.OpenIdInfo = res.data.info;
        console.log(this.globalData.userOpenInfo);
        this.loginServer()
      }
    })
  },

  //登录自己服务器
  loginServer: function () {
    console.log("loginServer");
    var open_id = this.globalData.OpenIdInfo["openid"];
    var name = 'xxx'//this.globalData.wxUserInfo["nickName"];
    var HeadUrl = 'xxx'//this.globalData.wxUserInfo["avatarUrl"];
    console.log(open_id);
    wx.request({
      url: 'https://lanxiyuedu.com/api/v1/novels/login',
      //'https://lanxiyuedu.com/api/v1/novels/login?channel=1' + '&HeadUrl=' + HeadUrl + '&name=' + name + '&open_id=' + open_id,
      data: {
        //数据urlencode方式编码，变量间用&连接，再post
        'channel': 1,
        'HeadUrl': HeadUrl,
        'name' : name,
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

  globalData: {
    serverHost: 'https://lanxiyuedu.com', //整个项目域名 //http://132.232.54.132:8081
    OpenIdInfo:null,
    wxUserInfo: null,
    selectBook:null
  }
})