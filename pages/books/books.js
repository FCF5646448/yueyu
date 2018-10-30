
var app = getApp()

Page({
  data: {
    list: [],
    hidden: true,
    audioData: null,
    wxuser:null,
    openid:"",
  },
  loading: false,

  onShow:function (){
    new app.LoginToast();
    this.wxlogin();
  },

  loadData: function () {
    var that = this;
    this.setData({
      hidden: false,
      wxuser: app.globalData.wxUserInfo,
      openid: app.globalData.OpenIdInfo.openid,
    })
    console.log("loadData");
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
          hidden: true,
        });
      }
    })
  },
  //点击事件
  bindItemTap: function (event) {
    var data = event.currentTarget.dataset.data; // 当前id
    console.log(data);
    wx.navigateTo({
      url: '../bookdetail/bookdetail?novelid=' + data.novel_id,
    });
    // var name = event.currentTarget.dataset.data.Album; // 当前id
    // wx.navigateTo({
    //   url: '../instructor/instructor?Album=' + name
    // });
  }
})
