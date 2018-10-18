//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    busname:'',
    busConfigList:[],
    busconfig:false,
    buswaynearby: true,
    buswaynearbyList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
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

    //获取用户地址
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        wx.request({
          url: app.globalData.url + '/api/buswaynearby',
          data: {
            openid: app.globalData.openid,
            latitude: res.latitude,
            longitude: res.longitude,
            crity: app.globalData.crity
          },
          success: function (res) {
            console.log(res.data.data);
            that.setData({
              buswaynearbyList: res.data.data.data,
            })
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
        console.log(res);
      },
      fail: res => {
        //接口调用失败，提示用户打开定位功能
        this.wetoast.toast({ title: '获取定位失败，请打开定位，重新进入！' });
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
        that.setData({
          busConfigList: res.data.data,
          busconfig: true,
          buswaynearby: false
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
  },
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        wx.request({
          url: app.globalData.url + '/api/buswaynearby',
          data: {
            openid: app.globalData.openid,
            latitude: res.latitude,
            longitude: res.longitude,
            crity: app.globalData.crity
          },
          success: function (res) {
            console.log(res.data.data);
            that.setData({
              buswaynearbyList: res.data.data.data,
              busconfig: false,
              buswaynearby: true
            })
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      },
      fail: res => {
        //接口调用失败，提示用户打开定位功能
        this.wetoast.toast({ title: '获取定位失败，请打开定位，重新进入！' });
      }
    })
  }
})
