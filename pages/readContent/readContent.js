// pages/readContent/readContent.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novelId: 0, //当前页id
    chapterNo:0, //当前页章节id
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      chapterNo: options.chapterNo,
      novelId: options.novelId,
    });
    that.loadData(options.novelId, options.chapterNo)
  },

  loadData: function (novelId, chapterNo) {
    var that = this;
    var openid = app.globalData.OpenIdInfo.openid;
    var url = app.globalData.serverHost + '/api/v1/novels/special/chapter?novel_id=' + novelId + '&chapter_num=' + chapterNo + '&open_id=' + openid;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.info.chapter_content == "") {
          wx.showToast({
            title: '已经是最新，没有其他数据咯',
            icon: 'none'
          })
        }else{
          that.setData({
            info: res.data.info,
            novelId: res.data.info.novel_id,
            chapterNo: res.data.info.chapter_num,
          });
          wx.setNavigationBarTitle({
            title: res.data.info.chapter_name
          })
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 1,
          })
        }
      }
    })
  },

  //上一章
  lastchapter: function(){
    var that = this;
    that.loadData(that.data.novelId, that.data.chapterNo-1)
  },

  //下一章
  nextchapter: function(){
    var that = this;
    that.loadData(that.data.novelId, that.data.chapterNo+1)
  },

})
