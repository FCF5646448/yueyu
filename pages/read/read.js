const app = getApp()

// Page({
//     data:{
//       proList:[
//         {
//           selected:true,
//           id:0,
//           proUrl:"http://img1.3lian.com/2015/w7/85/d/101.jpg",
//           proTitle:"test",
//           proDec:"test1",
//           proPrice:0.01
//         },
//         {
//           selected: false,
//           id: 1,
//           proUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg",
//           proTitle: "test",
//           proDec: "test1",
//           proPrice: 0.01
//         },
//         {
//           selected: false,
//           id: 2,
//           proUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg",
//           proTitle: "test",
//           proDec: "test1",
//           proPrice: 0.01
//         }
//       ]
//     },
//     getSelectItem: function (e) {
//       var that = this;
//       var itemWidth = e.detail.scrollWidth / that.data.proList.length;//每个商品的宽度
//       var scrollLeft = e.detail.scrollLeft;//滚动宽度
//       var curIndex = Math.round(scrollLeft / itemWidth);//通过Math.round方法对滚动大于一半的位置进行进位
//       for (var i = 0, len = that.data.proList.length; i < len; ++i) {
//         that.data.proList[i].selected = false;
//       }
//       that.data.proList[curIndex].selected = true;
//       that.setData({
//         proList: that.data.proList,
//         giftNo: this.data.proList[curIndex].id
//       });
//     },
//     selectProItem: function(){
      
//     }
// })

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
    // var id = e.detail.id;
    // if (id == null) {
    //   id = 1 //默认为1 玄幻
    // }
    // var  + 1;   
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


  //点击事件
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