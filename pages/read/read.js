const app = getApp()

//获取应用实例
// var app = getApp()
Page({
  data: {
    /**
        * 页面配置
    */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,

    //
    selectedId:0,
  
    categoryList:[],
    categoryDetailInfo:{},
    hidden: true,
  },
  loading: false,


  onLoad: function () {
    var that = this;
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    this.loadCategoryData()
    this.loadDetailData(1)
  },

//获取分类信息
  loadCategoryData: function () {
    var that = this;
    this.setData({
      hidden: false
    })
    wx.request({
      url: 'http://132.232.54.132:8081/api/v1/novels/types',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          categoryList: res.data.info,
          hidden: true
        });
      }
    })
  },
  //获取各分类下的数据，默认id==1
  loadDetailData: function (id) {
    var that = this;
    this.setData({
      hidden: false
    })   
    wx.request({
      url: 'http://132.232.54.132:8081/api/v1/novels/home?type_id=' + id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          categoryDetailInfo: res.data.info,
          selectedId: id,
          hidden: true
        });
      }
    })
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    var index = e.detail.current;
    console.log(that.data.categoryList[index])
    var currentType_id = that.data.categoryList[index].type_id;
    that.setData({ 
      currentTab: e.detail.current,
    });
    this.loadDetailData(currentType_id)

  },
  /**
   * 点击tab切换
   */
  swithNav: function (e) {
    var that = this;
    console.log(e)
    that.setData({
      currentTab: e.target.dataset.current
    });

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
  },

  //点击搜索
  touchSraech : function (event) {
    wx.navigateTo({
      url: '../searchList/searchList'
    })
  }

})