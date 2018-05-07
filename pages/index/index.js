//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[
      {
        "imgurl": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        'name':"白色小米充电宝",
        'price': "50",
        'count': "100",
      }, {
        "imgurl": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
        'name': "黑色小米充电宝",
        'price': "40",
        'count': "70",
      }, {
        "imgurl": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg",
        'name': "灰色色小米充电宝",
        'price': "40",
        'count': "80",
      }, {
        "imgurl": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg",
        'name': "灰色色小米充电宝",
        'price': "40",
        'count': "80",
      }, {
        "imgurl": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg",
        'name': "灰色色小米充电宝",
        'price': "40",
        'count': "80",
      }, {
        "imgurl": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg",
        'name': "灰色色小米充电宝",
        'price': "40",
        'count': "80",
      }, {
        "imgurl": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg",
        'name': "灰色色小米充电宝",
        'price': "40",
        'count': "80",
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
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
    } else if (this.data.canIUse){
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  listClick: function (event) {
    wx.navigateTo({ url: '/pages/hire/hire'})
  },
})
