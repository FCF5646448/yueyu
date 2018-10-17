// pages/readContent/readContent.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novelId: 0,
    chapterNo:0,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      chapterNo: options.chapterNo,
      novelId: options.novelId,
    });
    that.loadData(options.novelId,options.chapterNo)
  },

  loadData: function (novelId, chapterNo) {
    var that = this;
    var url = app.globalData.serverHost + '/api/v1/novels/special/chapter?novel_id=' + novelId + '&chapter_num=' + chapterNo;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          info: res.data.info
        });
        wx.setNavigationBarTitle({
          title: res.data.info.chapter_name
        })
      }
    })
  }

})
