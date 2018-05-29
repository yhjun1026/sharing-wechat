// pages/hire/hire.js
var config = require('../../config/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: {},
    uuid: '',
    payParam: {
      "borrowId": "",
      "payInfoParam": {
        "oriOutTradeNo": "",
        "oriTradeNo": "",
        "outTradeNo": "",
        "payAmt": 0,
        "payId": "",
        "payTime": "",
        "payType": 0,
        "payUser": "",
        "tradeNo": "",
        "transType": 0
      }
    },
    createTime: '',
    planBackTime: '',
    mType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id,
      mType: options.type
    })
    //租用明细跳转过来 直接查询明细
    that.getBorrowList(options.id)
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
  routerTo() {
    wx.switchTab({ url: '/pages/list/list' })
  },
  getBorrowList(id) {
    let that = this;
    wx.request({
      url: config.pash + '/sharing/api/v1/borrow/get/' + id,
      method: 'GET',
      success: function (res) {
        const { data, status } = res.data;
        console.log(status)
        console.log(data)
        if (!status) {
          that.setData({
            list: data
          })
          // this.compareTime(data);
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
  compareTime(d) {
    let creat = new Date();
    let returnT = d.planBackTime;
    if (creat.getTime() > returnT.getTime()) {
      that.setData({
        uotDate: true
      })
    }
  },
  //调用支付
  gotoCompensate(){
    let that = this;
    that.setData({
      payParam: {
        "borrowId": this.data.list.uuid,
        "payInfoParam": {
          "oriOutTradeNo": "",
          "oriTradeNo": "",
          "outTradeNo": "",
          "payAmt": 0,
          "payId": "",
          "payTime": "",
          "payType": 0,
          "payUser": "",
          "tradeNo": "",
          "transType": 0
        }
      }
    })
    wx.request({
      url: config.pash + '/sharing/api/v1/borrow/compensate',
      method: 'POST',
      data: this.data.payParam,
      success: function (res) {
        const { data, status } = res.data;
        console.log(status)
        console.log(data)
        if (!status) {
          that.getBorrowList(that.data.list.uuid)
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器登陆失败，请退出后重新登录',
          duration: 2000
        })
      }
    })
  }
})