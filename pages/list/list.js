// pages/list/list.js
var config = require('../../config/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    nOReturn: false,
    isReturn: false,
    page: 1,
    showBottom: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nOReturn: true
    })
    this.getNoReturn()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    console.log('111')
    wx.showToast({
      title: '服务器登陆失败，请退出后重新登录',
      duration: 2000
    })
    this.setData({
      page: 1,
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('111')
    if (this.data.showBottom) {
      return
    }
    this.setData({
      page: this.data.page + 1,
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getNoReturn() {
    this.setData({
      nOReturn: true,
      isReturn: false,
      showBottom: false,
      list: []
    })
    this.getList();
  },
  getReturn() {
    this.setData({
      nOReturn: false,
      isReturn: true,
      showBottom: false,
      list: []
    })
    this.getList();
  },
  getList() {
    let borrowType;
    let that = this;
    if (this.data.nOReturn) {
      borrowType = "2,4"
    } else {
      borrowType = 3
    }
    wx.request({
      url: config.pash + '/sharing/api/v1/borrow/query',
      data: {
        "borrowTypes": borrowType,
        "page": that.data.page,
        "pageSize": 10,
        "mobile": "15656565656",
      },
      method: 'POST',
      success: function (res) {
        
        const { data, status } = res.data;
        if (!status) {
          // if (that.data.page > 1) {
          //   console.log(that.data.list)
          //   console.log('this.data.list')
          //   this.compareTime(data.item, borrowType);
          //   let dt = that.data.list.concat(data.item);
          //   that.setData({
          //     list: dt
          //   })
          // } else {
          //   that.setData({
          //     list: data.item
          //   })
          // }
          that.compareTime(data.item, borrowType);
          if (data.item && data.item.length < 10) {
            that.setData({
              showBottom: true
            })
          }
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器登陆失败，请退出后重新登录',
          duration: 2000
        })
      }
    })
  },
  listNoReturnClick(e) {
    var p = e.currentTarget.id
    wx.navigateTo({ url: '/pages/borrowDetail/borrowDetail?id=' + p + '&type=list' })
  },
  listReturnClick(e) {
    var p = e.currentTarget.id
    wx.navigateTo({ url: '/pages/borrowDetail/borrowDetail?id=' + p + '&type=list' })
  },
  compareTime(d, borrowType) {
    console.log(d.length)
    let that = this;
    let creat = new Date();
    creat = creat.getTime();
    console.log(creat)
    let index = d.length;
    let parm = [];
    if (index > 0) {
      for (let i=0; i < index; i++) {
        console.log(d[i])
        let returnT = new Date(d[i].planBackTime);
        if (creat > returnT) {
          d[i].uotDate = true;
         
        } else {
          d[i].uotDate = false;
        }
        parm.push(d[i])
      }
    }
    if (that.data.page > 1) {
      let dt = that.data.list.concat(d);
      that.setData({
        list: dt
      })
    } else {
      that.setData({
        list: d
      })
    }
    console.log(that.data.list)
  }
})