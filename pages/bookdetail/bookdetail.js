// pages/bookdetail/bookdetail.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshare:0, //1表示是分享
    novel:{}, //小说
    novelId:0, //id
    list: [],

    open: false,
    mark: 0,
    newmark: 0,
    istoright: true,
    iscatalogtapped: true,

    toView:'',

    selectId:0,
    selectNo:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // toast组件实例
    let that = this;
    // let data = app.globalData.selectBook;
    console.log("xxxxxx");
    that.setData({
      novelId: options.novelid,
    });

    if (options.share == 1) {
      console.log('是分享进入');
      this.setData({
        isshare: options.share,
      })
    }

    this.loadNovelDetail(options.novelid)
    this.loadChapters(options.novelid)
  },

  loadNovelDetail:function(id) {
    var that = this;
    this.setData({
      hidden: false
    })
    wx.request({
      url: app.globalData.serverHost + '/api/v1/novels/summary?novel_id=' + id,

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          novel: res.data.info,
          hidden: true,
        });
        wx.setNavigationBarTitle({
          title: res.data.info.novel_name
        });
      }
    })
  },

  //获取所有章节
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
          list: res.data.info,//res.data.info.novel_latest_chapter_name,
          hidden: true,
        });

        // setTimeout(function () {
        //   that.setData({ toView: "第六百六十四章 冥都来客" })
        // }, 3000)

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
    this.iscatalogtapped = true
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function (e) {
    // touchmove事件
    console.log("tap_start")
    this.iscatalogtapped = false
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

    if (e.currentTarget.id == "catalogbtn") {
      console.log('按钮点击接触')
      return
    }
    if (this.iscatalogtapped) {
      return
    }
    
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
    this.setData({
      selectId: event.currentTarget.dataset.data.novel_id, // 当前id
      selectNo: event.currentTarget.dataset.data.chapter_num,
    })
    // toast组件实例
    new app.LoginToast();
    this.wxlogin();
  },

  //点击最新阅读章节
  bindCurrentItemTap: function (event) {
    let that = this;
    this.setData({
      selectId: that.data.novel.novel_id, // 当前id
      selectNo: that.data.novel.novel_latest_chapter_num,
    })
    // toast组件实例
    new app.LoginToast();
    this.wxlogin();
  },

  //
  loadData : function () {
    let that = this;
    var novelId = that.data.selectId;
    var chapterNo = that.data.selectNo;
    wx.navigateTo({
      url: '../readContent/readContent?novelId=' + novelId + '&chapterNo=' + chapterNo
    });
  },

  //加入书架
  gohome: function (event) {
    //

    if (this.data.isshare == 1) {
      console.log("由分享回到首页")
      wx.reLaunch({
        url: 'pages/read/read'
      })
    }else{
      console.log("返回首页")
      wx.navigateBack({
      })
    }
    
  },

  //分享
  onShareAppMessage:function(res) {
    var that = this;
    // var openid = app.globalData.OpenIdInfo.openid;
    return {
      title: that.data.novel.novel_name,
      imageUrl: that.data.novel.novel_cover,
      path: 'pages/read/read?novelid=' + that.data.novelId + '&share=1',// + '&openid=' + openid,
      success: function (d) {
        console.log("转发成功")
        console.log(d);
        //判断用户手机是IOS还是Android
        // if (d.platform == 'android') {
        //   wx.getShareInfo({//获取群详细信息
        //     shareTicket: res.shareTickets,
        //     success: function (res) {
        //       //这里写你分享到群之后要做的事情，比如增加次数什么的
        //     },
        //     fail: function (res) {//这个方法就是分享到的是好友，给一个提示
        //       wx.showModal({
        //         title: '提示',
        //         content: '分享好友无效，请分享群',
        //         success: function (res) {
        //           if (res.confirm) {
        //             console.log('用户点击确定')
        //           } else if (res.cancel) {
        //             console.log('用户点击取消')
        //           }
        //         }
        //       })
        //     }
        //   })
        // }
        // if (d.platform == 'ios') {//如果用户的设备是IOS
        //   if (res.shareTickets != undefined) {
        //     console.log("分享的是群");
        //     wx.getShareInfo({
        //       shareTicket: res.shareTickets,
        //       success: function (res) {
        //         //分享到群之后你要做的事情
        //       }
        //     })

        //   } else {//分享到个人要做的事情，我给的是一个提示
        //     console.log("分享的是个人");
        //     wx.showModal({
        //       title: '提示',
        //       content: '分享好友无效，请分享群',
        //       success: function (res) {
        //         if (res.confirm) {
        //           console.log('用户点击确定')
        //         } else if (res.cancel) {
        //           console.log('用户点击取消')
        //         }
        //       }
        //     })
        //   }
        // }
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  }

})