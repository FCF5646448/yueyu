const app = getApp()

Page({
    data:{
      proList:[
        {
          selected:true,
          id:0,
          proUrl:"http://img1.3lian.com/2015/w7/85/d/101.jpg",
          proTitle:"test",
          proDec:"test1",
          proPrice:0.01
        },
        {
          selected: false,
          id: 1,
          proUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg",
          proTitle: "test",
          proDec: "test1",
          proPrice: 0.01
        },
        {
          selected: false,
          id: 2,
          proUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg",
          proTitle: "test",
          proDec: "test1",
          proPrice: 0.01
        }
      ]
    },
    getSelectItem: function (e) {
      var that = this;
      var itemWidth = e.detail.scrollWidth / that.data.proList.length;//每个商品的宽度
      var scrollLeft = e.detail.scrollLeft;//滚动宽度
      var curIndex = Math.round(scrollLeft / itemWidth);//通过Math.round方法对滚动大于一半的位置进行进位
      for (var i = 0, len = that.data.proList.length; i < len; ++i) {
        that.data.proList[i].selected = false;
      }
      that.data.proList[curIndex].selected = true;
      that.setData({
        proList: that.data.proList,
        giftNo: this.data.proList[curIndex].id
      });
    },
    selectProItem: function(){
      
    }
})