const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const login=cb=> {
  wx.login({
    success: function (res) {
      var code = res.code;
      // console.log(code);
      if (code) {
        wx.removeStorageSync('code');
        wx.setStorageSync('code', code);
        typeof cb == 'function' && cb(code);
      } else {
        wx.showToast({
          title: '获取微信登录状态失败，请退出后重新登录',
          duration: 2000
        })
      }
    },
    fail: function (e) {
      wx.showToast({
        title: '微信登陆失败，请退出后重新登录',
        duration: 2000
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  login: login
}
