// pages/main/index.js

var API = require('../../utils/api.js')


Page({

  /**
   * 页面的初始数据
   */

  data: {
    array: {}
  
  },

  add: function (e) {
    //console.log(this);
    //console.log(e.currentTarget.id);
    //console.log(this.data.array[e.currentTarget.id-1].title);
    var todoTitle = this.data.array[e.currentTarget.id].desc;
    var timePoint = this.data.array[e.currentTarget.id].timepoint;
    var times = this.data.array[e.currentTarget.id].times;
    var selecttodo = this.data.array[e.currentTarget.id].selecttodo;
    wx.navigateTo({
      url: '../timeadmin/timeadd?paramTitle=' + todoTitle + '&timepoint=' + timePoint + '&times=' + times + '&selecttodo=' + selecttodo
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log('onLoad')
    var that = this
    // 使用 Mock
    API.ajaxget('index.php', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      console.log(res.data.length)
      for (var i = 0; i <= res.data.length; i++ ){

      }
      console.log("sfsfwe");
      //return;
      that.setData({
        array: res.data
      })
    });



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
    /*var that = this
    // 使用 Mock
    API.ajaxget('index.php', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      console.log(res.data.length)
      for (var i = 0; i <= res.data.length; i++) {

      }
      console.log("sfsfwe");
      //return;
      that.setData({
        array: res.data
      })
    });*/
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
  
  }
})