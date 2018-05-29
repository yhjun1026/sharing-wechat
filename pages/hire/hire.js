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
    borrowParam: {
      "custom": {
        "address": "",
        "mobile": "",
        "nick": "",
        "wechat": ""
      },
      "goodsDtl": [
        {
          "backDescrip": "",
          "borrowDescrip": "",
          "compensateAmt": 0,
          "depositAmt": 0,
          "goodsCode": "",
          "goodsName": "",
          "goodsPrice": 0,
          "goodsUuid": "",
          "memo": ""
        }
      ],
      "memo": "",
      "payInfo": {
        "oriOutTradeNo": "sring",
        "oriTradeNo": "",
        "outTradeNo": "",
        "payAmt": 0,
        "payId": "",
        "payTime": "",
        "payType": 0,
        "payUser": "",
        "tradeNo": "",
        "transType": 0
      },
      "planBackTime": "",
      "storeUuid": ""
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
    //物品租用跳转过来 则调用锁物品
    if (options.type == 'index') {
      that.getlockVersion(options.id)
    } else {
      //租用明细跳转过来 直接查询明细
      that.getBorrowList(options.id)
    }
  },
  getlockVersion(id) {
    let that = this;
    wx.request({
      url: config.pash + '/sharing/api/v1/goods/borrow',
      method: 'POST',
      data: { uuid: id },
      success: function (res) {
        const { data, status } = res.data;
        console.log(status)
        console.log(data)
        if (!status) {
          that.getDetail(id)
          that.setData({
            uuid: data.uuid
          })
        } else {

          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '锁物品失败',
            icon: 'none',
            duration: 2000
          })
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
  getDetail(id) {
    let that = this;
    let d = new Date();
    // that.setData({
    //   uuid: "bor" + mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000)
    // })
    that.setData({
      createTime: d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).substr(-2) + '-' +
      ('0' + d.getDate()).substr(-2) + ' ' +
      ('0' + d.getHours()).substr(-2) + ':' +
      ('0' + d.getMinutes()).substr(-2) + ':' +
      ('0' + d.getSeconds()).substr(-2),
      startTime: d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).substr(-2) + '-' +
      ('0' + d.getDate()).substr(-2)
    })
    wx.request({
      url: config.pash + '/sharing/api/v1/goods/get/' + id,
      method: 'GET',
      success: function (res) {
        const { data, status } = res.data;
        console.log(status)
        console.log(data)
        if (!status) {
          that.setData({
            list: data
          })
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
  // getPhoneNumber: function (e) {
  getPhoneNumber() {
    let that = this;
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
    if (this.data.planBackTime === '') {
      wx.showToast({
        title: '请选择归还时间',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    that.setData({
      borrowParam: {
        "custom": {
          "address": "",
          "mobile": "15656565656",
          "nick": "",
          "wechat": ""
        },
        "goodsDtl": [
          {
            "backDescrip": "",
            "borrowDescrip": '',
            "compensateAmt": 0,
            "depositAmt": this.data.list.depositamt,
            "goodsCode": this.data.list.code,
            "goodsName": this.data.list.name,
            "goodsPrice": this.data.list.price,
            "goodsUuid": this.data.uuid,
            "memo": ""
          }
        ],
        "memo": "",
        "payInfo": {
          "oriOutTradeNo": "sring",
          "oriTradeNo": "",
          "outTradeNo": "",
          "payAmt": 0,
          "payId": "",
          "payTime": "",
          "payType": 0,
          "payUser": "",
          "tradeNo": "",
          "transType": 0
        },
        "planBackTime": this.data.planBackTime,
        "storeUuid": ""
      }
    })
    wx.request({
      url: config.pash + '/sharing/api/v1/borrow/save',
      method: 'POST',
      data: this.data.borrowParam,
      success: function (res) {
        const { data, status } = res.data;
        console.log(status)
        console.log(data)
        if (!status) {
          that.routerTo()
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
  bindDateChange: function (e) {
    this.setData({
      planBackTime: e.detail.value + ' 23:59:59'
    })
  },
  routerTo() {
    wx.switchTab({ url: '/pages/list/list' })
  },
  getBorrowList(id) {
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