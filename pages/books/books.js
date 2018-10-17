
var app = getApp()

Page({
  data: {
    list: [],
    hidden: true,
    audioData: null,
    appuser:null,
  },
  loading: false,

  onLoad: function () {
    this.loadData()
    this.setData({
      appuser: app.globalData.userInfo
    })
  },

  loadData: function () {
    var that = this;
    this.setData({
      hidden: false
    })
    wx.request({
      url: app.globalData.serverHost + '/api/v1/novels/records?open_id=32342345',
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
