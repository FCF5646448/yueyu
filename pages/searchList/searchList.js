// pages/searchList/searchList.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus:false,
    inputValue: '',
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.setData({
      focus:true,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  //输入时触发
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //点击搜索的时候出发
  searchTap : function () {
    var that = this;
    var url = app.globalData.serverHost + '/api/v1/novels/search?search=' + that.data.inputValue;
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
      }
    })
  },

  //点击小说事件
  bindItemTap: function (event) {
    var data = event.currentTarget.dataset.data; // 当前id
    console.log(data);
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.selectBook = data;
    wx.navigateTo({
      url: '../bookdetail/bookdetail'
    });
  }
})
