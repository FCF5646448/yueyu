
var app = getApp()

Page({
  data: {
    list: [],
    hidden: true,
    audioData: null,
    appuser:null,
    openid:"",
  },
  loading: false,

  onLoad: function () {
    app.showLogin.show();

    this.setData({
      appuser: app.globalData.userInfo,
      openid: app.globalData.userOpenInfo.openid,
    })
    this.loadData()
    wx.hideOptionMenu();
  },

  loadData: function () {
    var that = this;
    this.setData({
      hidden: false,
    })
    console.log("xxxxxxx");
    console.log(that.data.openid);
    wx.request({
      url: app.globalData.serverHost + '/api/v1/novels/records?open_id=' + that.data.openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.info.Record,
          audioData:res.data.info.User,
          hidden: true
        });
      }
    })
  },
  //点击事件
  bindItemTap: function (event) {
    var name = event.currentTarget.dataset.data.Album; // 当前id
    wx.navigateTo({
      url: '../instructor/instructor?Album=' + name
    });
  }
})
