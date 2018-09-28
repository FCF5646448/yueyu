var app = getApp()

Page({
  data: {
    list: []
  },
  loading: false,

  onLoad: function () {
    this.loadData()
  },

  loadData: function () {
    var that = this;
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
})

