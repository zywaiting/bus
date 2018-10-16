//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    busname:'',
    busConfigList:[]
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
          url: app.globalData.url +'/onLoginAll',
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
  searchCar: function () {
    var that = this;
    wx.request({
      url: app.globalData.url +'/api/busconfig',
      data: {
        openid: app.globalData.openid,
        busname: that.data.busname,
        crity: app.globalData.crity
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          busConfigList: res.data.data
        })
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  getCarNo: function (e){
    var that = this;
    that.setData({
      busname:e.detail.value
    })
  }
})
