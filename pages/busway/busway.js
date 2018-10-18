// pages/busway/busway.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    busid:'',
    busname:'',
    beginend:'',
    buswayList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    var that = this;
    that.setData({
      busid: options.busid,
      busname: options.busname,
      beginend: options.beginend
    })

    wx.request({
      url: app.globalData.url + '/api/busway',
      data: {
        openid: app.globalData.openid,
        busid: that.data.busid,
        crity: app.globalData.crity
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          buswayList: res.data.data.data
        })
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
    
    that.startSetInter();
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
    var that = this;
    clearInterval(that.data.setInter);
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
  startSetInter:function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function  () {
        wx.request({
          url: app.globalData.url + '/api/busway',
          data: {
            openid: app.globalData.openid,
            busid: that.data.busid,
            crity: app.globalData.crity
          },
          success: function (res) {
            console.log(res.data.data);
            that.setData({
              buswayList: res.data.data.data
            })
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    , 5000);
   }
})