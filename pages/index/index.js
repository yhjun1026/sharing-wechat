//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
var config = require('../../config/config.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [],
    page: 1,
    showBottom: false,
    inputValue: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getList();
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      let p = e.target.id;
      wx.navigateTo({ url: '/pages/hire/hire?id=' + p + '&type=index' })
    }
  },
  listClick: function (event) {
    wx.navigateTo({ url: '/pages/hire/hire' })
  },
  getList() {
    let that = this;
    wx.request({
      url: config.pash + '/sharing/api/v1/goods/get/rent/all',
      data: { page: that.data.page, pageSize: 10, queryType: 'available' },
      method: 'POST',
      success: function (res) {
        console.log(res)
        const { data, status } = res.data;
        if (!status) {
          if (that.data.page > 1) {
            let dt = that.data.list.concat(data.item);
            that.setData({
              list: dt
            })
          } else {
            that.setData({
              list: data.item
            })
          }

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
  onReachBottom() {
    if (this.data.showBottom) {
      return
    }
    this.setData({
      page: this.data.page + 1,
    })
    if (this.data.inputValue !== '') {
      this.getSearchList()
    } else {
      this.getList();
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
    })
    if (this.data.inputValue !== '') {
      this.getSearchList()
    } else {
      this.getList();
    }
  },
  setFocus() {
    let that = this;
    that.setData({
      page: 1,
      showBottom: false
    })
    if (this.data.inputValue !== '') {
      this.getSearchList()
    } else {
      this.getList();
    }
  },
  getSearchList() {
    let that = this;
    wx.request({
      url: config.pash + '/sharing/api/v1/goods/get/rent/all',
      data: { page: that.data.page, pageSize: 10, queryType: 'available', name: that.data.inputValue },
      method: 'POST',
      success: function (res) {
        const { data, status } = res.data;
        if (!status) {
          if (that.data.page > 1) {
            console.log(that.data.list)
            console.log('this.data.list')
            let dt = that.data.list.concat(data.item);
            that.setData({
              list: dt
            })
          } else {
            that.setData({
              list: data.item
            })
          }

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
  nameInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  }
})
