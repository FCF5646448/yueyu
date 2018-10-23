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
      url: app.globalData.serverHost + '/api/v1/novels/types',
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
      url: app.globalData.serverHost + '/api/v1/novels/home?type_id=' + id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
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
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    var index = e.detail.current;
    var currentType_id = that.data.categoryList[index].type_id;
    
    var exist = false;
    var tempDetail = null;
    for (var i = 0; i < that.data.categoryDetailInfoDicList.length;i++){
      console.log("zzzz");
      var tempDic = that.data.categoryDetailInfoDicList[i];
      if (tempDic[currentType_id] != undefined || tempDic[currentType_id] != null){
        exist = true;
        tempDetail = tempDic;
        break;
      }
    }
    if (!exist) {
      console.log("yyyyyy");
      this.loadDetailData(currentType_id)
    }else{
      console.log("xxxxxx");
      console.log(tempDetail);
      that.setData({
        categoryDetailInfo: tempDetail,
        selectedId: currentType_id,
      });
      console.log(that.data.categoryDetailInfo);
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