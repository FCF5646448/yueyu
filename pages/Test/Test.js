
// pages/Test/Test.js
const Print = require('../../utils/print.js')

Page({
  data: {
    newsData:''
  },
  onLoad: function() {
    Print.printLog("test onLoad");
  },
  loadData: function(event) {
    var that = this;
    wx.request({
      url: 'https://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsData:res.data
        });
      }
    })

  }
})
