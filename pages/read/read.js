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
    
    selectedId:0,

    categoryList:[],
    categoryDetailInfo:{},
    categoryDetailInfoDicList:[],
    hidden: true,
  },
  loading: false,


  onLoad: function (options) {
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

    console.log(options)
    
    if (options.share == 1) {

      wx.navigateTo({
        url: '../bookdetail/bookdetail?novelid=' + options.novelid,
      });
    }
  },

//获取分类信息
  loadCategoryData: function () {
    var that = this;
    this.setData({
      hidden: false
    })
    wx.request({
      url: app.globalData.serverHost + '/api/v1/novels/types',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
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
      url: app.globalData.serverHost + '/api/v1/novels/home?type_id=' + id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("request:" + res.data);
        that.setData({
          categoryDetailInfo: res.data.info,
          selectedId: id,
          hidden: true,
        });
        var tempDic = {}
        tempDic[id] = res.data.info;
        that.data.categoryDetailInfoDicList.push(tempDic);
      }
    })
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    var index = e.detail.current;
    var currentType_id = that.data.categoryList[index].type_id;
    
    var exist = false;
    var tempDetail = {};
    for (var i = 0; i < that.data.categoryDetailInfoDicList.length;i++){
      var tempDic = that.data.categoryDetailInfoDicList[i];
      if (tempDic[currentType_id] != undefined || tempDic[currentType_id] != null){
        exist = true;
        tempDetail = tempDic;
        break;
      }
    }
    if (!exist) {
      this.loadDetailData(currentType_id)
    }else{
      that.setData({
        categoryDetailInfo: tempDetail[currentType_id],
        selectedId: currentType_id,
      });
    }
    that.setData({
      currentTab: e.detail.current,
    });
  },
  /**
   * 点击tab切换
   */
  swithNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });

  },


  //点击小说事件
  bindItemTap: function (event) {
    var data = event.currentTarget.dataset.data; // 当前id
    // 设置到全局变量中去，让下个页面可以访问
    // app.globalData.selectBook = data;
    console.log(data);
    wx.navigateTo({
      url: '../bookdetail/bookdetail?novelid=' + data.novel_id,
    });
  },

  //点击搜索
  touchSraech : function (event) {
    wx.navigateTo({
      url: '../searchList/searchList'
    })
  }

})