// pages/bookdetail/bookdetail.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    novelImag:'',
    novelId:0,
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
    console.log('player onLoad');
    let that = this;
    let data = app.globalData.selectBook;
    that.setData({
      novelImag: data.novel_cover,
      novelId: data.novel_id,
    });
    
    this.loadChapters(data.novel_id)
  },

  loadChapters: function (id) {
    var that = this;
    this.setData({
      hidden: false
    })
    wx.request({
      url: 'http://132.232.54.132:8081/api/v1/novels/chapters?novel_id=' + id,

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.info,
          hidden: true
        });
      }
    })
  },


  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  tap_start: function (e) {
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function (e) {
    // touchmove事件

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
      this.setData({
        open: true
      });
    } else {
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
  }

})