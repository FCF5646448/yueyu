
var app = getApp()

Page({
  data: {
    list: [],
    hidden: true,
    audioData: null
  },
  loading: false,

  onLoad: function () {
    this.loadData()
  },

  loadData: function () {
    var that = this;
    this.setData({
      hidden: false
    })
    wx.request({
      url: 'http://132.232.54.132:8081/api/v1/novels/sources',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.info,
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
