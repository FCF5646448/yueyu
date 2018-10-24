// pages/bookdetail/bookdetail.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    novel:{}, //小说
    novelIntro:'', //简介
    novelImag:'', //封面图
    novelId:0, //id
    toView: '#', //滚动的id
    list: [],

    open: false,
    mark: 0,
    newmark: 0,
    istoright: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let data = app.globalData.selectBook;
    console.log("xxxxxx");
    that.setData({
      novel:data,
      novelImag: data.novel_cover,
      novelId: data.novel_id,
      novelIntro: data.novel_abstract,
    });
    wx.setNavigationBarTitle({
      title: data.novel_name
    });
    
    this.loadChapters(options.novelid)
  },

  loadChapters: function (id) {
    var that = this;
    this.setData({
      hidden: false
    })
    wx.request({
      url: app.globalData.serverHost + '/api/v1/novels/chapters?novel_id=' + id,

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.info,
          hidden: true,
          toView: '第九百三十八章 太虚尸行者',//that.data.novel.novel_latest_chapter_name,
        });
      }
    })
  },


  tap_ch: function (e) {
    if (this.data.open) {
      console.log("close")
      this.setData({
        open: false,
      });
    } else {
      console.log("open")
      this.setData({
        open: true,
      });
    }
  },
  tap_start: function (e) {
    console.log("tap_start")
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function (e) {
    // touchmove事件
    console.log("tap_start")
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;

    }
    this.data.mark = this.data.newmark;
  
  },

  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    if (this.istoright) {
      console.log("open1")
      this.setData({
        open: true
      });
    } else {
      console.log("close1")
      this.setData({
        open: false
      });
    }
  },


  //点击事件
  bindItemTap: function (event) {
    var novelId = event.currentTarget.dataset.data.novel_id; // 当前id
    var chapterNo = event.currentTarget.dataset.data.chapter_num; //
    wx.navigateTo({
      url: '../readContent/readContent?novelId=' + novelId + '&chapterNo=' + chapterNo
    });
  },

  //点击最新阅读章节
  bindCurrentItemTap: function (event) {
    let that = this;
    var novelId = that.data.novel.novel_id; // 当前id
    var chapterNo = that.data.novel.novel_latest_chapter_num; //
    wx.navigateTo({
      url: '../readContent/readContent?novelId=' + novelId + '&chapterNo=' + chapterNo
    });
  },

  //加入书架
  addCar: function (event) {
    //
  },

  //分享
  onShareAppMessage:function(res) {
    var that = this;
    return {
      title: that.data.novel.novel_name,
      imageUrl: that.data.novel.novel_cover,
      path: 'pages/bookdetail/bookdetail?novelid=' + that.data.novelId,
      success: function (res) {
        console.log("转发成功")
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  }

})