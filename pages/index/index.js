//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //不管授不授权我都要自动登录获取openid
    wx.login({
      success: code => {
        wx.request({
          url: 'https://www.zhuyao.xin/onLoginAll',
          data: {
            code: code.code,
            express: 'bus',
            name: 'LoginUrl'
          },
          success: function (res) {
            console.log(res.data.data);
            app.globalData.openid = res.data.data
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
})
